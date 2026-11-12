(() => {
  "use strict";
  const overlay = document.getElementById("specialLetterExperience");
  const video = document.getElementById("letterVideo");
  const openButton = document.getElementById("specialLetterBtn");
  const closeButton = document.getElementById("letterCloseBtn");
  if (!overlay || !video || !openButton || !closeButton) return;

  // Change this one line if you want a different short closing message.
  const FINAL_NOTE = "A little something, just for you. 🌻";
  document.getElementById("letterFinalNote").textContent = FINAL_NOTE;

  function openExperience() {
    overlay.style.display = "flex";
    overlay.setAttribute("aria-hidden", "false");
    overlay.classList.remove("is-finished");
    requestAnimationFrame(() => overlay.classList.add("is-open"));
    video.currentTime = 0;
    const playback = video.play();
    if (playback && typeof playback.catch === "function") {
      playback.catch(() => {
        // The visitor can tap the video if the browser blocks playback.
        video.controls = true;
      });
    }
  }

  function closeExperience() {
    video.pause();
    video.currentTime = 0;
    video.controls = false;
    overlay.classList.remove("is-open", "is-finished");
    overlay.setAttribute("aria-hidden", "true");
    window.setTimeout(() => {
      if (!overlay.classList.contains("is-open")) overlay.style.display = "none";
    }, 720);
  }

  video.addEventListener("ended", () => overlay.classList.add("is-finished"));
  openButton.addEventListener("click", openExperience);
  closeButton.addEventListener("click", closeExperience);
  document.addEventListener("keydown", event => {
    if (event.key === "Escape" && overlay.classList.contains("is-open")) closeExperience();
  });
})();
