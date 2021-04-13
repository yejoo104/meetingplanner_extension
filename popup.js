
function next_slot(slot, interval){
    var year = parseInt(slot.slice(0, 4));
    var month = parseInt(slot.slice(4, 6));
    var day = parseInt(slot.slice(6, 8));
    var time = slot.slice(8);
    var hour = parseInt(time.slice(0, -2));
    var minutes = parseInt(time.slice(-2));
    
    var slot_date = new Date(year, month - 1, day, hour , minutes);
    var new_date = new Date(slot_date.getTime() + interval * 60000);
    
    var date_string = new_date.getFullYear().toString() + ("0" + (new_date.getMonth() + 1).toString()).slice(-2) + ("0" + new_date.getDate().toString()).slice(-2) + ("0" + new_date.getHours().toString()).slice(-2) + ("0" + new_date.getMinutes().toString()).slice(-2);
    
    return date_string;
}

var button = document.getElementById("schedule-form");

button.addEventListener('submit', () => {
    // Validate Form to make sure inputs make sense
    var min_event = document.getElementById("min_event").value;
    var max_event = document.getElementById("max_event").value;
    
    if (min_event && max_event && min_event > max_event) {
        alert("Minimum number of events cannot be bigger than the maximum number of events");
        return;
    }
    
    var min_people = document.getElementById("min_people").value;
    var max_people = document.getElementById("max_people").value;
    
    if (min_people && max_people && min_people > max_people){
        alert("Minimum number of people cannot be bigger than the maximum number of people");
        return;
    }
    
    chrome.storage.local.get(['slots', 'slot_dict','dates', 'start_time', 'end_time'], function(result) {
        alert(next_slot(result['slots'][10], 15));
    })
})
