# Qualified CleanUp Extension

## Overview

This is a simple browser extension that helps clean up copied chat logs copied from the Qualified chat service by removing repeated lines that follow the initial timestamped statement.

It is compatible with modern desktop browsers that support Manifest V3, including Chrome, Firefox, Edge, and Safari (in the future).

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
- Provides a "Copy" button to copy the cleaned text
- Automatically saves and restores both input and output in local storage even after the popup is closed

---

## How to Use

1. Paste the raw Qualified text into the first text box.
2. Click **"Clean"** to clean it.
3. View the result in the second text box.
4. Click **"Copy"** to use the cleaned result elsewhere.

---

## Development Notes

- Built using HTML, CSS, and JavaScript
- Uses `chrome.storage.local` to hold data just in case.
- Clipboard access uses the modern `navigator.clipboard` API
- Popup UI is styled with basic inline CSS for simplicity

---

## Compatibility
- Google Chrome  
- Microsoft Edge  
- Firefox  
- Safari (requires wrapping using Safari Web Extension Converter & Xcode)

---

## License
MIT License – free to use and modify