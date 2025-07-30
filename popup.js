class PopupController {
  constructor() {
    this.syncBtn = document.getElementById("syncBtn");
    this.setupBtn = document.getElementById("setupBtn");
    this.status = document.getElementById("status");
    this.loadingRing = document.getElementById("loadingRing");

    this.isOverleafReady = false;
    this.isServerReady = false;

    this.setupEventListeners();
    this.init();
    this.generateDots(); 
  }


generateDots() {
    const dotContainer = document.querySelector('.dot-background');
    const dotCount = 10; // number of dots

    for (let i = 0; i < dotCount; i++) {
      const dot = document.createElement('div');
      dot.classList.add('dot');

      const size = Math.floor(Math.random() * 15) + 6;
      const x = Math.random() * 100;
      const y = Math.random() * 100;

      dot.style.width = `${size}px`;
      dot.style.height = `${size}px`;
      dot.style.top = `${y}%`;
      dot.style.left = `${x}%`;

      dotContainer.appendChild(dot);
    }
  }
  
  async init() {
    await this.checkOverleafPage();
    await this.checkServerStatus();
    this.updateSyncButtonState();
  }

  setupEventListeners() {
    this.syncBtn.addEventListener("click", () => this.syncResume());
    this.setupBtn.addEventListener("click", () => this.openSetupGuide());
  }

  async checkOverleafPage() {
    try {
      const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

      if (!tab.url.includes("overleaf.com/project/")) {
        this.updateStatus("⚠️", "Please navigate to your Overleaf project page");
        this.isOverleafReady = false;
        return;
      }

      const projectId = this.extractProjectId(tab.url);
      if (!projectId) {
        this.updateStatus("❌", "Could not detect Overleaf project ID");
        this.isOverleafReady = false;
        return;
      }

      await chrome.storage.local.set({ projectId });
      this.updateStatus("✅", "Overleaf project detected");
      this.isOverleafReady = true;
    } catch (error) {
      console.error("Overleaf check failed:", error);
      this.updateStatus("❌", "Error checking Overleaf page");
      this.isOverleafReady = false;
    }
  }

  async checkServerStatus() {
    try {
      const response = await fetch("https://connection-99g4.onrender.com/health", {
        method: "GET",
      });

      if (response.ok) {
        this.isServerReady = true;
        this.updateStatus("🚀", "Ready to sync! Click the button below.");
      } else {
        this.isServerReady = false;
        throw new Error("Server not OK");
      }
    } catch (error) {
      console.error("Server status error:", error);
      this.updateStatus("🔧", "Local server not running. Check setup guide.");
      this.isServerReady = false;
    }
  }

  updateSyncButtonState() {
    if (this.isOverleafReady && this.isServerReady) {
      this.syncBtn.disabled = false;
    } else {
      this.syncBtn.disabled = true;
    }
  }

  async syncResume() {
    this.showLoading(true);
    this.syncBtn.disabled = true;

    try {
      const { projectId } = await chrome.storage.local.get(["projectId"]);
      if (!projectId) throw new Error("Project ID not found");

      const downloadUrl = `https://www.overleaf.com/project/${projectId}/download/zip`;

      const zipRes = await fetch(downloadUrl, { credentials: "include" });
      if (!zipRes.ok) throw new Error("Failed to download ZIP");

      const zipBlob = await zipRes.blob();
      const formData = new FormData();
      formData.append("zipfile", zipBlob, "resume.zip");
      formData.append("projectId", projectId);

      const syncRes = await fetch("https://connection-99g4.onrender.com/sync", {
        method: "POST",
        body: formData
      });

      const result = await syncRes.json();
      if (syncRes.ok) {
        this.updateStatus("✅", result.message || "Resume synced successfully!");
      } else {
        throw new Error(result.error || "Sync failed");
      }

      setTimeout(() => {
        this.updateStatus("🚀", "Ready for next sync");
        this.syncBtn.disabled = false;
      }, 3000);
    } catch (err) {
      console.error("Sync failed:", err);
      this.updateStatus("❌", err.message || "Sync failed");
      this.syncBtn.disabled = false;
    } finally {
      this.showLoading(false);
    }
  }

  showLoading(show) {
    if (show) {
      this.loadingRing.classList.remove("hidden");
      this.syncBtn.textContent = "Syncing...";
      // this.syncBtn.style.display = "none";
    } else {
      this.loadingRing.classList.add("hidden");
      this.syncBtn.textContent = "Sync"; 
      this.syncBtn.style.display = "block";
    }
  }

  updateStatus(icon, text) {
    const statusIcon = this.status.querySelector(".status-icon");
    const statusText = this.status.querySelector(".status-text");
    statusIcon.textContent = icon;
    statusText.textContent = text;
  }

  extractProjectId(url) {
    const match = url.match(/\/project\/([a-f0-9]+)/);
    return match ? match[1] : null;
  }

  openSetupGuide() {
    chrome.tabs.create({ url: chrome.runtime.getURL("setup.html") });
  }
}

document.addEventListener("DOMContentLoaded", () => {
  new PopupController();
});
