const inputEl = document.getElementById('inputText');
const outputEl = document.getElementById('outputText');
const cleanBtn = document.getElementById('cleanBtn');
const clearBtn = document.getElementById('clearBtn');
const copyBtn = document.getElementById('copyBtn');

// Load saved text when popup opens
document.addEventListener('DOMContentLoaded', () => {
  chrome.storage.local.get(['inputText', 'outputText'], (data) => {
    inputEl.value = data.inputText || '';
    outputEl.value = data.outputText || '';
  });
});

// Save input text on change
inputEl.addEventListener('input', () => {
  chrome.storage.local.set({ inputText: inputEl.value });
});

// String CleanUp button logic
cleanBtn.addEventListener('click', () => {
  const lines = inputEl.value.split('\n');
  const result = [];

  let i = 0;
  while (i < lines.length) {
    const line = lines[i];
    const match = line.match(/I say:\s*(.+)/i);

    if (match) {
      const message = match[1].trim();
      if (i + 1 < lines.length && lines[i + 1].trim() === message) {
        result.push(line);
        i += 2;
        continue;
      }
    }

    result.push(line);
    i++;
  }

  const parsedText = result.join('\n');
  outputEl.value = parsedText;
  chrome.storage.local.set({ outputText: parsedText });
});

// Copy button logic
copyBtn.addEventListener('click', () => {
  const statusMsg = document.getElementById('copyStatus');

  navigator.clipboard.writeText(outputEl.value)
    .then(() => {
      statusMsg.style.display = 'block';

      // Optional: fade out after 2 seconds
      setTimeout(() => {
        statusMsg.style.display = 'none';
      }, 2000);
    })
    .catch(err => {
      console.error('Copy failed:', err);
      statusMsg.textContent = 'Copy failed!';
      statusMsg.style.color = 'red';
      statusMsg.style.display = 'block';
    });
});

// Clear button logic
clearBtn.addEventListener('click', () => {
  inputEl.value = '';
  outputEl.value = '';
  chrome.storage.local.remove(['inputText', 'outputText']);
});
