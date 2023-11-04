// background.ts
let currentFragment = '';

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.fragment) {
    currentFragment = message.fragment; // Store the latest fragment
    console.log('Background script received and stored fragment:', currentFragment);
  }
});

// This will handle sending the fragment to the popup when it opens
chrome.runtime.onConnect.addListener(port => {
  console.assert(port.name === 'popup');
  port.postMessage({ fragment: currentFragment });
});
