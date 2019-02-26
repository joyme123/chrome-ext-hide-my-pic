import { array } from "@tensorflow/tfjs-data";

// background 提供后台常驻的server，由contentScript将图片发送给background.js来处理

var globalImgElements

chrome.runtime.onMessage.addListener(
    function (request, sender, sendResponse) {
        console.log("content_script收到消息", request);
        if (request.action == "match_images") {
            globalImgElements = document.getElementsByTagName("img");

            let imgSrcs = []

            Array.from(globalImgElements).forEach(img => {
                imgSrcs.push(img.src)
            })

            sendResponse({action: 'classify', imgSrc: imgSrcs});
        } else if (request.action == "classify") {
            console.log("收到屏蔽index", request.block)
            globalImgElements.item(request.block).src = chrome.extension.getURL('assets/icon.jpg');;
        }
    }
);