import test from "node:test";
import assert from "node:assert/strict";
import { createRequire } from "node:module";
import { readFileSync, readdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const require = createRequire(import.meta.url);
const storyVideo = require("../public/assets/site.js");

const WATCH = "https://www.youtube.com/watch?v=dnfMBprp0xg";
const EMBED = "https://www.youtube-nocookie.com/embed/dnfMBprp0xg?autoplay=1&rel=0";

function fakeEvent(overrides = {}) {
  return {
    metaKey: false,
    ctrlKey: false,
    shiftKey: false,
    altKey: false,
    prevented: false,
    preventDefault() {
      this.prevented = true;
    },
    ...overrides
  };
}

function fakeFrame(src = EMBED) {
  return {
    hidden: true,
    src: "",
    dataset: { src },
    removeAttribute(name) {
      if (name === "src") this.src = "";
    }
  };
}

function htmlPages() {
  const pages = [join(root, "public/index.html")];
  const walk = (dir) => {
    for (const entry of readdirSync(dir, { withFileTypes: true })) {
      const full = join(dir, entry.name);
      if (entry.isDirectory()) walk(full);
      else if (entry.name === "index.html") pages.push(full);
    }
  };
  walk(join(root, "public/academy"));
  walk(join(root, "public/about"));
  walk(join(root, "public/resources"));
  return pages;
}

test("adds playsinline to the YouTube embed URL", () => {
  const url = new URL(storyVideo.embedSrcWithPlaysinline(EMBED));
  assert.equal(url.searchParams.get("playsinline"), "1");
  assert.equal(url.searchParams.get("autoplay"), "1");
  assert.equal(url.searchParams.get("rel"), "0");
});

test("open unhides the iframe immediately and does not wait for load", () => {
  const event = fakeEvent();
  const dialog = { showModal() { this.opened = true; } };
  const frame = fakeFrame();
  const fallback = { hidden: false };
  const result = storyVideo.openStoryVideo({
    event,
    dialog,
    frame,
    fallback,
    watchUrl: WATCH,
    assignLocation: () => {
      throw new Error("should open the dialog, not navigate");
    }
  });
  assert.equal(result, "dialog");
  assert.equal(event.prevented, true);
  assert.equal(dialog.opened, true);
  assert.equal(frame.hidden, false);
  assert.equal(fallback.hidden, true);
  assert.match(frame.src, /playsinline=1/);
});

test("navigates to the watch URL when showModal is missing", () => {
  const assigned = [];
  const event = fakeEvent();
  const frame = fakeFrame();
  const result = storyVideo.openStoryVideo({
    event,
    dialog: {},
    frame,
    fallback: { hidden: false },
    watchUrl: WATCH,
    assignLocation: (url) => assigned.push(url)
  });
  assert.equal(result, "navigate");
  assert.equal(event.prevented, true);
  assert.deepEqual(assigned, [WATCH]);
  assert.equal(frame.hidden, true);
});

test("navigates to the watch URL when showModal throws", () => {
  const assigned = [];
  const event = fakeEvent();
  storyVideo.openStoryVideo({
    event,
    dialog: { showModal() { throw new Error("not allowed"); } },
    frame: fakeFrame(),
    fallback: { hidden: false },
    watchUrl: WATCH,
    assignLocation: (url) => assigned.push(url)
  });
  assert.equal(event.prevented, true);
  assert.deepEqual(assigned, [WATCH]);
});

test("modified clicks are left to the browser", () => {
  const event = fakeEvent({ metaKey: true });
  const dialog = { showModal() { this.opened = true; } };
  const result = storyVideo.openStoryVideo({
    event,
    dialog,
    frame: fakeFrame(),
    fallback: { hidden: false },
    watchUrl: WATCH,
    assignLocation: () => {
      throw new Error("should not navigate");
    }
  });
  assert.equal(result, "ignore");
  assert.equal(event.prevented, false);
  assert.equal(dialog.opened, undefined);
});

test("close clears src, hides the iframe, and shows the fallback", () => {
  const frame = fakeFrame();
  frame.hidden = false;
  frame.src = `${EMBED}&playsinline=1`;
  const fallback = { hidden: true };
  storyVideo.closeStoryVideo({ frame, fallback });
  assert.equal(frame.hidden, true);
  assert.equal(fallback.hidden, false);
  assert.equal(frame.src, "");
});

test("site.js does not wait on iframe load to reveal the player", () => {
  const source = readFileSync(join(root, "public/assets/site.js"), "utf8");
  assert.equal(source.includes('videoFrame?.addEventListener("load"'), false);
});

test("story overlays do not capture pointer events", () => {
  const css = readFileSync(join(root, "public/assets/site.css"), "utf8");
  assert.match(css, /\.story-play\{[^}]*pointer-events:\s*none/);
  assert.match(css, /\.story-watch\{[^}]*pointer-events:\s*none/);
});

test("pages pin a fresh site.js cache query and playsinline on embeds", () => {
  const pages = htmlPages();
  assert.ok(pages.length >= 5);
  for (const page of pages) {
    const html = readFileSync(page, "utf8");
    if (!html.includes("/assets/site.js")) continue;
    assert.match(html, /\/assets\/site\.js\?v=sitepass2/);
    if (html.includes("data-video-frame")) {
      assert.match(html, /playsinline=1/);
    }
  }
});
