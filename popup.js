
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
    
    chrome.runtime.sendMessage({message: 'schedule'});
})
