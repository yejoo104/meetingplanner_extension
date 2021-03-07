const evtToPage = chrome.runtime.id;
const evtFromPage = chrome.runtime.id + '-response';

const script = document.createElement('script');
script.textContent = `(${inPageContext})("${evtToPage}", "${evtFromPage}")`;
document.documentElement.appendChild(script);
script.remove();

function inPageContext(listenTo, respondWith) {
    addEventListener(listenTo, () => {
        dispatchEvent(new CustomEvent(respondWith, {
            detail: {
                availableAtSlot: window.AvailableAtSlot,
                peopleNames: window.PeopleNames,
                peopleIds: window.PeopleIDs,
                timeOfSlot: window.TimeOfSlot
            },
        }));
    });
}

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.message === 'get data') {
        addEventListener(evtFromPage, e => sendResponse(e.detail), {once: true});
        dispatchEvent(new Event(evtToPage));
    }
});
