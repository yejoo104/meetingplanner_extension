{
    const record = document.createElement('button');
    record.innerText = "Record Current Availability";
    record.id = "record";

    document.querySelector('#GroupAvailability').appendChild(record);
}

record.addEventListener('click', () => {
    //var groupgrid = document.querySelector('#GroupGridSlots.GroupGrid');
    chrome.runtime.sendMessage({message: 'save the record'});
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

