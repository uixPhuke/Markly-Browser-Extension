import browser from "../utils/browser.js";

const openBtn = document.getElementById("open") as HTMLButtonElement;

openBtn.onclick = () => {
  browser.tabs.create({
    url: browser.runtime.getURL("dist/sidebar.html")
  });
};
