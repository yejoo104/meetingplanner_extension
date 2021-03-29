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
            console.log(data["timeOfSlot"]);
            console.log("data saved locally");
            
            // Convert timeOfSlot (array of all slots in epoch time) into dates array
            var i;
            var dates = new Set();
            for (i = 0; i < data["timeOfSlot"].length; i++){
                var date = new Date(data["timeOfSlot"][i] * 1000);
                dates.add(date.getUTCFullYear().toString() + ("00" + (date.getUTCMonth() + 1).toString()).slice(-2) + ("00" + date.getUTCDate().toString()).slice(-2));
            }
            console.log(dates);
            
            // Compute start_time and end_time
            var start = new Date(data["timeOfSlot"][0] * 1000);
            var end = new Date(data["timeOfSlot"][data["timeOfSlot"].length - 1] * 1000);
            var start_time = start.getHours();
            var end_time = end.getHours() + 1;
            console.log(start_time);
            console.log(end_time);
        });
    }
    if (request.message === 'schedule'){
        console.log('got schedule message');
        chrome.storage.local.get(['availableAtSlot'], function(result) {
            console.log(result['availableAtSlot']);
        })
    }
})
