(function () {
  'use strict';

  class OverleafDetector {
    constructor() {
      this.projectId = null;
      this.init();
    }

    init() {
      this.detectProject();
      this.setupMessageListener();
    }

    detectProject() {
      const url = window.location.href;
      const match = url.match(/\/project\/([a-f0-9]+)/);
      if (match) {
        this.projectId = match[1];
        console.log('Overleaf Resume Sync: Project detected -', this.projectId);
        chrome.storage.local.set({
          projectId: this.projectId,
          projectUrl: url,
          lastDetected: Date.now()
        });
      }
    }

    setupMessageListener() {
      chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
        if (request.action === 'getProjectInfo') {
          sendResponse({
            projectId: this.projectId,
            url: window.location.href,
            title: document.title
          });
        }
      });
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => new OverleafDetector());
  } else {
    new OverleafDetector();
  }
})();
