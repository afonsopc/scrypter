import browser from "webextension-polyfill";
import { scriptStorage } from "./script";

browser.browserAction.onClicked.addListener(() => {
  browser.runtime.openOptionsPage();
});

browser.tabs.onUpdated.addListener(async (tabId, changeInfo, tab) => {
  if (changeInfo.status !== "complete" || !tab.url) return;

  try {
    const url = new URL(tab.url);
    const hostname = url.hostname;
    if (!url.protocol.startsWith("http")) return;

    (await scriptStorage.getScripts())
      .filter((script) => script.hostnames.includes(hostname) && script.enabled)
      .forEach(async (script) => {
        console.log(`Injecting script ${script.name} into ${hostname}`);
        await browser.tabs.executeScript(tabId, {
          code: script.code,
          runAt: "document_idle",
        });
      });
  } catch (error) {
    console.error(`Error injecting scripts for tab ${tabId}:`, error);
  }
});
