chrome.tabs.onUpdated.addListener((tabId, info, tab) => {
  if (info.status === 'complete' && tab.url && tab.url.includes("https://app.libertex.org/investments/active/")) {
    const sendMessageToTab = () => {
      chrome.tabs.sendMessage(tabId, { type: "INVESTMENTS" }, (response) => {
        if (chrome.runtime.lastError) {
          // Retry after a short delay if the content script isn't ready
          setTimeout(sendMessageToTab, 100);
        }
      });
    };
    sendMessageToTab();
  }
});

chrome.tabs.onActivated.addListener(activeInfo => {
  chrome.tabs.get(activeInfo.tabId, (tab) => {
    if (tab.url && !tab.url.includes("https://app.libertex.org/investments/active/")) {
      chrome.tabs.sendMessage(tab.id, { type: "RESET_INVESTMENTS" });
    }
  });
});


