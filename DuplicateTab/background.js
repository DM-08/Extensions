chrome.commands.onCommand.addListener((command) => {
  if (command === "duplicate-tab") {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      if (tabs.length > 0) {
        chrome.tabs.duplicate(tabs[0].id);
      }
    });
  }
});
