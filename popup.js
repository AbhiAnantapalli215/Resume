// Popup script for the Chrome extension
class PopupController {
  constructor() {
    this.syncBtn = document.getElementById('syncBtn');
    this.setupBtn = document.getElementById('setupBtn');
    this.status = document.getElementById('status');
    this.loading = document.getElementById('loading');
    
    this.init();
  }

  async init() {
    this.setupEventListeners();
    await this.checkOverleafPage();
    await this.checkServerStatus();
  }

  setupEventListeners() {
    this.syncBtn.addEventListener('click', () => this.syncResume());
    this.setupBtn.addEventListener('click', () => this.openSetupGuide());
  }

  async checkOverleafPage() {
    try {
      const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
      
      if (!tab.url.includes('overleaf.com/project/')) {
        this.updateStatus('⚠️', 'Please navigate to your Overleaf project page');
        return false;
      }

      // Extract project ID from URL
      const projectId = this.extractProjectId(tab.url);
      if (!projectId) {
        this.updateStatus('❌', 'Could not detect Overleaf project ID');
        return false;
      }

      // Store project ID for later use
      await chrome.storage.local.set({ projectId });
      this.updateStatus('✅', 'Overleaf project detected');
      return true;
    } catch (error) {
      console.error('Error checking Overleaf page:', error);
      this.updateStatus('❌', 'Error checking page');
      return false;
    }
  }

  async checkServerStatus() {
    try {
      const response = await fetch('https://connection-99g4.onrender.com/health', {
        method: 'GET',
        timeout: 3000
      });

      if (response.ok) {
        this.syncBtn.disabled = false;
        this.updateStatus('🚀', 'Ready to sync! Click the button below.');
      } else {
        throw new Error('Server not responding');
      }
    } catch (error) {
      this.updateStatus('🔧', 'Local server not running. Check setup guide.');
      this.syncBtn.disabled = true;
    }
  }

  async syncResume() {
  this.showLoading(true);
  this.syncBtn.disabled = true;

  try {
    const { projectId } = await chrome.storage.local.get(['projectId']);
    if (!projectId) throw new Error('Project ID not found');

    const downloadUrl = `https://www.overleaf.com/project/${projectId}/download/zip`;

    // 🔥 Download ZIP from Overleaf directly in browser
    const zipRes = await fetch(downloadUrl, { credentials: 'include' });
    if (!zipRes.ok) throw new Error('Failed to download Overleaf project ZIP');

    const zipBlob = await zipRes.blob();
    const formData = new FormData();
    formData.append('zipfile', zipBlob, 'resume.zip');
    formData.append('projectId', projectId);

    // 🔥 Send ZIP file to server
    const syncRes = await fetch('https://connection-99g4.onrender.com/sync', {
      method: 'POST',
      body: formData,
    });

    const result = await syncRes.json();
    if (syncRes.ok) {
      this.updateStatus('✅', result.message || 'Resume synced successfully!');
    } else {
      throw new Error(result.error || 'Sync failed');
    }

    setTimeout(() => {
      this.updateStatus('🚀', 'Ready for next sync');
      this.syncBtn.disabled = false;
    }, 3000);

  } catch (err) {
    console.error('Sync error:', err);
    this.updateStatus('❌', err.message || 'Sync failed');
    this.syncBtn.disabled = false;
  } finally {
    this.showLoading(false);
  }
}


  openSetupGuide() {
    chrome.tabs.create({ url: chrome.runtime.getURL('setup.html') });
  }

  extractProjectId(url) {
    const match = url.match(/\/project\/([a-f0-9]+)/);
    return match ? match[1] : null;
  }

  updateStatus(icon, text) {
    const statusIcon = this.status.querySelector('.status-icon');
    const statusText = this.status.querySelector('.status-text');
    
    statusIcon.textContent = icon;
    statusText.textContent = text;
  }

  showLoading(show) {
    if (show) {
      this.loading.classList.remove('hidden');
      this.syncBtn.style.display = 'none';
    } else {
      this.loading.classList.add('hidden');
      this.syncBtn.style.display = 'block';
    }
  }
}

// Initialize popup when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  new PopupController();
});