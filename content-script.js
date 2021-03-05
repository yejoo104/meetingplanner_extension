// TODO: find a way to access AvailableAtSlot, an array of who is available per each slot

const evtToPage = chrome.runtime.id;
const evtFromPage = chrome.runtime.id + '-response';

const script = document.createElement('script');
script.textContent = `(${inPageContext})("${evtToPage}", "${evtFromPage}")`;
document.documentElement.appendChild(script);
script.remove();

function inPageContext(listenTo, respondWith) {
    addEventListener(listenTo, () => {
        dispatchEvent(new CustomEvent(respondWith, {
            detail: window.AvailableAtSlot,
        }));
    });
}

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.message === 'getData') {
        addEventListener(evtFromPage, e => sendResponse(e.detail), {once: true});
        dispatchEvent(new Event(evtToPage));
    }
});
