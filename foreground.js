{
    const record = document.createElement('button');
    record.innerText = "Record Current Availability";
    record.id = "record";

    document.querySelector('#GroupAvailability').appendChild(record);
}

record.addEventListener('click', () => {
    //var groupgrid = document.querySelector('#GroupGridSlots.GroupGrid');
    chrome.runtime.sendMessage({message: 'save the record'});
    // TODO: use JS variables from website in order to parse through availabilities & record them efficiently
    chrome.storage.local.get(["availableAtSlot", "peopleNames", "peopleIds", "timeOfSlot"], value => {
        availableAtSlot = value["availableAtSlot"];
        console.log(availableAtSlot);
    })
})

function walkTheDOM(node, func) {
    func(node);
    node = node.firstChild;
    while (node)
    {
        walkTheDOM(node, func);
        node = node.nextSibling;
    }
};

