
function next_slot(slot, interval){
    // returns the chronologically next slot
    // @param slot: slot id input
    // @param interval: amount of time between slots
    // @returns date_string: slot id output
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

function intersection(setA, setB) {
    let _intersection = new Set()
    for (let elem of setB) {
        if (setA.has(elem)) {
            _intersection.add(elem)
        }
    }
    return _intersection
}

function union(setA, setB) {
    let _union = new Set(setA)
    for (let elem of setB) {
        _union.add(elem)
    }
    return _union
}

function modify_slots(meeting_length, interval, slot_dict, dates, start_time, end_time){
    // modifies the dictionary of slots such that the slot contains information not just about the 30 minute period but about the entire time period of the meeting
    // (ex) if meeting length is 2 hours, contains info from 2:00-4:00, 2:30-4:30, 3:00-5:00, etc.
    //@param meeting_length: length of the meeting, in minutes
    //@param interval: length of one slot
    //@param slot_dict: dictionary where keys are slots and values are list of names available in that slot
    //@param dates: list of dates
    //@param start_time: starting time
    //@param end_time: ending time
    //@returns modified_slot_dict: dictionary where keys are slots (indicated by starting time) -- for the length of the meeting_length -- and values are set of names available in that slot
    var modified_slot_dict = {};
    var num_slots = Math.ceil(meeting_length/interval);
    
    // Loop through days & time
    var i;
    var hour;
    var minute;
    var j;

    for (i = 0; i < dates.length; i++){
        for (hour = start_time; hour < end_time; hour++){
            for (minute = 0; minute < 60; minute+=interval){
                var slot_id = dates[i] + ("0" + hour.toString()).slice(-2) + ("0" + minute.toString()).slice(-2);
                var slot_id_cp = slot_id;
                var people = new Set(slot_dict[slot_id]);
                
                // Loop through number of slots and delete people who can't be there for the entire meeting_length
                for (j = 0; j < num_slots - 1; j++){
                    slot_id = next_slot(slot_id, interval);
                    if (!(slot_id in slot_dict)){
                        people = new Set();
                        break;
                    }
                    else {
                        people = intersection(people, new Set(slot_dict[slot_id]));
                    }
                }
                
                modified_slot_dict[slot_id_cp] = Array.from(people);
            }
        }
    }
                              
    return modified_slot_dict;
}
                              
function remove_unavailable_slots(slot_dict, min_people, max_people){
    var people = new Set();
    
    for (var key in slot_dict){
        var length = slot_dict[key].length;
        if (length < min_people || length > max_people) delete slot_dict[key];
        else people = union(people, slot_dict[key]);
    }
    
    return {"slot_dict": slot_dict, "people": Array.from(people)};
}

var button = document.getElementById("schedule-form");

button.addEventListener('submit', () => {
    // Validate Form to make sure inputs make sense
    var min_event = parseInt(document.getElementById("min_event").value);
    var max_event = parseInt(document.getElementById("max_event").value);
    
    if (min_event && max_event && min_event > max_event) {
        alert("Minimum number of events cannot be bigger than the maximum number of events");
        return;
    }
    
    var min_people = parseInt(document.getElementById("min_people").value);
    var max_people = parseInt(document.getElementById("max_people").value);
    
    if (min_people && max_people && min_people > max_people){
        alert("Minimum number of people cannot be bigger than the maximum number of people");
        return;
    }
    
    // Calculate meeting_length (interval - use 15)
    var interval = 15;
    var meeting_length = parseInt(document.getElementById("hours").value) * 60 + parseInt(document.getElementById("minutes").value);
        
    // Tests (for now)
    chrome.storage.local.get(['slots', 'slot_dict','dates', 'start_time', 'end_time'], function(result) {
        var test = modify_slots(meeting_length, interval, result['slot_dict'], result['dates'], result['start_time'], result['end_time']);
        var test2 = remove_unavailable_slots(test, 1, 100);
        alert(test2['slot_dict']['202105050900']);
        alert(test2['slot_dict']['202105051500']);
        alert(test2['slot_dict']['202105061500']);
        alert(test2['people']);
    })
})
