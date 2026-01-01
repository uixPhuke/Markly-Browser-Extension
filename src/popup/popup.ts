import browser from "webextension-polyfill";
const openBtn = document.getElementById("open") as HTMLButtonElement;

openBtn.onclick = () => {
  browser.tabs.create({
    url: browser.runtime.getURL("dist/sidebar.html")
  });
};
