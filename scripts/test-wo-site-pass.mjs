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
  walk(join(root, "public/about"));
  return pages;
}

const shipped = htmlPages().map((page) => ({ page, html: readFileSync(page, "utf8") }));
const home = readFileSync(join(root, "public/index.html"), "utf8");
const academy = readFileSync(join(root, "public/academy/index.html"), "utf8");
const about = readFileSync(join(root, "public/about/index.html"), "utf8");
const resourcesHub = readFileSync(join(root, "public/academy/resources/index.html"), "utf8");
const resourcesHandoff = readFileSync(join(root, "public/resources/index.html"), "utf8");
const css = readFileSync(join(root, "public/assets/site.css"), "utf8");

test("G1: Coaching is gone from nav, drawer, and noscript on shipped pages", () => {
  for (const { page, html } of shipped) {
    assert.equal(html.includes("href=\"/#how-i-help\">Coaching"), false, page);
    assert.equal(/<a[^>]*>Coaching/.test(html), false, page);
  }
});

test("G2: About Tabor is /about/; tabornorm.com is other-work, never .org", () => {
  for (const { page, html } of shipped) {
    assert.match(html, /class="nav-link" href="\/about\/"/);
    assert.match(html, />About Tabor</);
    assert.equal(html.includes("tabornorm.org"), false, page);
    assert.equal(html.includes("href=\"/#about\""), false, page);
    assert.equal(/class="nav-link" href="https:\/\/tabornorm\.com\//.test(html), false, page);
  }
  assert.match(about, /href="https:\/\/tabornorm\.com\/" target="_blank" rel="noopener noreferrer"/);
  assert.match(about, /More of the story is at tabornorm\.com/);
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

test("G6: Home removals and founder unlock (few countries + motivating close)", () => {
  assert.equal(home.includes("academy-teaser"), false);
  assert.equal(home.includes("What we’re building"), false);
  assert.equal(home.includes("Not Missionary Media."), false);
  assert.equal(home.includes("high-school classroom"), false);
  assert.equal(home.includes("I founded Missionary Media"), false);
  assert.equal(home.includes("TODO-FOUNDER"), false);
  assert.equal(home.includes("three countries"), false);
  assert.match(home, /You came to the field to plant churches, share the gospel, and stay in the work/);
  assert.match(home, /I[’']m Tabor\. I have helped missionaries in a few countries with AV, church systems, and digital security/);
  assert.match(home, /I have studied visual arts and counseling, led church media and IT, and trained in the same rooms the top creators use/);
  assert.match(home, /And we[’']re just getting started\.<\/p>/);
  assert.match(home, /If I don’t have the answer, I’ll connect you with a trustworthy resource/);
  assert.match(home, /href="\/about\/">More about Tabor/);
});

test("G7: Footer matches simplified nav", () => {
  for (const { page, html } of shipped) {
    assert.equal(html.includes("Coaching &amp; about Tabor"), false, page);
    assert.match(html, /Footer navigation[\s\S]*href="\/about\/">About Tabor/);
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

test("G9: About page ships Outline A paste-ready strings", () => {
  assert.match(about, /You came to the field to plant churches, share the gospel, and stay in the work\. Missionary Media helps you navigate the digital side of ministry/);
  assert.match(about, /Why Missionary Media exists/);
  assert.match(about, /So you know where to start, make wise decisions, and stay connected without the digital work eating your week/);
  assert.match(about, /help you find a next step that fits, without asking you to become the media person/);
  assert.match(about, /a few countries/);
  assert.match(about, /Think Media Academy, Full Time Filmmaker, Tomorrow Filmmakers/);
  assert.match(about, /A\+ and Security\+/);
  assert.match(about, /And we[’']re just getting started/);
  assert.match(about, /id="contact-dialog"/);
  assert.match(about, /data-contact-dialog>Join the waiting list/);
  assert.equal(about.includes("three countries"), false);
  assert.equal(about.includes("Valley Forge"), false);
  assert.equal(about.includes("\u2014"), false);
  assert.equal(about.includes("TODO-FOUNDER"), false);
  assert.equal(about.includes("TODO-WATCHLINKS"), false);
});
