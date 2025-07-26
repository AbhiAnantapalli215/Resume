// Background service worker
chrome.runtime.onInstalled.addListener((details) => {
  if (details.reason === 'install') {
    // Open setup guide on first install
    chrome.tabs.create({
      url: chrome.runtime.getURL('setup.html')
    });
  }
});

// Handle extension icon click
chrome.action.onClicked.addListener((tab) => {
  // This will open the popup automatically
});

// Monitor tab updates to detect Overleaf projects
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.status === 'complete' && tab.url?.includes('overleaf.com/project/')) {
    // Update badge to show project is detected
    chrome.action.setBadgeText({
      text: '✓',
      tabId: tabId
    });
    chrome.action.setBadgeBackgroundColor({
      color: '#10b981',
      tabId: tabId
    });
  }
});

// Clear badge when leaving Overleaf
chrome.tabs.onActivated.addListener(async (activeInfo) => {
  const tab = await chrome.tabs.get(activeInfo.tabId);
  if (!tab.url?.includes('overleaf.com/project/')) {
    chrome.action.setBadgeText({
      text: '',
      tabId: activeInfo.tabId
    });
  }
});