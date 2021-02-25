chrome.tabs.onActivated.addListener(tab => {
    chrome.tabs.get(tab.tabId, current_tab_info => {
        if (/^https:\/\/www\.when2meet\.com/.test(current_tab_info.url)) {
            console.log("background only if on right site")
        }
    })
})
