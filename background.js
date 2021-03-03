chrome.tabs.onActivated.addListener(tab => {
    chrome.tabs.get(tab.tabId, current_tab_info => {
        if (/^https:\/\/www\.when2meet\.com/.test(current_tab_info.url)) {
            chrome.tabs.executeScript(null, {file: './foreground.js'}, () => console.log('i injected1'))
        }
    })
});

chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
    chrome.tabs.get(tabId, current_tab_info => {
        if (/^https:\/\/www\.when2meet\.com/.test(current_tab_info.url)) {
            chrome.tabs.executeScript(null, {file: './foreground.js'}, () => console.log('i injected2'))
        }
    })
});
