
var button = document.getElementById("button-schedule");

button.addEventListener('click', () => {
    chrome.runtime.sendMessage({message: 'schedule'});
})
