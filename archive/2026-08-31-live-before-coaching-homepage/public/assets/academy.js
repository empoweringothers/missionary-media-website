"use strict";

(() => {
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  const rails = Array.from(document.querySelectorAll("[data-academy-rail]"));

  rails.forEach((rail) => {
    const viewport = rail.querySelector("[data-academy-rail-viewport]");
    const previous = rail.querySelector("[data-rail-previous]");
    const next = rail.querySelector("[data-rail-next]");
    const progress = rail.querySelector(".academy-rail__progress span");
    const firstTile = viewport?.querySelector(".academy-tile");

    if (!viewport || !previous || !next || !progress) return;

    const maximumScroll = () => Math.max(0, viewport.scrollWidth - viewport.clientWidth);

    const updateControls = () => {
      const maximum = maximumScroll();
      const position = Math.max(0, Math.min(viewport.scrollLeft, maximum));
      const percentage = maximum > 1 ? (position / maximum) * 100 : 100;

      progress.style.setProperty("--rail-progress", `${percentage.toFixed(2)}%`);
      previous.disabled = position <= 2;
      next.disabled = maximum <= 1 || position >= maximum - 2;
    };

    const scrollAmount = () => {
      const tileWidth = firstTile?.getBoundingClientRect().width || viewport.clientWidth * 0.78;
      const track = viewport.querySelector(".academy-track");
      const styles = track ? window.getComputedStyle(track) : null;
      const gap = styles ? Number.parseFloat(styles.columnGap || styles.gap) || 0 : 0;
      return Math.min(viewport.clientWidth * 0.9, tileWidth + gap);
    };

    const move = (direction) => {
      viewport.scrollBy({
        left: direction * scrollAmount(),
        behavior: reducedMotion.matches ? "auto" : "smooth"
      });
    };

    previous.addEventListener("click", () => move(-1));
    next.addEventListener("click", () => move(1));
    viewport.addEventListener("scroll", updateControls, { passive: true });
    viewport.addEventListener("keydown", (event) => {
      if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") return;
      event.preventDefault();
      move(event.key === "ArrowLeft" ? -1 : 1);
    });

    if ("ResizeObserver" in window) {
      const observer = new ResizeObserver(updateControls);
      observer.observe(viewport);
      observer.observe(viewport.firstElementChild || viewport);
    } else {
      window.addEventListener("resize", updateControls, { passive: true });
    }

    window.requestAnimationFrame(updateControls);
  });

  const dialog = document.querySelector("#academy-detail-dialog");
  const dialogMedia = dialog?.querySelector("[data-academy-detail-media]");
  const dialogImage = dialog?.querySelector("[data-academy-detail-image]");
  const dialogTitle = dialog?.querySelector("[data-academy-detail-title]");
  const dialogMeta = dialog?.querySelector("[data-academy-detail-meta]");
  const dialogDescription = dialog?.querySelector("[data-academy-detail-description]");
  const dialogLabel = dialogMedia?.querySelector("span");
  const interestLink = dialog?.querySelector("[data-academy-detail-interest]");
  const closeButtons = dialog ? Array.from(dialog.querySelectorAll("[data-academy-detail-close]")) : [];
  let lastTrigger = null;

  const closeDialog = () => {
    if (dialog?.open) dialog.close();
  };

  const openDialog = (tile, trigger) => {
    if (!dialog || !dialogMedia || !dialogImage || !dialogTitle || !dialogMeta || !dialogDescription || !dialogLabel) return;

    const title = tile.querySelector("h3")?.textContent.trim() || "Course concept";
    const meta = tile.querySelector(".academy-tile__meta")?.textContent.trim() || "Academy course preview";
    const description = tile.querySelector(".academy-tile__body > p:last-child")?.textContent.trim() || "This proposed course direction is still being shaped.";
    const poster = tile.querySelector(".academy-tile__poster");
    const posterImage = poster?.querySelector("img");
    const posterLabel = poster?.querySelector("span")?.textContent.trim() || "Concept preview";
    const artClass = poster ? Array.from(poster.classList).find((className) => className.startsWith("academy-art--")) : null;

    dialogTitle.textContent = title;
    dialogMeta.textContent = meta;
    dialogDescription.textContent = description;
    dialogLabel.textContent = posterLabel;
    dialogMedia.className = "academy-detail-dialog__media";

    if (posterImage) {
      dialogImage.src = posterImage.getAttribute("src");
      dialogImage.hidden = false;
      dialogMedia.classList.add("has-image");
    } else {
      dialogImage.hidden = true;
      dialogMedia.classList.add("is-art");
      if (artClass) dialogMedia.classList.add(artClass);
    }

    lastTrigger = trigger;
    dialog.showModal();
    document.body.classList.add("academy-dialog-open");
  };

  if (dialog) {
    document.querySelectorAll(".academy-tile").forEach((tile) => {
      const title = tile.querySelector("h3")?.textContent.trim() || "course concept";
      const button = document.createElement("button");
      button.className = "academy-tile__detail";
      button.type = "button";
      button.setAttribute("aria-label", `Preview ${title}`);
      button.innerHTML = '<span aria-hidden="true">i</span>';
      button.addEventListener("click", () => openDialog(tile, button));
      tile.append(button);
    });

    closeButtons.forEach((button) => button.addEventListener("click", closeDialog));
    interestLink?.addEventListener("click", closeDialog);
    dialog.addEventListener("click", (event) => {
      if (event.target === dialog) closeDialog();
    });
    dialog.addEventListener("keydown", (event) => {
      if (event.key !== "Escape") return;
      event.preventDefault();
      closeDialog();
    });
    dialog.addEventListener("cancel", (event) => {
      event.preventDefault();
      closeDialog();
    });
    dialog.addEventListener("close", () => {
      document.body.classList.remove("academy-dialog-open");
      if (lastTrigger?.isConnected) lastTrigger.focus({ preventScroll: true });
      lastTrigger = null;
    });
  }
})();
