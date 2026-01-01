import { Highlight } from "../types/highlight";

document.addEventListener("mouseup", () => {
  const selection = window.getSelection();
  if (!selection || selection.toString().trim() === "") return;

  const range = selection.getRangeAt(0);
  const mark = document.createElement("mark");

  mark.style.backgroundColor = "#fde047";
  mark.style.padding = "2px";
  mark.style.borderRadius = "4px";

  range.surroundContents(mark);

  const highlight: Highlight = {
    id: crypto.randomUUID(),
    text: mark.innerText,
    url: location.href,
    createdAt: new Date().toISOString(),
    note: ""
  };

  chrome.storage.local.get({ highlights: [] }, (res) => {
    const updated = [...res.highlights, highlight];
    chrome.storage.local.set({ highlights: updated });
  });

  selection.removeAllRanges();
});
