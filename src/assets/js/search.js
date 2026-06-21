(function () {
  const input = document.getElementById("search-input");
  const results = document.getElementById("search-results");
  if (!input || !results) return;

  let pagefind;
  let debounceTimer;

  async function loadPagefind() {
    if (pagefind !== undefined) return pagefind;
    try {
      pagefind = await import("/pagefind/pagefind.js");
      await pagefind.init();
    } catch (err) {
      pagefind = null; // not built yet — see README
    }
    return pagefind;
  }

  input.addEventListener("input", () => {
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(runSearch, 150);
  });

  async function runSearch() {
    const query = input.value.trim();
    if (!query) {
      results.hidden = true;
      results.innerHTML = "";
      return;
    }

    const pf = await loadPagefind();
    if (!pf) {
      results.innerHTML =
        '<p class="search-results__empty">search isn\'t ready yet — run <code>npm run build</code> first.</p>';
      results.hidden = false;
      return;
    }

    const search = await pf.search(query);
    const data = await Promise.all(search.results.slice(0, 8).map((r) => r.data()));

    if (!data.length) {
      results.innerHTML = '<p class="search-results__empty">no words found.</p>';
      results.hidden = false;
      return;
    }

    results.innerHTML = data
      .map(
        (d) =>
          `<a class="search-results__item" href="${d.url}">${d.meta.title || d.url}</a>`
      )
      .join("");
    results.hidden = false;
  }

  document.addEventListener("click", (e) => {
    if (!e.target.closest(".search")) {
      results.hidden = true;
    }
  });
})();
