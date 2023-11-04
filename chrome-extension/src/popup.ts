console.log('Popup script loaded');

const port = chrome.runtime.connect({ name: 'popup' });

port.onMessage.addListener(msg => {
    if (msg.fragment) {
        const fragment: string = msg.fragment;

        console.log(fragment);

        chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
            const currentTab = tabs[0]; // There will be only one in this array
            const url = currentTab.url; // This is the URL you want
          
            // Now you can send this URL to your Next.js API
            const dataToSend = {
              url: url, // URL of the active tab
              selectedText: fragment
            };
          
          fetch('http://localhost:3000/api/submitBookmark', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(dataToSend)
          })
          .then(response => response.json())
          .then(data => {
            console.log('Success:', data);
          })
          .catch((error) => {
            console.error('Error:', error);
          });
        })
    }
});

