import browser from "../utils/browser.js";
import { Highlight } from "../types/highlight.js";

document.addEventListener("mouseup", async () => {
  const selection = window.getSelection();
  if (!selection || selection.toString().trim() === "") return;

  const range = selection.getRangeAt(0);
  const mark = document.createElement("mark");
  mark.style.backgroundColor = "#fde047";

  range.surroundContents(mark);

  const highlight: Highlight = {
    id: crypto.randomUUID(),
    text: mark.innerText,
    url: location.href,
    createdAt: new Date().toISOString(),
    note: ""
  };

  const result = (await browser.storage.local.get("highlights")) as {
  highlights?: Highlight[];
};

const highlights: Highlight[] = result.highlights ?? [];

await browser.storage.local.set({
  highlights: [...highlights, highlight]
});


  selection.removeAllRanges();
});
