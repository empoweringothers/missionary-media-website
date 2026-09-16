import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync, readdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");

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
  return pages;
}

const shipped = htmlPages().map((page) => ({ page, html: readFileSync(page, "utf8") }));
const home = readFileSync(join(root, "public/index.html"), "utf8");
const academy = readFileSync(join(root, "public/academy/index.html"), "utf8");
const resourcesHub = readFileSync(join(root, "public/academy/resources/index.html"), "utf8");
const resourcesHandoff = readFileSync(join(root, "public/resources/index.html"), "utf8");
const css = readFileSync(join(root, "public/assets/site.css"), "utf8");

test("G1: Coaching is gone from nav, drawer, and noscript on shipped pages", () => {
  for (const { page, html } of shipped) {
    assert.equal(html.includes("href=\"/#how-i-help\">Coaching"), false, page);
    assert.equal(/<a[^>]*>Coaching/.test(html), false, page);
  }
});

test("G2: Tabornorm is https://tabornorm.com/ with external rel, never tabornorm.org or /#about", () => {
  for (const { page, html } of shipped) {
    assert.match(html, /href="https:\/\/tabornorm\.com\/" target="_blank" rel="noopener noreferrer">Tabornorm/);
    assert.equal(html.includes("tabornorm.org"), false, page);
    assert.equal(html.includes("href=\"/#about\""), false, page);
  }
});

test("G3: Resources is a single nav link with no dropdown", () => {
  for (const { page, html } of shipped) {
    assert.match(html, /class="nav-link" href="\/academy\/resources\/">Resources/);
    assert.equal(html.includes("resources-panel"), false, page);
    assert.equal(html.includes("nav-dropdown"), false, page);
    assert.equal(html.includes("nav-trigger"), false, page);
  }
});

test("G4: academy/resources is canonical; /resources/ hands off there", () => {
  assert.match(resourcesHub, /id="digital-outreach"/);
  assert.match(resourcesHub, /resource-filters/);
  assert.match(resourcesHub, /digital-outreach-handout\.pdf/);
  assert.match(resourcesHandoff, /url=\/academy\/resources\//);
  assert.match(resourcesHandoff, /location\.replace\("\/academy\/resources\/"\)/);
  assert.match(resourcesHandoff, /href="\/academy\/resources\/"/);
});

test("G5: Academy waiting-list CTAs open the existing contact dialog", () => {
  assert.equal(academy.includes("Book a discovery call"), false);
  assert.match(academy, /data-contact-dialog>Join the waiting list/);
  assert.match(academy, /id="contact-dialog"/);
  assert.match(academy, /action="https:\/\/calendly\.com\/missionarymediahub\/30min"/);
});

test("G6: Home removals and founder HOLD (short FOUNDER-006 beginning only)", () => {
  assert.equal(home.includes("academy-teaser"), false);
  assert.equal(home.includes("What we’re building"), false);
  assert.equal(home.includes("Not Missionary Media."), false);
  assert.equal(home.includes("high-school classroom"), false);
  assert.equal(home.includes("I founded Missionary Media"), false);
  assert.equal(home.includes("three countries"), false);
  assert.equal(home.includes("visual arts and counseling"), false);
  assert.equal(home.includes("top creators"), false);
  assert.equal(/I[’']m Tabor/.test(home), false);
  assert.match(home, /TODO-FOUNDER/);
  assert.match(home, /You came to the field to plant churches, share the gospel, and stay in the work/);
  assert.match(home, /help you find a next step that fits\.<\/p>/);
  assert.match(home, /If I don’t have the answer, I’ll connect you with a trustworthy resource/);
});

test("G7: Footer matches simplified nav", () => {
  for (const { page, html } of shipped) {
    assert.equal(html.includes("Coaching &amp; about Tabor"), false, page);
    assert.match(html, /Footer navigation[\s\S]*tabornorm\.com\//);
    assert.match(html, /Get help[\s\S]*Join the waiting list/);
    assert.match(html, /Get help[\s\S]*href="\/academy\/resources\/">Resources/);
  }
});

test("G8: prefers-reduced-motion still present; no extra-work chapter label", () => {
  assert.match(css, /prefers-reduced-motion/);
  assert.equal(home.includes("The extra work"), false);
  assert.match(home, /Too much noise/);
  assert.match(home, /Digital noise<br>\ncan eat the week/);
});
