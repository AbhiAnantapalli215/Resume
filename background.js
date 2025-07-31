chrome.runtime.onInstalled.addListener((details) => {
  if (details.reason === 'install') {
    chrome.tabs.create({
      url: chrome.runtime.getURL('setup.html')
    });
  }
});

function isOverleafProjectTab(url) {
  try {
    const parsed = new URL(url);
    return parsed.hostname === "www.overleaf.com" && parsed.pathname.startsWith("/project/");
  } catch {
    return false;
  }
}

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.status === 'complete') {
    if (isOverleafProjectTab(tab.url)) {
      chrome.action.setBadgeText({ text: '✓', tabId });
      chrome.action.setBadgeBackgroundColor({ color: '#10b981', tabId });
    } else {
      chrome.action.setBadgeText({ text: '', tabId });
    }
  }
});

chrome.tabs.onActivated.addListener(async (activeInfo) => {
  const tab = await chrome.tabs.get(activeInfo.tabId);
  if (!isOverleafProjectTab(tab.url)) {
    chrome.action.setBadgeText({ text: '', tabId: activeInfo.tabId });
  }
});
