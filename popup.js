const inputText = document.getElementById('inputText');
const outputText = document.getElementById('outputText');
const cleanBtn = document.getElementById('cleanBtn');
const clearBtn = document.getElementById('clearBtn');
const copyBtn = document.getElementById('copyBtn');

// Load saved text when popup opens
document.addEventListener('DOMContentLoaded', () => {
  chrome.storage.local.get(['inputText', 'outputText'], (data) => {
    inputText.value = data.inputText || '';
    outputText.value = data.outputText || '';
  });
});

// Save input text on change
inputText.addEventListener('input', () => {
  chrome.storage.local.set({ inputText: inputText.value });
});

// String CleanUp button logic
cleanBtn.addEventListener('click', () => {
  const lines = inputText.value.split('\n');
  const result = [];

  const normalize = str =>
    str
      .trim()
      .toLowerCase()
      .replace(/[\s.,!?;:'"“”]+$/g, '');

  let i = 0;
  while (i < lines.length) {
    const line = lines[i];
    const match = line.match(/I say:\s*(.+)/i);

    if (match) {
      const message = match[1].trim();
      const normalizedMessage = normalize(message);
      const nextLine = lines[i + 1]?.trim();
      const normalizedNext = normalize(nextLine || '');

      if (normalizedMessage === normalizedNext) {
        result.push(line);
        i += 2;
        continue;
      }
    }

    result.push(line);
    i++;
  }

  const parsedText = result.join('\n');
  outputText.value = parsedText;
  chrome.storage.local.set({ outputText: parsedText });
});


// Copy button logic
copyBtn.addEventListener('click', () => {
  const statusMsg = document.getElementById('copyStatus');

  // Attempt to copy 
  navigator.clipboard.writeText(outputText.value)
    .then(() => {
      // none by default. If copy function created a value
      //    make success message visible
      statusMsg.style.display = 'block';

      // Fade out after 2 seconds
      setTimeout(() => {
        statusMsg.style.display = 'none';
      }, 2000);
    })
      // Display message if copy failed for some reason
    .catch(err => {
      console.error('Copy failed:', err);
      statusMsg.textContent = 'Copy failed!';
      statusMsg.style.color = 'red';
      statusMsg.style.display = 'block';
      // Fade out after 2 seconds
      setTimeout(() => {
        statusMsg.style.display = 'none';
      }, 2000);
    });
});

// Clear button logic
clearBtn.addEventListener('click', () => {
  inputText.value = '';
  outputText.value = '';
  // Tell stored data to remove what's in both text fields
  chrome.storage.local.remove(['inputText', 'outputText']);
});
