import * as nsfwjs from './nsfw/index'
declare var chrome: any

alert("加载background脚本")

let globalModel = null;

nsfwjs.load('/assets/model/').then(model => {
    globalModel = model
})

// let imgs: any;

function sendImgClassifyResult(result, cursor) {

    let block = {}
    block['Porn'] = true;
    block['Sexy'] = true;
    block['Hentai'] = true;
    block['Neutral'] = true;
    block['Drawing'] = true;

    if (block[result[0].className]){
        chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
            chrome.tabs.sendMessage(tabs[0].id, { action: "classify", block: cursor }, function (response) {
            })
        })
    }

}

// 监听快捷键
chrome.commands.onCommand.addListener(function (command) {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        chrome.tabs.sendMessage(tabs[0].id, { action: "match_images" }, function (response) {
            if (response.action == "classify") {
                // Classify the image
                console.log("收到imgSrc", response.imgSrc)
                const imgs = response.imgSrc

                let cursor = 0

                imgs.forEach(imgSrc => {

                    // 自执行函数，形成局部作用域
                    (function(cursor, imgSrc, globalModel){
                        let canvas = document.createElement("canvas");
                        const context = canvas.getContext("2d");
                        let img = new Image();
                        img.addEventListener("load", function () {
                            canvas.width = img.width;
                            canvas.height = img.height;
                            context.drawImage(img, 0, 0);
                            const imgData = context.getImageData(0, 0, img.width, img.height);
                            if (globalModel != null) {
                                const predictions = globalModel.classify(imgData)
                                predictions.then(res => {
                                    console.log("预测结果", res)
    
                                    // TODO: 这里拿到识别结果后，再反馈给content_script去屏蔽图片
                                    sendImgClassifyResult(res, cursor)
                                })
                            }
                        });
                        img.src = imgSrc
                    }(cursor, imgSrc, globalModel))
                    cursor++
                })

            }
        });
    });
});
