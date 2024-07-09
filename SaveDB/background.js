chrome.commands.onCommand.addListener(function (command) {
  if (command === "open_popup") {
    chrome.tabs.create({ url: 'popup.html' });
  }
});
