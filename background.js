importScripts("utils/api.js");

// Trigger autofill on page load
api.tabs.onUpdated.addListener((tabId, info, tab) => {
  if (info.status === "complete" && tab.url.startsWith("http")) {
    api.tabs.sendMessage(tabId, { action: "autofill" });
  }
});