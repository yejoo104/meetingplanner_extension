chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
    if (tab.url != undefined && changeInfo.status == "complete") {
        chrome.tabs.get(tabId, current_tab_info => {
            if (/^https:\/\/www\.when2meet\.com/.test(current_tab_info.url)) {
                chrome.tabs.executeScript(null, {file: './foreground.js'}, () => console.log('i injected2'))
            }
        })
        chrome.tabs.sendMessage(tabId, {message: 'getData'}, response => {
            console.log(response[55]);
        });
        console.log("message sent");
    }
});
