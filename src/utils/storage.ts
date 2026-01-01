import browser from "./browser.js";
import { Highlight } from "../types/highlight.js";


const KEY = "highlights";

export async function getHighlights(): Promise<Highlight[]> {
  const result = await browser.storage.local.get(KEY);
  return result[KEY] || [];
}

export async function saveHighlight(highlight: Highlight) {
  const highlights = await getHighlights();
  await browser.storage.local.set({
    [KEY]: [...highlights, highlight]
  });
}

export async function updateHighlightNote(id: string, note: string) {
  const highlights = await getHighlights();
  const updated = highlights.map(h =>
    h.id === id ? { ...h, note } : h
  );
  await browser.storage.local.set({ [KEY]: updated });
}
