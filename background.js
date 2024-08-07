chrome.tabs.onUpdated.addListener((tabId, info, tab) => {
  if (info.status === 'complete') {
    if (tab.url && tab.url.includes('/investments/active/')) {
      const sendMessageToTab = () => {
        chrome.tabs.sendMessage(tabId, { type: 'INVESTMENTS' })
      }
      sendMessageToTab()
    } else {
      chrome.tabs.sendMessage(tabId, { type: 'RESET_INVESTMENTS' })
    }
  }
})

