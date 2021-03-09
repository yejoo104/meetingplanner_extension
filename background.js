let active_tab = 0;

chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
    if (tab.url != undefined && changeInfo.status == "complete") {
        chrome.tabs.get(tabId, current_tab_info => {
            active_tab = tabId;
            if (/^https:\/\/www\.when2meet\.com/.test(current_tab_info.url)) {
                chrome.tabs.executeScript(null, {file: './foreground.js'}, () => console.log('i injected'))
            }
        })
    }
});

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.message === 'save the record'){
        chrome.tabs.sendMessage(active_tab, {message: 'get data'}, data => {
            // TODO: save data in a manner I would like (note: time in current data is in epoch time)
            chrome.storage.local.set(data);
            console.log("data saved locally");
        });
    }
})
