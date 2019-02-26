// Saves options to chrome.storage
function save_options() {
    // var autoBlock = document.getElementById('autoBlock').value;
    var hentai = document.getElementById('hentai').checked;
    var porn = document.getElementById('porn').checked;
    var sexy = document.getElementById('sexy').checked;

    // console.log(autoBlock)

    chrome.storage.sync.set({
        // autoBlock: autoBlock,
        hentai: hentai,
        porn: porn,
        sexy: sexy
    }, function () {
        // Update status to let user know options were saved.
        var status = document.getElementById('status');
        status.textContent = '选项已保存.';
        setTimeout(function () {
            status.textContent = '';
        }, 750);
    });
}

// Restores select box and checkbox state using the preferences
// stored in chrome.storage.
function restore_options() {
    // Use default value color = 'red' and likesColor = true.
    chrome.storage.sync.get({
        // autoBlock: false,
        hentai: true,
        porn: true,
        sexy: true
    }, function (items) {
        // document.getElementById('autoBlock').value = items.autoBlock
        document.getElementById('hentai').checked = items.hentai;
        document.getElementById('porn').checked = items.porn;
        document.getElementById('sexy').checked = items.sexy;
    });
}
document.addEventListener('DOMContentLoaded', restore_options);
document.getElementById('save').addEventListener('click',
    save_options);