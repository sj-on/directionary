(async function () {
  const card = document.getElementById("word-of-day-card");
  if (!card) return;

  try {
    const res = await fetch("/words.json");
    if (!res.ok) throw new Error("manifest not found");
    const words = await res.json();

    if (!Array.isArray(words) || words.length === 0) {
      card.innerHTML =
        '<p class="word-card__loading">no words yet — be the first to <a href="/contribute/">contribute</a> one.</p>';
      return;
    }

    // Deterministic "today" pick: same word for everyone, all day, no
    // rebuild required. Rotates as soon as the dictionary grows.
    const start = Date.UTC(new Date().getUTCFullYear(), 0, 0);
    const dayOfYear = Math.floor((Date.now() - start) / 86400000);
    const pick = words[dayOfYear % words.length];

    render(card, pick);
  } catch (err) {
    card.innerHTML =
      '<p class="word-card__loading">word of the day will appear once the site is built and deployed.</p>';
  }

  function render(el, w) {
    el.innerHTML = `
      <p class="word-card__eyebrow">today's pick</p>
      <h3 class="word-card__word">${escapeHTML(w.word)}</h3>
      ${w.pronunciation ? `<p class="word-card__pronunciation">${escapeHTML(w.pronunciation)}</p>` : ""}
      <span class="word-card__pos">${escapeHTML(w.pos)}</span>
      <p class="word-card__meaning">${escapeHTML(w.meaning)}</p>
      <a class="word-card__link" href="/${w.letter}/${w.slug}/">see full entry →</a>
    `;
  }

  function escapeHTML(str) {
    const div = document.createElement("div");
    div.textContent = str;
    return div.innerHTML;
  }
})();
