async function restoreHighlights() {
  const result = await chrome.storage.local.get("highlights");
  const highlights = result.highlights || [];

  highlights
    .filter(h => h.url === location.href)
    .forEach(h => {
      const bodyText = document.body.innerHTML;
      if (bodyText.includes(h.text)) {
        document.body.innerHTML = bodyText.replace(
          h.text,
          `<mark style="background:yellow">${h.text}</mark>`
        );
      }
    });
}
restoreHighlights();
