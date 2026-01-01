// const browser = chrome;
alert("Markly content script injected");
console.log("Markly content script loaded");
document.addEventListener("mouseup", async () => {
  const selection = window.getSelection();
  if (!selection || selection.isCollapsed) return;

  const text = selection.toString().trim();
  if (!text) return;

  const highlights = [];

  for (let i = 0; i < selection.rangeCount; i++) {
    const range = selection.getRangeAt(i);
    const walker = document.createTreeWalker(
      range.commonAncestorContainer,
      NodeFilter.SHOW_TEXT,
      {
        acceptNode(node) {
          if (!node.textContent || !node.textContent.trim()) {
            return NodeFilter.FILTER_REJECT;
          }
          return range.intersectsNode(node)
            ? NodeFilter.FILTER_ACCEPT
            : NodeFilter.FILTER_REJECT;
        }
      }
    );

    let node;
    while ((node = walker.nextNode())) {
      const nodeRange = document.createRange();
      nodeRange.selectNodeContents(node);

      const mark = document.createElement("mark");
      mark.style.backgroundColor = "#fde047";
      mark.style.padding = "2px";
      mark.style.borderRadius = "4px";

      try {
        nodeRange.surroundContents(mark);
        highlights.push(mark);
      } catch {}
    }
  }

  if (!highlights.length) return;

  const result = await browser.storage.local.get("highlights");

  const highlight = {
    id: crypto.randomUUID(),
    text,
    url: location.href,
    createdAt: new Date().toISOString(),
    note: ""
  };

  await browser.storage.local.set({
    highlights: [...(result.highlights ?? []), highlight]
  });

  selection.removeAllRanges();
});
