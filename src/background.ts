import * as nsfwjs from './nsfw/index'
declare var chrome: any

alert("加载background脚本")

let globalModel = null;

nsfwjs.load('/assets/model/').then(model => {
    globalModel = model
})

// let imgs: any;

// 监听快捷键
chrome.commands.onCommand.addListener(function (command) {
    console.log(command)
    alert("快捷键")
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        chrome.tabs.sendMessage(tabs[0].id, { action: "match_images" }, function (response) {
            if (response.action == "classify") {
                // Classify the image
                console.log("收到imgSrc", response.imgSrc)
                const imgs = JSON.parse(response.imgSrc)

                imgs.forEach(imgSrc => {
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
                            })
                        }
                    });
                    img.src = imgSrc
                })

            }
        });
    });
});
