// contentScript.ts

// This function creates a text fragment from the selected text
function createTextFragmentFromSelection(selection: Selection | null): string | null {
    if (!selection || selection.rangeCount < 1) return null;
    
    const range = selection.getRangeAt(0);
    const text = range.toString();
    // This is a simple text fragment; a more robust solution would handle duplicates, punctuation, etc.
    return encodeURIComponent(`:~:text=${text}`);
  }
  
  // Listen for mouseup events which indicates end of selection
  document.addEventListener('mouseup', () => {
    const selection = window.getSelection();
    const fragment = createTextFragmentFromSelection(selection);
  
    // Now you can do something with the fragment, like send it to your popup or background script
    if (fragment) {
      // Example: send the fragment to the popup script
      console.log(fragment);
      chrome.runtime.sendMessage({ fragment });
    }
  });
  