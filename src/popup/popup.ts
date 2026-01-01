const openBtn = document.getElementById("open") as HTMLButtonElement;

openBtn.onclick = () => {
  chrome.tabs.create({
    url: chrome.runtime.getURL("dist/sidebar.html")
  });
};
