chrome.tabs.onUpdated.addListener((tabId, info, tab) => {
  if (tab.url && tab.url.includes('https://tilda.cc/page/')) {
    const queryParameters = tab.url.split('?')[1]
    const urlParameters = new URLSearchParams(queryParameters)

    chrome.tabs.sendMessage(tabId, {
      type: 'NEW',
      pageId: urlParameters.get('pageid'),
    })
  }
})
