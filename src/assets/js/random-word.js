(function () {
  document.querySelectorAll("#random-link, #random-link-footer").forEach((link) => {
    link.addEventListener("click", async function (e) {
      e.preventDefault();
      try {
        const res = await fetch("/words.json");
        const words = await res.json();
        if (!words.length) return;
        const pick = words[Math.floor(Math.random() * words.length)];
        window.location.href = `/${pick.letter}/${pick.slug}/`;
      } catch (err) {
        console.error("directionary: couldn't fetch a random word", err);
      }
    });
  });
})();
