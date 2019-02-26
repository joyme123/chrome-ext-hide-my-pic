import * as nsfwjs from './nsfw/index'
declare var chrome: any

let imgs: any;

chrome.browserAction.onClicked.addListener(function (tab) {
    // No tabs or host permissions needed!
    console.log('Turning ' + tab.url + ' red!');
    chrome.tabs.executeScript({
        code: 'imgs = document.getElementsByTagName("img");alert(imgs.length)'
    });
});

// chrome.commands.onCommand.addListener(function (command) {
//     console.log('onCommand event received for message: ', command);

//     document.body.innerHTML = "<div>哈哈哈哈</div>"

//     const imgs = document.getElementsByTagName('img')

//     alert(imgs.length)

//     // Load model from my S3.
//     // See the section hosting the model files on your site.
//     // const model = nsfwjs.load('/assets/model/').then(model => {
//     //     // Classify the image
//     //     const predictions = model.classify(img)
//     //     // alert('Predictions: '+ predictions[0].className+':'+predictions[0].probability)
//     // })

// });
