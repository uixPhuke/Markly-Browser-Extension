import browser from "../utils/browser.js";

browser.runtime.onInstalled.addListener(() => {
  console.log("Markly installed");
});
