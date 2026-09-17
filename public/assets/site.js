"use strict";

const MissionaryMediaStoryVideo = (() => {
  const modifiedClick = (event) => Boolean(event.metaKey || event.ctrlKey || event.shiftKey || event.altKey);

  const embedSrcWithPlaysinline = (src) => {
    if (!src) return "";
    try {
      const url = new URL(src, "https://www.youtube-nocookie.com/");
      url.searchParams.set("playsinline", "1");
      return url.toString();
    } catch {
      return src.includes("playsinline=") ? src : `${src}${src.includes("?") ? "&" : "?"}playsinline=1`;
    }
  };

  const openStoryVideo = ({ event, dialog, frame, fallback, watchUrl, assignLocation }) => {
    if (modifiedClick(event)) return "ignore";
    event.preventDefault();
    const navigate = () => {
      if (typeof assignLocation === "function" && watchUrl) assignLocation(watchUrl);
      return "navigate";
    };
    if (!dialog || typeof dialog.showModal !== "function") return navigate();
    try {
      dialog.showModal();
    } catch {
      return navigate();
    }
    if (frame) {
      frame.src = embedSrcWithPlaysinline(frame.dataset && frame.dataset.src);
      frame.hidden = false;
    }
    if (fallback) fallback.hidden = true;
    return "dialog";
  };

  const closeStoryVideo = ({ frame, fallback }) => {
    if (frame) {
      frame.hidden = true;
      frame.removeAttribute("src");
    }
    if (fallback) fallback.hidden = false;
  };

  return { embedSrcWithPlaysinline, openStoryVideo, closeStoryVideo };
})();

if (typeof module === "object" && module.exports) {
  module.exports = MissionaryMediaStoryVideo;
}

(() => {
  if (typeof document === "undefined") return;
  const root = document.documentElement;
  root.classList.replace("no-js", "js");
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  const desktop = window.matchMedia("(min-width: 1024px)");
  const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)");
  const header = document.querySelector(".site-header");
  const activeAnimations = new Set();

  const setHeader = () => header?.classList.toggle("is-scrolled", window.scrollY > 12);
  window.addEventListener("scroll", setHeader, { passive: true });
  setHeader();

  // Shared Resources surface: gentle entrance and a matching eased close.
  const dropdown = document.querySelector("[data-dropdown]");
  const trigger = dropdown?.querySelector(".nav-trigger");
  const panel = dropdown?.querySelector(".dropdown-panel");
  let hideTimer = 0;
  let hoverTimer = 0;
  let leaveTimer = 0;
  let openFrame = 0;
  const panelLinks = () => Array.from(panel.querySelectorAll("a[href]"));
  const closeDropdown = (restoreFocus = false, immediate = false) => {
    if (!panel) return;
    clearTimeout(hideTimer);
    clearTimeout(hoverTimer);
    clearTimeout(leaveTimer);
    cancelAnimationFrame(openFrame);
    trigger.setAttribute("aria-expanded", "false");
    panel.classList.remove("is-open");
    panel.inert = true;
    if (immediate || reducedMotion.matches) panel.hidden = true;
    else hideTimer = window.setTimeout(() => { panel.hidden = true; }, 530);
    if (restoreFocus) trigger.focus();
  };
  const openDropdown = (focus = false) => {
    if (!panel || !desktop.matches) return;
    clearTimeout(hideTimer);
    clearTimeout(hoverTimer);
    clearTimeout(leaveTimer);
    cancelAnimationFrame(openFrame);
    panel.hidden = false;
    panel.inert = false;
    trigger.setAttribute("aria-expanded", "true");
    openFrame = requestAnimationFrame(() => {
      panel.classList.add("is-open");
      if (!reducedMotion.matches && "animate" in Element.prototype) {
        const surface = panel.querySelector(".panel-surface");
        surface.getAnimations().forEach((animation) => animation.cancel());
        animateOnce(surface, [
          { opacity: 0, transform: "scale(.975) translateY(5px)" },
          { opacity: 1, offset: 0.35 },
          { opacity: 1, transform: "scale(1) translateY(0)" }
        ], { duration: 1450, easing: landingEase });
      }
      if (focus) panelLinks()[0]?.focus();
    });
  };
  if (dropdown) {
    trigger.addEventListener("click", () => {
      if (trigger.getAttribute("aria-expanded") === "true") closeDropdown();
      else openDropdown();
    });
    trigger.addEventListener("keydown", (event) => {
      if (event.key === "ArrowDown") { event.preventDefault(); openDropdown(true); }
    });
    dropdown.addEventListener("pointerenter", () => {
      if (!finePointer.matches) return;
      clearTimeout(leaveTimer);
      hoverTimer = window.setTimeout(() => openDropdown(), 200);
    });
    dropdown.addEventListener("pointerleave", () => {
      clearTimeout(hoverTimer);
      leaveTimer = window.setTimeout(() => {
        if (!dropdown.contains(document.activeElement)) closeDropdown();
      }, 210);
    });
    dropdown.addEventListener("focusout", () => {
      window.setTimeout(() => {
        if (!dropdown.contains(document.activeElement)) closeDropdown();
      }, 0);
    });
    dropdown.addEventListener("keydown", (event) => {
      if (event.key === "Escape") { event.preventDefault(); closeDropdown(true); }
    });
    panel.addEventListener("keydown", (event) => {
      const keys = ["ArrowDown", "ArrowUp", "Home", "End"];
      if (!keys.includes(event.key)) return;
      const links = panelLinks();
      const i = links.indexOf(document.activeElement);
      if (i < 0) return;
      event.preventDefault();
      const next = event.key === "Home" ? 0 : event.key === "End" ? links.length - 1 : (i + (event.key === "ArrowDown" ? 1 : -1) + links.length) % links.length;
      links[next].focus();
    });
    panel.addEventListener("click", (event) => {
      if (event.target.closest("a")) closeDropdown(false, true);
    });
    document.addEventListener("pointerdown", (event) => {
      if (!dropdown.contains(event.target)) closeDropdown();
    });
  }

  const drawer = document.querySelector(".mobile-drawer");
  const menuButton = document.querySelector(".mobile-menu-button");
  const syncDialogScroll = () => document.body.classList.toggle("modal-open", Boolean(document.querySelector("dialog[open]")));
  // Keep the first and last controls connected in both directions.
  document.querySelectorAll("dialog").forEach((dialog) => {
    dialog.addEventListener("keydown", (event) => {
      if (event.key !== "Tab") return;
      const controls = Array.from(dialog.querySelectorAll("a[href], button:not([disabled]), input:not([disabled]), textarea:not([disabled]), select:not([disabled]), iframe, [tabindex='0']"))
        .filter((element) => element.getClientRects().length > 0);
      const first = controls[0];
      const last = controls[controls.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    });
  });
  const closeDrawer = () => { if (drawer?.open) drawer.close(); };
  menuButton?.addEventListener("click", () => {
    closeDropdown(false, true);
    drawer.showModal();
    menuButton.setAttribute("aria-expanded", "true");
    syncDialogScroll();
    drawer.querySelector(".drawer-close").focus();
  });
  drawer?.querySelector(".drawer-close").addEventListener("click", closeDrawer);
  drawer?.addEventListener("click", (event) => { if (event.target.closest("a[href]")) closeDrawer(); });
  drawer?.addEventListener("close", () => {
    menuButton.setAttribute("aria-expanded", "false");
    syncDialogScroll();
  });
  desktop.addEventListener("change", () => {
    closeDropdown(false, true);
    if (desktop.matches) closeDrawer();
  });

  const landingEase = "cubic-bezier(.32,0,.22,1)";
  const animateOnce = (element, frames, options) => {
    const animation = element.animate(frames, options);
    activeAnimations.add(animation);
    animation.finished.then(() => activeAnimations.delete(animation)).catch(() => activeAnimations.delete(animation));
    return animation;
  };

  if (!reducedMotion.matches && "animate" in Element.prototype && header) {
    const shell = header.querySelector(".header-shell");
    const items = [header.querySelector(".wordmark"), ...header.querySelectorAll(".primary-nav > .nav-link, .nav-trigger"), header.querySelector(".header-cta"), menuButton]
      .filter((element) => element && element.getClientRects().length);
    const center = shell.getBoundingClientRect().left + shell.offsetWidth / 2;
    const positions = items.map((element) => {
      const rect = element.getBoundingClientRect();
      return Math.max(-18, Math.min(18, (center - rect.left - rect.width / 2) * 0.04));
    });
    items.forEach((element, i) => animateOnce(element, [
      { opacity: 0, transform: `translateX(${positions[i]}px) scale(.97)` },
      { opacity: 1, offset: 0.35 },
      { opacity: 1, transform: "translateX(0) scale(1)" }
    ], { duration: 1650, delay: i * 55, easing: landingEase, fill: "backwards" }));
  }

  const clamp = (value) => Math.min(1, Math.max(0, value));
  const scrollMotion = (element, frames, start = 0, end = 1, easing = landingEase) => {
    const animation = element.animate(frames, {
      duration: (end - start) * 1000, delay: start * 1000, easing, fill: "both"
    });
    animation.pause();
    animation.currentTime = 0;
    return animation;
  };
  // Rolling pin: each copy unit sits on the same horizontal cylinder. pinAngle
  // turns with chapter scroll; lineOffset staggers lines into a curve. Never
  // rotateX the whole column as one slab.
  const pinProgressAt = (top, enterStart, settleStart, settleEnd, exitEnd) => {
    if (top >= enterStart) return 0;
    if (top <= exitEnd) return 1;
    if (top > settleStart) return 0.24 * (enterStart - top) / (enterStart - settleStart);
    if (top >= settleEnd) return 0.24 + 0.48 * (settleStart - top) / (settleStart - settleEnd);
    return 0.72 + 0.28 * (settleEnd - top) / (settleEnd - exitEnd);
  };
  const clearPinLine = (el) => {
    if (!el) return;
    el.style.removeProperty("--pin-x");
    el.style.removeProperty("--pin-z");
    el.style.removeProperty("--pin-s");
    el.style.removeProperty("--pin-o");
  };
  // Wrap actual rendered lines after fonts/layout settle. Keep text in normal
  // reading order; restore the source before every width or motion-mode change.
  const rollingCopy = new Map();
  const prepareRollingCopy = (story, enabled) => {
    story.querySelectorAll(".example-difficulty, .example-help").forEach((copy) => {
      if (!rollingCopy.has(copy)) rollingCopy.set(copy, copy.textContent);
      const text = rollingCopy.get(copy);
      copy.textContent = text;
      if (!enabled) return;
      const groups = [];
      const range = document.createRange();
      for (const match of text.matchAll(/\S+\s*/g)) {
        range.setStart(copy.firstChild, match.index);
        range.setEnd(copy.firstChild, match.index + match[0].trimEnd().length);
        const top = Math.round(range.getBoundingClientRect().top);
        if (!groups.length || groups[groups.length - 1].top !== top) groups.push({ top, words: [] });
        groups[groups.length - 1].words.push(match[0]);
      }
      range.detach();
      copy.replaceChildren(...groups.map((group) => {
        const line = document.createElement("span");
        line.className = "roll-line";
        line.textContent = group.words.join("");
        return line;
      }));
    });
  };
  const applyPinLines = (lines, p, viewport) => {
    lines.forEach((el) => {
      // Measure untransformed layout so the effect never feeds back on itself.
      let top = 0;
      for (let node = el; node; node = node.offsetParent) top += node.offsetTop;
      const mid = top - window.scrollY + el.offsetHeight / 2;
      const incoming = Math.max(0, Math.min(1, (mid / viewport - .74) / .26));
      const outgoing = Math.max(0, Math.min(1, (.20 - mid / viewport) / .20));
      const angle = 38 * incoming - 30 * outgoing;
      el.style.setProperty("--pin-x", `${angle}deg`);
      el.style.setProperty("--pin-z", `${-Math.abs(angle) * .25}px`);
      el.style.setProperty("--pin-s", "1");
      el.style.setProperty("--pin-o", "1");
    });
  };
  const makeNarrative = (scene) => {
    const motions = [];
    const art = scene.querySelector(".scene-art");
    const center = { x: art.offsetWidth * 0.49, y: art.offsetHeight * 0.48 };
    const origin = (element, point = center, scale = 0.86, lift = 0) =>
      `translate3d(${point.x - element.offsetLeft - element.offsetWidth / 2}px,${point.y - element.offsetTop - element.offsetHeight / 2 + lift}px,0) scale(${scale})`;
    const add = (element, frames, start, end, easing) => {
      if (element) motions.push(scrollMotion(element, frames, start, end, easing));
    };
    if (scene.classList.contains("scene-sending")) {
      const letter = scene.querySelector(".update-letter");
      const shadows = Array.from(scene.querySelectorAll(".letter-shadow"));
      const recipients = Array.from(scene.querySelectorAll(".recipient"));
      const letterPoint = letter
        ? { x: letter.offsetLeft + letter.offsetWidth / 2, y: letter.offsetTop + letter.offsetHeight / 2 }
        : center;
      // Read each final position before writing animations. Recipients begin
      // behind the paper, fan out with the repeated-send frustration, then
      // settle as one prepared update reaching each group.
      add(letter, [
        { opacity: 0, transform: origin(letter, center, 0.88, 28) },
        { opacity: 0.7, transform: origin(letter, center, 0.96), offset: 0.32 },
        { opacity: 1, transform: "translate3d(0,0,0) scale(1)" }
      ], 0, 0.42, "cubic-bezier(.4,0,.2,1)");
      shadows.forEach((shadow, i) => add(shadow, [
        { opacity: 0, transform: origin(shadow, center, 0.88, 28) },
        { opacity: 0.85, transform: "translate3d(0,0,0) scale(1)", offset: 0.42 },
        { opacity: 0, transform: origin(shadow, letterPoint, 1) }
      ], 0.04 + i * 0.03, 0.78 + i * 0.04, "cubic-bezier(.4,0,.2,1)"));
      recipients.forEach((recipient, i) => add(recipient, [
        { opacity: 0, transform: origin(recipient, center, 0.78) },
        { opacity: 1, offset: 0.18 },
        { opacity: 1, transform: "translate3d(0,0,0) scale(1)" }
      ], 0.26 + i * 0.1, 0.62 + i * 0.08));
      scene.querySelectorAll(".recipient-frustration").forEach((label, i) => add(label, [
        { opacity: 0 },
        { opacity: 1, offset: 0.22 },
        { opacity: 1, offset: 0.58 },
        { opacity: 0 }
      ], 0.3 + i * 0.08, 0.86));
      scene.querySelectorAll(".recipient-relief").forEach((label, i) => add(label, [
        { opacity: 0 },
        { opacity: 1 }
      ], 0.7 + i * 0.06, 0.92 + i * 0.02));
      scene.querySelectorAll(".recipient-mark").forEach((mark, i) => add(mark, [
        { opacity: 0, transform: "scale(.62)" },
        { opacity: 1, transform: "scale(1)" }
      ], 0.72 + i * 0.06, 0.94 + i * 0.02));
      add(scene.querySelector(".sending-paths"), [{ opacity: 0 }, { opacity: 1 }], 0.52, 0.88);
    } else if (scene.classList.contains("scene-work")) {
      const slips = Array.from(scene.querySelectorAll(".task-slip"));
      const pile = { x: art.offsetWidth * 0.5, y: art.offsetHeight * 0.44 };
      add(scene.querySelector(".unfinished-letter"), [
        { opacity: 0.72, transform: "translate3d(6%,3%,0) scale(.96)" },
        { opacity: 0.38, offset: 0.42 },
        { opacity: 0, transform: "translate3d(0,-12px,0) scale(.9)" }
      ], 0, 0.5, "ease-in-out");
      slips.forEach((notice, i) => add(notice, [
        { opacity: 0, transform: origin(notice, {
          x: pile.x + (i - 1.5) * 12,
          y: pile.y + (i - 1.5) * 10
        }, 0.9) },
        { opacity: 1, offset: 0.28 },
        { opacity: 1, transform: "translate3d(0,0,0) scale(1)" }
      ], 0.1 + i * 0.07, 0.66 + i * 0.06));
      scene.querySelectorAll(".task-checkbox").forEach((box, i) => add(box, [
        { backgroundColor: "transparent", borderColor: "#9eb7c8" },
        { backgroundColor: "#c9dce8", borderColor: "#7a9eb5" }
      ], 0.7 + i * 0.05, 0.88 + i * 0.04));
    } else if (scene.classList.contains("scene-trusted-help")) {
      const reveal = [
        { opacity: 0, transform: "translate3d(0,12px,0)" },
        { opacity: 1, transform: "translate3d(0,0,0)" }
      ];
      const pile = { x: art.offsetWidth * 0.5, y: art.offsetHeight * 0.5 };

      add(scene.querySelector(".help-question"), reveal, 0, 0.22);

      scene.querySelectorAll(".duty-need").forEach((need, i) => {
        add(need, [
          { opacity: 0, transform: origin(need, {
            x: pile.x,
            y: pile.y + (i - 1) * 14
          }, 0.88) },
          { opacity: 1, offset: 0.32 },
          { opacity: 1, transform: "translate3d(0,0,0) scale(1)" }
        ], 0.14 + i * 0.08, 0.58 + i * 0.08);
      });

      scene.querySelectorAll(".help-person").forEach((person, i) => {
        add(person, reveal, 0.4 + i * 0.08, 0.68 + i * 0.08);
      });

      scene.querySelectorAll(".help-connection path").forEach((path, i) => {
        add(path, [
          { strokeDashoffset: "1", opacity: 0 },
          { strokeDashoffset: "0", opacity: 1 }
        ], 0.62 + i * 0.07, 0.86 + i * 0.06, "ease-in-out");
      });
    }
    return motions;
  };

  // Native scrolling is the timeline. Paused compositor animations receive
  // progress only on scroll frames; there are no elapsed-time scene timers.
  const story = document.querySelector("[data-pain-story]");
  if (story && "animate" in Element.prototype) {
    const storyDesktop = window.matchMedia("(min-width: 981px) and (min-height: 650px)");
    const storyWide = window.matchMedia("(min-width: 981px)");
    const chapters = Array.from(story.querySelectorAll("[data-pain-step]"));
    const scenes = Array.from(story.querySelectorAll("[data-pain-scene]"));
    const bands = Array.from(story.querySelectorAll("[data-pain-band]"));
    const stage = story.querySelector(".pain-stage");
    const navigation = story.querySelector(".scene-navigation");
    const controls = Array.from(navigation.querySelectorAll("button"));
    const counter = story.querySelector(".scene-counter");
    let enhanced = false;
    let activeScene = -1;
    let scrollFrame = 0;
    let resizeFrame = 0;
    let records = [];
    let stageLanding = null;
    let measuredWidth = 0;
    let measuredHeight = 0;
    let renderedScroll = null;
    let lastScrollTime = 0;
    const layoutTop = (element) => {
      let top = 0;
      for (let node = element; node; node = node.offsetParent) top += node.offsetTop;
      return top;
    };
    const progress = (top, start, end) => clamp((start - top) / (start - end));
    const seek = (animations, value) => animations.forEach((animation) => {
      const time = value * 1000;
      if (animation.currentTime !== time) animation.currentTime = time;
    });
    const showScene = (index) => {
      if (activeScene === index) return;
      activeScene = index;
      scenes.forEach((scene, i) => {
        scene.hidden = i !== index;
        scene.dataset.active = String(i === index);
        scene.inert = i !== index;
        chapters[i].dataset.active = String(i === index);
        if (i === index) controls[i].setAttribute("aria-current", "step");
        else controls[i].removeAttribute("aria-current");
      });
      counter.textContent = `${String(index + 1).padStart(2, "0")} / 03`;
    };
    const readScroll = (time = performance.now()) => {
      scrollFrame = 0;
      if (!records.length || reducedMotion.matches) return;
      const target = window.scrollY;
      const elapsed = lastScrollTime ? Math.min(time - lastScrollTime, 48) : 16;
      lastScrollTime = time;
      if (renderedScroll === null) renderedScroll = target;
      // Let quick finger movements arrive gently. One eased scroll coordinate
      // preserves the order: surface lands, then its inner story advances.
      renderedScroll += (target - renderedScroll) * (1 - Math.exp(-elapsed / 185));
      const catchingUp = Math.abs(target - renderedScroll) > 0.6;
      if (!catchingUp) { renderedScroll = target; lastScrollTime = 0; }
      const y = renderedScroll;
      if (enhanced) {
        let index = 0;
        records.forEach((record, i) => {
          if (record.top - y <= record.start + 50) index = i;
        });
        showScene(index);
        seek([stageLanding.animation], progress(stageLanding.top - y, stageLanding.start, stageLanding.end));
      }
      records.forEach((record) => {
        const top = record.top - y;
        if (record.landing) seek([record.landing], progress(top, record.landStart, record.landEnd));
        // Offscreen scenes are positioned once at their endpoint, not animated
        // in the background. Reverse scrolling uses the same measured progress.
        const value = progress(top, record.start, record.end);
        if (value !== record.last) {
          seek(record.motions, value);
          record.last = value;
        }
        if (record.pinLines) {
          const pinValue = pinProgressAt(
            record.pinTop - y, record.enterStart, record.settleStart, record.settleEnd, record.exitEnd
          );
          {
            applyPinLines(record.pinLines, pinValue, window.innerHeight);
            if (record.bandAssist) {
              const incoming = pinValue < 0.24;
              const outgoing = pinValue > 0.72;
              const turn = incoming ? 1 - pinValue / 0.24 : outgoing ? (pinValue - 0.72) / 0.28 : 0;
              record.band.style.transform = turn ? `translateY(${incoming ? 10 * turn : -8 * turn}px)` : "";
            }
            record.pinLast = pinValue;
          }
        }
      });
      if (catchingUp) scrollFrame = requestAnimationFrame(readScroll);
    };
    const scheduleScroll = () => {
      if (!scrollFrame && records.length) scrollFrame = requestAnimationFrame(readScroll);
    };
    const rebuildStory = () => {
      resizeFrame = 0;
      cancelAnimationFrame(scrollFrame);
      scrollFrame = 0;
      renderedScroll = null;
      lastScrollTime = 0;
      records.forEach((record) => {
        record.motions.forEach((animation) => animation.cancel());
        record.landing?.cancel();
        record.pinLines?.forEach(clearPinLine);
        if (record.band) record.band.style.transform = "";
      });
      stageLanding?.animation.cancel();
      stageLanding = null;
      records = [];
      enhanced = storyDesktop.matches && !reducedMotion.matches;
      const pinMobile = !storyWide.matches && !reducedMotion.matches;
      story.classList.toggle("is-scroll-story", enhanced);
      story.toggleAttribute("data-pain-pin", !reducedMotion.matches);
      navigation.hidden = !enhanced;
      activeScene = -1;
      scenes.forEach((scene, i) => {
        scene.inert = false;
        scene.hidden = false;
        scene.dataset.active = "false";
        if (pinMobile && bands[i]) bands[i].appendChild(scene);
        else stage.insertBefore(scene, navigation);
      });
      prepareRollingCopy(story, false);
      if (reducedMotion.matches) {
        story.querySelectorAll(".roll-line").forEach(clearPinLine);
        bands.forEach((band) => { band.style.transform = ""; });
        return;
      }
      prepareRollingCopy(story, true);
      const viewport = window.innerHeight;
      measuredWidth = window.innerWidth;
      measuredHeight = viewport;
      const topInset = (header?.offsetHeight || 76) + 20;
      // Measure the resting layout before applying any animated transform.
      const geometry = scenes.map((scene, i) => ({
        top: layoutTop(enhanced ? (chapters[i].querySelector(".chapter-label") || chapters[i].querySelector("h3")) : scene),
        height: scene.offsetHeight
      }));
      if (enhanced) {
        const stageHeight = stage.offsetHeight;
        const stageTop = layoutTop(story) + 58;
        const start = viewport * 0.86 - stageHeight / 2;
        const end = viewport * 0.64 - stageHeight / 2;
        stageLanding = { top: stageTop, start, end, animation: scrollMotion(stage, [
          { opacity: 0, transform: "translateY(42px) scale(1.09)" },
          { opacity: 1, offset: 0.38 },
          { opacity: 1, transform: "translateY(0) scale(1)" }
        ], 0, 1, "cubic-bezier(.25,.1,.25,1)") };
      }
      records = scenes.map((scene, i) => {
        const { top, height } = geometry[i];
        // On a phone the illustration's center reaches 55% of the viewport
        // before the story begins; it is complete when its top meets the header.
        const start = enhanced ? viewport * 0.58 : Math.max(topInset + 72, viewport * 0.55 - height / 2);
        const end = enhanced ? topInset + 60 : topInset;
        const chapter = chapters[i];
        const band = bands[i];
        const pinLines = Array.from(chapter.querySelectorAll(".roll-line"));
        const pinHost = pinMobile && band ? band : chapter;
        const pinTop = layoutTop(pinHost);
        const pinHeight = pinHost.offsetHeight;
        const enterStart = viewport * 0.98;
        const settleStart = enhanced ? viewport * 0.5 : viewport * 0.58;
        const settleEnd = enhanced ? -viewport * 0.08 : -Math.min(pinHeight * 0.14, viewport * 0.16);
        const exitEnd = enhanced ? -viewport * 0.4 : -Math.min(pinHeight * 0.48, viewport * 0.45);
        return {
          top, start, end, last: -1,
          landStart: start + viewport * 0.26,
          landEnd: start + viewport * 0.075,
          landing: enhanced || pinMobile ? null : scrollMotion(scene, [
            { opacity: 0, transform: "translateY(42px) scale(1.09)" },
            { opacity: 1, offset: 0.38 },
            { opacity: 1, transform: "translateY(0) scale(1)" }
          ], 0, 1, "cubic-bezier(.25,.1,.25,1)"),
          motions: makeNarrative(scene),
          pinLines, pinTop, enterStart, settleStart, settleEnd, exitEnd, pinLast: -1,
          band, bandAssist: pinMobile && band
        };
      });
      readScroll();
    };
    const scheduleRebuild = () => {
      if (!resizeFrame) resizeFrame = requestAnimationFrame(rebuildStory);
    };
    controls.forEach((control, index) => {
      control.addEventListener("click", () => {
        const record = records[index];
        if (record) window.scrollTo({ top: record.top - record.end, behavior: "smooth" });
      });
    });
    reducedMotion.addEventListener("change", rebuildStory);
    storyWide.addEventListener("change", rebuildStory);
    storyDesktop.addEventListener("change", rebuildStory);
    window.addEventListener("scroll", scheduleScroll, { passive: true });
    window.addEventListener("resize", () => {
      // Mobile browser chrome can resize the viewport during a swipe. Preserve
      // its measured timeline until a real size/orientation change occurs.
      const browserChromeOnly = !enhanced && window.innerWidth === measuredWidth &&
        Math.abs(window.innerHeight - measuredHeight) < 140;
      if (!browserChromeOnly) scheduleRebuild();
    }, { passive: true });
    window.addEventListener("load", scheduleRebuild, { once: true });
    document.fonts?.ready.then(scheduleRebuild);
    rebuildStory();
  }

  // Arm entrances before they reach the reading area so they cannot finish
  // unseen at the bottom. Semantic content remains visible without JavaScript.
  if ("IntersectionObserver" in window && "animate" in Element.prototype) {
    const entrances = new Map();
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        const animation = entrances.get(entry.target);
        const passed = entry.boundingClientRect.bottom < 0;
        if (!entry.isIntersecting && !passed) return;
        observer.unobserve(entry.target);
        entrances.delete(entry.target);
        if (animation) {
          if (reducedMotion.matches || passed) animation.cancel();
          else {
            animation.effect.updateTiming({ delay: window.matchMedia("(min-width: 741px)").matches
              ? Math.min(400, Math.max(0, Number(entry.target.dataset.landDelay) || 0)) : 0 });
            animation.play();
          }
          const settle = () => {
            entry.target.dataset.settled = "true";
            entry.target.dispatchEvent(new Event("surface-settled"));
          };
          if (reducedMotion.matches || passed) settle();
          else animation.finished.then(settle).catch(() => {});
        }
      });
    }, { rootMargin: "0px 0px -10% 0px", threshold: 0 });
    document.querySelectorAll("[data-reveal], [data-land]").forEach((element) => {
      if (reducedMotion.matches || element.matches(".pain-stage, [data-pain-scene]")) return;
      if (element.closest(".about-hero")) return;
      const aboutPage = document.body.classList.contains("page-about");
      const aboutEase = "cubic-bezier(0.22, 1, 0.36, 1)";
      const container = element.hasAttribute("data-land");
      const heroSurface = element.dataset.land === "hero";
      const animation = aboutPage
        ? animateOnce(element, [
            { opacity: 0, transform: "translateY(12px)" },
            { opacity: 1, transform: "none" }
          ], { duration: 480, easing: aboutEase, fill: "backwards" })
        : animateOnce(element, [
            { opacity: 0, transform: heroSurface ? "translateY(18px) scale(1.025)" : container ? "translateY(34px) scale(1.06)" : "translateY(26px)" },
            { opacity: 1, offset: container ? 0.38 : 0.75 },
            { opacity: 1, transform: "none" }
          ], { duration: heroSurface ? 800 : container ? 700 : 550,
            delay: window.matchMedia("(min-width: 741px)").matches ? Math.min(400, Math.max(0, Number(element.dataset.landDelay) || 0)) : 0,
            easing: landingEase, fill: "backwards" });
      animation.pause();
      animation.currentTime = 0;
      entrances.set(element, animation);
      observer.observe(element);
    });
    document.addEventListener("focusin", (event) => {
      // A keyboard user can reach a link before its containing reveal fires.
      entrances.forEach((animation, element) => {
        if (element.contains(event.target)) {
          animation.cancel();
          observer.unobserve(element);
          entrances.delete(element);
          element.dataset.settled = "true";
          element.dispatchEvent(new Event("surface-settled"));
        }
      });
    });
    reducedMotion.addEventListener("change", () => {
      if (reducedMotion.matches) {
        observer.disconnect();
        entrances.forEach((animation) => animation.cancel());
        entrances.clear();
      }
    });

    const opening = document.querySelector("[data-opening]");
    if (opening) {
      const openingObserver = new IntersectionObserver(([entry]) => {
        if (!entry.isIntersecting) return;
        openingObserver.disconnect();
        if (reducedMotion.matches) return;
        const phone = window.matchMedia("(max-width: 740px)").matches;
        // On phones, avoid scaling a layer as tall as the hero and quote rail.
        // The photo, masked lines and content still arrive in their own sequence.
        animateOnce(phone ? opening.querySelector(".hero") : opening, [
          { opacity: 0, transform: phone ? "translateY(14px) scale(1.025)" : "translateY(24px) scale(1.04)" },
          { opacity: 1, offset: 0.35 },
          { opacity: 1, transform: "none" }
        ], { duration: phone ? 1900 : 2200, easing: landingEase });
        animateOnce(opening.querySelector("[data-opening-image]"), [
          { transform: phone ? "scale(1.018)" : "scale(1.035)" }, { transform: "scale(1)" }
        ], { duration: phone ? 2000 : 2400, easing: landingEase });
        opening.querySelectorAll(".hero-line > span").forEach((line, i) => {
          animateOnce(line, [
            { transform: "translateY(108%)", opacity: 0 },
            { transform: "translateY(0)", opacity: 1 }
          ], { duration: phone ? 1250 : 1450, delay: 160 + i * (phone ? 95 : 110), easing: landingEase, fill: "backwards" });
        });
        opening.querySelectorAll("[data-hero-item]").forEach((item, i) => {
          animateOnce(item, [
            { transform: "translateY(18px)", opacity: 0 },
            { transform: "translateY(0)", opacity: 1 }
          ], { duration: 1300, delay: i === 0 ? 100 : 480 + i * 130, easing: landingEase, fill: "backwards" });
        });
      }, { threshold: 0.01 });
      openingObserver.observe(opening);
    }
  }
  reducedMotion.addEventListener("change", () => {
    if (reducedMotion.matches) activeAnimations.forEach((animation) => animation.cancel());
  });

  // The surface lands first. Continued scrolling then moves the image within
  // its clipped frame; a single eased coordinate catches up and stops at rest.
  if ("animate" in Element.prototype) {
    const driftRecords = Array.from(document.querySelectorAll("[data-media-drift]")).map((frame) => ({
      frame, image: frame.querySelector("[data-drift-image]"), surface: frame.closest("[data-land]"),
      animation: null, ready: false, start: 0, current: 0
    }));
    let driftFrame = 0;
    let driftTime = 0;
    const stopDrift = () => { cancelAnimationFrame(driftFrame); driftFrame = 0; driftTime = 0; };
    const tickDrift = (time) => {
      driftFrame = 0;
      if (reducedMotion.matches || document.hidden) { driftTime = 0; return; }
      const dt = driftTime ? Math.min(time - driftTime, 64) : 16;
      driftTime = time;
      let moving = false;
      driftRecords.forEach((record) => {
        if (!record.ready || !record.animation) return;
        const target = clamp((window.scrollY - record.start) / Math.max(300, record.frame.offsetHeight));
        record.current += (target - record.current) * (1 - Math.exp(-dt / 200));
        if (Math.abs(target - record.current) < 0.001) record.current = target;
        else moving = true;
        record.animation.currentTime = record.current * 1000;
      });
      if (moving) driftFrame = requestAnimationFrame(tickDrift);
      else driftTime = 0;
    };
    const scheduleDrift = () => {
      if (!driftFrame && !reducedMotion.matches && !document.hidden) driftFrame = requestAnimationFrame(tickDrift);
    };
    const prepareDrift = () => {
      stopDrift();
      driftRecords.forEach((record) => {
        record.animation?.cancel();
        record.animation = null;
        record.current = 0;
        record.start = window.scrollY;
        if (reducedMotion.matches) {
          if (record.surface) record.surface.dataset.settled = "true";
          return;
        }
        if (!record.image) return;
        record.animation = record.image.animate([
          { transform: "translateY(0)" }, { transform: "translateY(-24px)" }
        ], { duration: 1000, easing: "linear", fill: "both" });
        record.animation.pause();
        record.animation.currentTime = 0;
        record.ready = !record.surface || record.surface.dataset.settled === "true";
      });
    };
    driftRecords.forEach((record) => record.surface?.addEventListener("surface-settled", () => {
      record.ready = true;
      record.start = window.scrollY;
      scheduleDrift();
    }));
    window.addEventListener("scroll", scheduleDrift, { passive: true });
    document.addEventListener("visibilitychange", () => { if (document.hidden) stopDrift(); else scheduleDrift(); });
    reducedMotion.addEventListener("change", prepareDrift);
    prepareDrift();
  }

  // Native details remain usable without JavaScript. Enhanced rows animate
  // their actual height in both directions and can reverse midway through.
  const faqRows = Array.from(document.querySelectorAll(".question-row, .class-materials"));
  const faqStates = new Map();
  const settleQuestion = (row, state) => {
    state.height?.cancel(); state.fade?.cancel();
    state.height = null; state.fade = null;
    row.open = state.expanded;
    row.dataset.expanded = String(state.expanded);
    row.querySelector("summary").setAttribute("aria-expanded", String(state.expanded));
    row.querySelector(".question-answer").inert = !state.expanded;
  };
  const expandQuestion = (row, expanded) => {
    const state = faqStates.get(row);
    const answer = row.querySelector(".question-answer");
    const summary = row.querySelector("summary");
    const fromHeight = row.getBoundingClientRect().height;
    const fromOpacity = row.open ? Number(getComputedStyle(answer).opacity) : 0;
    state.height?.cancel(); state.fade?.cancel();
    state.expanded = expanded;
    row.dataset.expanded = String(expanded);
    summary.setAttribute("aria-expanded", String(expanded));
    answer.inert = !expanded;
    if (reducedMotion.matches || !("animate" in Element.prototype)) { settleQuestion(row, state); return; }
    row.open = true;
    const toHeight = summary.offsetHeight + (expanded ? answer.offsetHeight : 0);
    state.height = row.animate([{ height: `${fromHeight}px` }, { height: `${toHeight}px` }], {
      duration: 850, easing: "cubic-bezier(.4,0,.2,1)", fill: "both"
    });
    state.fade = answer.animate([{ opacity: fromOpacity }, { opacity: expanded ? 1 : 0 }], {
      duration: expanded ? 750 : 450, easing: "ease-in-out", fill: "both"
    });
    const current = state.height;
    current.finished.then(() => { if (state.height === current) settleQuestion(row, state); }).catch(() => {});
  };
  faqRows.forEach((row) => {
    const state = { expanded: row.open, height: null, fade: null };
    faqStates.set(row, state);
    settleQuestion(row, state);
    row.querySelector("summary").addEventListener("click", (event) => {
      event.preventDefault();
      const next = !state.expanded;
      if (next) faqRows.forEach((other) => { if (other !== row && faqStates.get(other).expanded) expandQuestion(other, false); });
      expandQuestion(row, next);
    });
  });
  reducedMotion.addEventListener("change", () => {
    if (reducedMotion.matches) faqRows.forEach((row) => settleQuestion(row, faqStates.get(row)));
  });

  // One continuous, natively scrollable quote loop. Only visual copies repeat;
  // assistive technology receives the seven original interview excerpts once.
  const quoteViewport = document.querySelector(".quote-viewport");
  if (quoteViewport) {
    const toggle = document.querySelector(".quote-toggle");
    const quoteWindow = quoteViewport.parentElement;
    const originals = Array.from(quoteViewport.querySelectorAll(".quote-card"));
    const baseSpeed = 24;
    const edgeSpeed = 72;
    let cycle = 0;
    let position = 0;
    let lastWritten = 0;
    let paused = false;
    let focused = false;
    let touching = false;
    let visible = false;
    let edge = 0;
    let pendingEdge = 0;
    let edgeTimer = 0;
    let resumeTimer = 0;
    let resumeAt = 0;
    let frame = 0;
    let lastTime = 0;
    let velocity = baseSpeed;
    let measuredWidth = 0;
    const updateToggle = () => {
      toggle.hidden = reducedMotion.matches;
      toggle.setAttribute("aria-pressed", String(paused));
      toggle.setAttribute("aria-label", paused ? "Resume quote movement" : "Pause quote movement");
      const icon = document.createElement("span");
      icon.setAttribute("aria-hidden", "true");
      icon.textContent = paused ? "▷" : "Ⅱ";
      toggle.replaceChildren(icon);
    };
    const targetSpeed = () => paused || focused || touching || performance.now() < resumeAt ? 0 : edge ? edge * edgeSpeed : baseSpeed;
    const stop = () => { cancelAnimationFrame(frame); frame = 0; lastTime = 0; };
    const writePosition = () => {
      quoteViewport.scrollLeft = position;
      lastWritten = quoteViewport.scrollLeft;
    };
    const wrap = () => {
      if (!cycle) return;
      position = cycle + ((position - cycle) % cycle + cycle) % cycle;
    };
    const tick = (time) => {
      frame = 0;
      if (!visible || document.hidden || reducedMotion.matches || !cycle) { lastTime = 0; return; }
      const elapsed = lastTime ? Math.min(time - lastTime, 48) : 0;
      lastTime = time;
      const target = targetSpeed();
      velocity += (target - velocity) * Math.min(1, elapsed / 180);
      if (Math.abs(velocity) < 0.1 && target === 0) { velocity = 0; lastTime = 0; return; }
      // A floating accumulator preserves subpixel speed even when scrollLeft is
      // rounded to physical pixels. Wrapping uses exactly one copied cycle.
      position += velocity * elapsed / 1000;
      wrap();
      writePosition();
      frame = requestAnimationFrame(tick);
    };
    const start = () => {
      if (!frame && visible && !document.hidden && !reducedMotion.matches && cycle) frame = requestAnimationFrame(tick);
    };
    const deferResume = (delay = 1100) => {
      resumeAt = performance.now() + delay;
      clearTimeout(resumeTimer);
      resumeTimer = window.setTimeout(() => { position = quoteViewport.scrollLeft; wrap(); writePosition(); start(); }, delay + 20);
    };
    const setupLoop = () => {
      stop();
      const phase = cycle ? ((quoteViewport.scrollLeft % cycle) + cycle) % cycle / cycle : 0;
      quoteViewport.querySelectorAll("[data-quote-copy]").forEach((copy) => copy.remove());
      cycle = 0;
      quoteViewport.classList.toggle("is-looping", !reducedMotion.matches);
      updateToggle();
      measuredWidth = quoteViewport.clientWidth;
      if (reducedMotion.matches) { position = 0; writePosition(); return; }
      const copyOf = (card) => {
        const copy = card.cloneNode(true);
        copy.dataset.quoteCopy = "true";
        copy.setAttribute("aria-hidden", "true");
        copy.inert = true;
        return copy;
      };
      const before = originals.map(copyOf);
      quoteViewport.prepend(...before);
      quoteViewport.append(...originals.map(copyOf));
      cycle = originals[0].offsetLeft - before[0].offsetLeft;
      position = cycle * (1 + phase);
      writePosition();
      start();
    };
    toggle.addEventListener("click", () => { paused = !paused; updateToggle(); start(); });
    quoteViewport.addEventListener("pointermove", (event) => {
      if (event.pointerType !== "mouse" || !finePointer.matches) return;
      const rect = quoteViewport.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const zone = Math.min(100, rect.width * 0.18);
      const next = x < zone ? -1 : x > rect.width - zone ? 1 : 0;
      if (next === pendingEdge) return;
      pendingEdge = next;
      clearTimeout(edgeTimer);
      if (!next) { edge = 0; quoteWindow.removeAttribute("data-edge"); start(); return; }
      edgeTimer = window.setTimeout(() => {
        edge = next;
        quoteWindow.dataset.edge = next < 0 ? "left" : "right";
        start();
      }, 450);
    });
    quoteViewport.addEventListener("pointerleave", () => {
      clearTimeout(edgeTimer); pendingEdge = 0; edge = 0;
      quoteWindow.removeAttribute("data-edge"); start();
    });
    quoteViewport.addEventListener("pointerdown", (event) => {
      if (event.pointerType === "touch" || event.pointerType === "pen") {
        touching = true; focused = false; velocity = 0; stop();
      }
    });
    const releaseTouch = () => {
      if (touching) { touching = false; deferResume(); }
    };
    window.addEventListener("pointerup", releaseTouch, { passive: true });
    window.addEventListener("pointercancel", releaseTouch, { passive: true });
    quoteViewport.addEventListener("wheel", () => { velocity = 0; stop(); deferResume(); }, { passive: true });
    quoteViewport.addEventListener("scroll", () => {
      if (Math.abs(quoteViewport.scrollLeft - lastWritten) <= 1) return;
      position = quoteViewport.scrollLeft;
      lastWritten = position;
      // Native swiping and momentum take precedence over the automatic loop.
      if (!paused && !focused) { velocity = 0; stop(); deferResume(); }
    }, { passive: true });
    quoteViewport.addEventListener("focusin", () => {
      focused = quoteViewport.matches(":focus-visible");
      if (focused) { velocity = 0; stop(); }
    });
    quoteViewport.addEventListener("focusout", () => { focused = false; start(); });
    quoteViewport.addEventListener("keydown", (event) => {
      if (!["ArrowLeft", "ArrowRight", "Home", "End"].includes(event.key)) return;
      event.preventDefault();
      paused = true; velocity = 0; stop(); updateToggle();
      const step = originals.length > 1 ? originals[1].offsetLeft - originals[0].offsetLeft : quoteViewport.clientWidth;
      const first = reducedMotion.matches ? 0 : cycle;
      position = event.key === "Home" ? first : event.key === "End" ? first + step * (originals.length - 1) : quoteViewport.scrollLeft + (event.key === "ArrowRight" ? 1 : -1) * step;
      if (!reducedMotion.matches) wrap();
      writePosition();
    });
    if ("IntersectionObserver" in window) {
      new IntersectionObserver(([entry]) => {
        visible = entry.isIntersecting;
        if (visible) start(); else stop();
      }, { threshold: 0.05 }).observe(quoteViewport);
    } else visible = true;
    if ("ResizeObserver" in window) {
      new ResizeObserver(() => {
        if (quoteViewport.clientWidth !== measuredWidth) setupLoop();
      }).observe(quoteViewport);
    } else window.addEventListener("resize", setupLoop, { passive: true });
    document.addEventListener("visibilitychange", () => { if (document.hidden) stop(); else start(); });
    reducedMotion.addEventListener("change", setupLoop);
    document.fonts?.ready.then(setupLoop);
    setupLoop();
  }

  const videoDialog = document.querySelector(".video-dialog");
  const videoFrame = videoDialog?.querySelector("[data-video-frame]");
  const videoFallback = videoDialog?.querySelector(".video-fallback");
  document.querySelectorAll("[data-story-video]").forEach((link) => {
    link.addEventListener("click", (event) => {
      const result = MissionaryMediaStoryVideo.openStoryVideo({
        event,
        dialog: videoDialog,
        frame: videoFrame,
        fallback: videoFallback,
        watchUrl: link.href,
        assignLocation: (url) => window.location.assign(url)
      });
      if (result === "dialog") syncDialogScroll();
    });
  });
  videoDialog?.querySelector("[data-video-close]")?.addEventListener("click", () => videoDialog.close());
  videoDialog?.addEventListener("click", (event) => {
    if (event.target !== videoDialog) return;
    const box = videoDialog.getBoundingClientRect();
    if (event.clientX < box.left || event.clientX > box.right || event.clientY < box.top || event.clientY > box.bottom) videoDialog.close();
  });
  videoDialog?.addEventListener("close", () => {
    MissionaryMediaStoryVideo.closeStoryVideo({ frame: videoFrame, fallback: videoFallback });
    syncDialogScroll();
  });

  const contactDialog = document.querySelector("#contact-dialog");
  let contactOpener = null;
  const openContactDialog = (event) => {
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    if (!contactDialog || typeof contactDialog.showModal !== "function") return;
    contactOpener = event.currentTarget;
    try {
      contactDialog.showModal();
      event.preventDefault();
    } catch {
      return;
    }
    syncDialogScroll();
    const firstField = contactDialog.querySelector("input:not([type='hidden']), textarea, select, button[type='submit']");
    firstField?.focus();
  };
  document.querySelectorAll("[data-contact-dialog]").forEach((control) => {
    control.addEventListener("click", openContactDialog);
  });
  contactDialog?.querySelector("[data-contact-close]")?.addEventListener("click", () => contactDialog.close());
  contactDialog?.addEventListener("click", (event) => {
    if (event.target !== contactDialog) return;
    const box = contactDialog.getBoundingClientRect();
    if (event.clientX < box.left || event.clientX > box.right || event.clientY < box.top || event.clientY > box.bottom) contactDialog.close();
  });
  contactDialog?.addEventListener("close", () => {
    syncDialogScroll();
    contactOpener?.focus({ preventScroll: true });
  });

  document.querySelectorAll(".intake-form").forEach((intake) => {
    intake.addEventListener("submit", (event) => {
      event.preventDefault();
      if (!intake.reportValidity()) return;
      const data = new FormData(intake);
      const question = String(data.get("a1") || "").trim();
      const notes = [
        `Call for: ${data.get("role")}`,
        `Help with: ${data.getAll("focus").join(", ") || "Not sure yet"}`,
        question ? `Question: ${question}` : ""
      ].filter(Boolean).join("\n");
      const destination = new URL(intake.action);
      destination.search = "";
      destination.searchParams.set("name", String(data.get("name") || "").trim());
      destination.searchParams.set("email", String(data.get("email") || "").trim());
      destination.searchParams.set("a1", notes);
      window.location.assign(destination.href);
    });
  });

  // Native course browsing works with touch, trackpad, keyboard, or buttons.
  const courseRail = document.querySelector("[data-academy-rail]");
  if (courseRail) {
    const previous = document.querySelector("[data-course-prev]");
    const next = document.querySelector("[data-course-next]");
    previous.hidden = next.hidden = false;
    const update = () => {
      previous.disabled = courseRail.scrollLeft <= 2;
      next.disabled = courseRail.scrollLeft + courseRail.clientWidth >= courseRail.scrollWidth - 2;
    };
    const move = (direction) => courseRail.scrollBy({
      left: direction * (courseRail.firstElementChild.offsetWidth + 24),
      behavior: reducedMotion.matches ? "instant" : "smooth"
    });
    previous.addEventListener("click", () => move(-1));
    next.addEventListener("click", () => move(1));
    courseRail.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update, { passive: true });
    update();
  }

  // The background rises with scroll; foreground containers keep their own
  // later fade-then-settle entrance instead of sharing the backdrop transform.
  const risingSection = document.querySelector("[data-rise-section]");
  if (risingSection && "animate" in Element.prototype) {
    const backdrop = risingSection.querySelector("[data-rise-background]");
    let riseAnimation, riseFrame = 0, lastRiseTime = 0, displayedRise = 0;
    const targetRise = () => {
      const top = risingSection.getBoundingClientRect().top;
      return Math.min(1, Math.max(0, (innerHeight * .92 - top) / (innerHeight * .52)));
    };
    const tickRise = (now) => {
      riseFrame = 0;
      if (!riseAnimation || reducedMotion.matches || document.hidden) return;
      const target = targetRise();
      const elapsed = Math.min(64, lastRiseTime ? now - lastRiseTime : 16);
      lastRiseTime = now;
      displayedRise += (target - displayedRise) * (1 - Math.exp(-elapsed / 210));
      if (Math.abs(target - displayedRise) < .0002) displayedRise = target;
      riseAnimation.currentTime = displayedRise * 1000;
      if (displayedRise !== target) riseFrame = requestAnimationFrame(tickRise);
      else lastRiseTime = 0;
    };
    const scheduleRise = () => {
      if (!riseFrame && riseAnimation && !reducedMotion.matches && !document.hidden) riseFrame = requestAnimationFrame(tickRise);
    };
    const configureRise = () => {
      cancelAnimationFrame(riseFrame);
      riseFrame = 0;
      riseAnimation?.cancel();
      riseAnimation = null;
      if (reducedMotion.matches) return;
      displayedRise = targetRise();
      riseAnimation = backdrop.animate([
        { transform: "translateY(170px)" }, { transform: "translateY(0px)" }
      ], { duration: 1000, fill: "both", easing: "linear" });
      riseAnimation.pause();
      riseAnimation.currentTime = displayedRise * 1000;
      lastRiseTime = 0;
      scheduleRise();
    };
    window.addEventListener("scroll", scheduleRise, { passive: true });
    window.addEventListener("resize", scheduleRise, { passive: true });
    document.addEventListener("visibilitychange", scheduleRise);
    reducedMotion.addEventListener("change", configureRise);
    document.fonts?.ready.then(scheduleRise);
    configureRise();
  }

  const courseMap = document.querySelector("[data-course-map]");
  if (courseMap) {
    const tabs = Array.from(courseMap.querySelectorAll(".course-tab"));
    const panels = Array.from(document.querySelectorAll(".module-panel"));
    const panelContainer = document.querySelector(".course-panels");
    const tablist = courseMap.querySelector("[role=tablist]");
    const compactCourse = window.matchMedia("(max-width: 740px)");
    let selectedIndex = -1;
    let moduleAnimations = [];
    const cancelModuleMotion = () => {
      moduleAnimations.forEach((animation) => animation.cancel());
      moduleAnimations = [];
    };
    const syncCourseLayout = () => {
      cancelModuleMotion();
      tablist.setAttribute("aria-orientation", compactCourse.matches ? "horizontal" : "vertical");
    };
    const selectModule = (index, focus = false) => {
      if (index === selectedIndex) { if (focus) tabs[index].focus(); return; }
      const animateChange = selectedIndex >= 0 && !reducedMotion.matches && "animate" in Element.prototype;
      const fromHeight = panelContainer.offsetHeight;
      cancelModuleMotion();
      tabs.forEach((tab, i) => {
        tab.setAttribute("aria-selected", String(i === index));
        tab.tabIndex = i === index ? 0 : -1;
        panels[i].hidden = i !== index;
      });
      selectedIndex = index;
      if (compactCourse.matches) {
        const tab = tabs[index];
        const left = tab.offsetLeft - tablist.offsetLeft;
        if (left < tablist.scrollLeft || left + tab.offsetWidth > tablist.scrollLeft + tablist.clientWidth) {
          tablist.scrollTo({left:Math.max(0,left - (tablist.clientWidth - tab.offsetWidth) / 2),behavior:reducedMotion.matches ? "instant" : "smooth"});
        }
      }
      if (animateChange) {
        const toHeight = panels[index].offsetHeight;
        if (Math.abs(fromHeight - toHeight) > 1) {
          moduleAnimations.push(animateOnce(panelContainer, [
            { height: `${fromHeight}px` }, { height: `${toHeight}px` }
          ], { duration: 850, easing: "cubic-bezier(.4,0,.2,1)" }));
        }
        moduleAnimations.push(animateOnce(panels[index], [
          { opacity: 0, transform: "translateY(12px)" },
          { opacity: 1, offset: 0.45 },
          { opacity: 1, transform: "none" }
        ], { duration: 1000, easing: landingEase }));
      }
      if (focus) tabs[index].focus();
    };
    tabs.forEach((tab, index) => {
      tab.addEventListener("click", () => selectModule(index));
      tab.addEventListener("keydown", (event) => {
        const keys = ["ArrowDown", "ArrowRight", "ArrowUp", "ArrowLeft", "Home", "End"];
        if (!keys.includes(event.key)) return;
        event.preventDefault();
        const next = event.key === "Home" ? 0 : event.key === "End" ? tabs.length - 1 : (index + (["ArrowDown", "ArrowRight"].includes(event.key) ? 1 : -1) + tabs.length) % tabs.length;
        selectModule(next, true);
      });
    });
    compactCourse.addEventListener("change", syncCourseLayout);
    window.addEventListener("resize", cancelModuleMotion, { passive: true });
    reducedMotion.addEventListener("change", () => { if (reducedMotion.matches) cancelModuleMotion(); });
    syncCourseLayout();
    selectModule(0);
  }

  const filters = document.querySelector(".resource-filters");
  if (filters) {
    const input = filters.querySelector("input[type='search']");
    const select = filters.querySelector("select");
    const reset = filters.querySelector(".resource-reset");
    const items = Array.from(document.querySelectorAll(".resource-item"));
    const groups = Array.from(document.querySelectorAll("[data-resource-group]"));
    const status = document.querySelector(".directory-status");
    const empty = document.querySelector(".empty-resources");
    const filterResources = () => {
      const category = select.value;
      const terms = input.value.trim().toLowerCase().split(/\s+/).filter(Boolean);
      let count = 0;
      items.forEach((item) => {
        const searchable = `${item.textContent} ${item.dataset.keywords}`.toLowerCase();
        const match = (category === "all" || item.dataset.category === category) && terms.every((term) => searchable.includes(term));
        item.hidden = !match;
        if (match) count += 1;
      });
      groups.forEach((group) => { group.hidden = !group.querySelector(".resource-item:not([hidden])"); });
      empty.hidden = count !== 0;
      reset.hidden = category === "all" && !input.value;
      status.textContent = `Showing ${count} of ${items.length} resources. Links open the provider’s site.`;
    };
    select.addEventListener("change", filterResources);
    reset.addEventListener("click", () => {
      select.value = "all";
      input.value = "";
      select.focus({ preventScroll: true });
      filterResources();
    });
    input.addEventListener("input", filterResources);
    filters.hidden = false;
    filterResources();
  }
})();
