document.addEventListener('DOMContentLoaded', function () {
    const notepad = document.getElementById('notepad');
    const saveButton = document.getElementById('save-button');
    const hideButton = document.getElementById('hide-button');
    const notepadContainer = document.getElementById('notepad-container');
    const resizeHandle = document.getElementById('resize-handle');
  
    // Load saved notes and size from Chrome storage
    chrome.storage.sync.get(['notes', 'notepadSize'], function (result) {
      if (result.notes) {
        notepad.value = result.notes;
      }
      if (result.notepadSize) {
        notepadContainer.style.width = result.notepadSize.width;
        notepadContainer.style.height = result.notepadSize.height;
      }
    });
  
    // Save notes to Chrome storage
    saveButton.addEventListener('click', function () {
      chrome.storage.sync.set({ notes: notepad.value }, function () {
        alert('Notes saved!');
      });
    });
  
    // Hide the notepad
    hideButton.addEventListener('click', function () {
      if (notepadContainer.style.display === 'none') {
        notepadContainer.style.display = 'flex';
        hideButton.textContent = 'Hide';
      } else {
        notepadContainer.style.display = 'none';
        hideButton.textContent = 'Show';
      }
    });
  
    // Handle resizing
    resizeHandle.addEventListener('mousedown', function (e) {
      e.preventDefault();
      window.addEventListener('mousemove', resize);
      window.addEventListener('mouseup', stopResize);
    });
  
    function resize(e) {
      notepadContainer.style.width = (e.clientX - notepadContainer.offsetLeft) + 'px';
      notepadContainer.style.height = (e.clientY - notepadContainer.offsetTop) + 'px';
    }
  
    function stopResize() {
      window.removeEventListener('mousemove', resize);
      window.removeEventListener('mouseup', stopResize);
      // Save the new size to Chrome storage
      chrome.storage.sync.set({
        notepadSize: {
          width: notepadContainer.style.width,
          height: notepadContainer.style.height
        }
      });
    }
  });
  