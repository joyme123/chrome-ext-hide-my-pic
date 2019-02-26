import { array } from "@tensorflow/tfjs-data";

// background 提供后台常驻的server，由contentScript将图片发送给background.js来处理

var globalImgElements

console.log("content script 加载")

chrome.runtime.onMessage.addListener(
    function (request, sender, sendResponse) {
        if (request.action == "match_images") {
            globalImgElements = document.getElementsByTagName("img");

            let imgSrcs = []

            Array.from(globalImgElements).forEach(img => {
                imgSrcs.push(img.src)
            })

            sendResponse({action: 'classify', imgSrc: imgSrcs});
        } else if (request.action == "classify") {
            globalImgElements.item(request.block).src = chrome.extension.getURL('assets/i_love_coding.png');;
        }
    }
);