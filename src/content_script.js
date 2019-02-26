import { array } from "@tensorflow/tfjs-data";

// background 提供后台常驻的server，由contentScript将图片发送给background.js来处理

alert("content script 加载")

chrome.runtime.onMessage.addListener(
    function (request, sender, sendResponse) {
        console.log("content_script收到消息", request);
        if (request.action == "match_images") {
            const imgs = document.getElementsByTagName("img");

            let imgSrcs = []

            Array.from(imgs).forEach(img => {
                console.log(img)
                imgSrcs.push(img.src)
            })

            sendResponse({action: 'classify', imgSrc: JSON.stringify(imgSrcs)});
        }
    }
);