alert("Markly is running");

document.addEventListener("mouseup", () => {
  const sel = window.getSelection();
  if (!sel || sel.isCollapsed) return;

  const range = sel.getRangeAt(0);
  const mark = document.createElement("mark");
  mark.style.background = "yellow";

  try {
    range.surroundContents(mark);
    sel.removeAllRanges();
  } catch {}
});
