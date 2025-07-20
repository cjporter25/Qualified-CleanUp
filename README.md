# Text Parser Extension

## Overview

This is a simple browser extension that helps clean up copied chat logs or transcribed conversations by removing repeated lines that follow a specific timestamped format. 

It is compatible with modern desktop browsers that support Manifest V3, including Chrome, Firefox, Edge, and Safari (via Xcode conversion).

---

## Features

- Opens a popup with a text input box labeled "Qualified CleanUp"
- Parses text to remove duplicate lines that repeat immediately after a timestamped line
- Example of what gets cleaned:

-   At 10:01 am I say: Got it, thank you
    Got it, thank you

-   Becomes:

-   At 10:01 am I say: Got it, thank you


- Displays the cleaned output below the input box
- Provides a "Copy to Clipboard" button to copy the cleaned text
- Automatically saves and restores both input and output even after the popup is closed

---

## How to Use

1. Paste the raw text into the first text box.
2. Click **"Parse"** to clean it.
3. View the result in the second text box.
4. Click **"Copy to Clipboard"** to use the cleaned result elsewhere.

---

## Development Notes

- Built using HTML, CSS, and JavaScript
- Uses `chrome.storage.local` to persist data
- Clipboard access uses the modern `navigator.clipboard` API
- Popup UI is styled with basic inline CSS for simplicity

---

## Compatibility

✅ Google Chrome  
✅ Microsoft Edge  
✅ Firefox  
🛠 Safari (requires wrapping using Safari Web Extension Converter & Xcode)

---

## License

MIT License – free to use and modify


