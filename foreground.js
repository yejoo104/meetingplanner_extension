{
    const record = document.createElement('button');
    record.innerText = "Record Current Availability";
    record.id = "record";

    document.querySelector('#GroupAvailability').appendChild(record);
}

record.addEventListener('click', () => {
    //var groupgrid = document.querySelector('#GroupGridSlots.GroupGrid');
    // TODO: gather relevant information on click (currently it does so from backend just on update)
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

