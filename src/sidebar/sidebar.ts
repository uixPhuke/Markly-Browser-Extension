import browser from "../utils/browser.js";
import { Highlight } from "../types/highlight.js";

const root = document.getElementById("root") as HTMLDivElement;

async function render() {
  const result = (await browser.storage.local.get("highlights")) as {
  highlights?: Highlight[];
};

const highlights: Highlight[] = result.highlights ?? [];

  root.innerHTML = `
    <h2>Markly Notes</h2>
    ${highlights
      .map(
        (h) => `
        <div>
          <p>${h.text}</p>
          <textarea data-id="${h.id}">${h.note}</textarea>
        </div>
      `
      )
      .join("")}
  `;

  document.querySelectorAll("textarea").forEach((el) => {
    el.addEventListener("input", async (e) => {
      const target = e.target as HTMLTextAreaElement;
      await updateNote(target.dataset.id!, target.value);
    });
  });
}

async function updateNote(id: string, note: string) {
  const result = (await browser.storage.local.get("highlights")) as {
  highlights?: Highlight[];
};

const highlights: Highlight[] = result.highlights ?? [];

  const updated = highlights.map((h) =>
    h.id === id ? { ...h, note } : h
  );

  await browser.storage.local.set({ highlights: updated });
}

render();
