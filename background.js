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
            // Convert data into dates array and slot_dict dictionary
            var i;
            var j;
            var dates = new Set();
            var slots = [];
            var slot_dict = {};
            for (i = 0; i < data["timeOfSlot"].length; i++){
                var date = new Date(data["timeOfSlot"][i] * 1000);
                var date_string = date.getFullYear().toString() + ("0" + (date.getMonth() + 1).toString()).slice(-2) + ("0" + date.getDate().toString()).slice(-2) + ("0" + date.getHours().toString()).slice(-2) + ("0" + date.getMinutes().toString()).slice(-2);
                
                // dates set
                dates.add(date_string.slice(0, 8));
                
                // slots array
                slots.push(date_string);
                
                // slot_dict
                slot_dict[date_string] = [];
                for (j = 0; j < data["availableAtSlot"][i].length; j++){
                    var personId = data["availableAtSlot"][i][j];
                    slot_dict[date_string].push(data["peopleNames"][data["peopleIds"].indexOf(personId)]);
                }
            }
            
            // Compute start_time and end_time
            var start = new Date(data["timeOfSlot"][0] * 1000);
            var end = new Date(data["timeOfSlot"][data["timeOfSlot"].length - 1] * 1000);
            var start_time = start.getHours();
            var end_time = end.getHours() + 1;
            
            // Save data
            chrome.storage.local.set({"slots": slots, "slot_dict": slot_dict, "dates": Array.from(dates), "start_time": start_time, "end_time": end_time});
        });
    }
})
