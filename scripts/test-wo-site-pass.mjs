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
const siteJs = readFileSync(join(root, "public/assets/site.js"), "utf8");

test("G1: Coaching is gone from nav, drawer, and noscript on shipped pages", () => {
  for (const { page, html } of shipped) {
    assert.equal(html.includes("href=\"/#how-i-help\">Coaching"), false, page);
    assert.equal(/<a[^>]*>Coaching/.test(html), false, page);
  }
});

test("G2: About Tabor is /about/; tabornorm.com is on-page story link, never .org", () => {
  for (const { page, html } of shipped) {
    assert.match(html, /class="nav-link" href="\/about\/"/);
    assert.match(html, />About Tabor</);
    assert.equal(html.includes("tabornorm.org"), false, page);
    assert.equal(html.includes("href=\"/#about\""), false, page);
    assert.equal(/class="nav-link" href="https:\/\/tabornorm\.com\//.test(html), false, page);
    const desktopNav = html.match(/<nav class="primary-nav"[^>]*>[\s\S]*?<\/nav>/);
    assert.ok(desktopNav, page);
    assert.equal(desktopNav[0].includes("Home"), false, page);
  }
  assert.match(about, /More of my story: <a href="https:\/\/tabornorm\.com\/" target="_blank" rel="noopener noreferrer">tabornorm\.com/);
});

test("G3: Resources is a single nav link with no dropdown", () => {
  for (const { page, html } of shipped) {
    assert.match(html, /class="nav-link" href="\/academy\/resources\/">Resources/);
    assert.equal(html.includes("resources-panel"), false, page);
    assert.equal(html.includes("nav-dropdown"), false, page);
    assert.equal(html.includes("nav-trigger"), false, page);
  }
});

test("G4: academy/resources is canonical learning layout; /resources/ hands off there", () => {
  assert.match(resourcesHub, /id="learning-title"/);
  assert.match(resourcesHub, /academy-support-hero/);
  assert.match(resourcesHub, /Learn a skill\.<br>\s*Try it in ministry\./);
  assert.match(resourcesHub, /learning-material/);
  assert.match(resourcesHub, /class="resource-filters"/);
  assert.equal(resourcesHub.includes("resource-filters\" hidden"), false);
  assert.equal(resourcesHub.includes("class=\"resource-hero"), false);
  assert.match(resourcesHub, /I[’']m looking to/);
  assert.match(resourcesHub, /digital-outreach-handout\.pdf/);
  assert.match(resourcesHandoff, /url=\/academy\/resources\//);
  assert.match(resourcesHandoff, /location\.replace\("\/academy\/resources\/"\)/);
  assert.match(resourcesHandoff, /href="\/academy\/resources\/"/);
});

test("G5: Academy conversation CTAs open the existing contact dialog", () => {
  assert.equal(academy.includes("Book a discovery call"), false);
  assert.match(academy, /data-contact-dialog>Let’s Chat/);
  assert.match(academy, /id="contact-dialog"/);
  assert.match(academy, /action="https:\/\/calendly\.com\/missionarymediahub\/30min"/);
});

test("Focused offer: question section, taught Academy packages, one paid-work explanation", () => {
  assert.match(home, /class="section question-section"/);
  assert.equal((home.match(/class="question-item"/g) || []).length, 4);
  assert.equal((home.match(/class="course-package"/g) || []).length, 2);
  assert.match(home, /href="\/academy\/resources\/">Free resources/);
  assert.match(home, /Any paid work starts only after you agree to the work and price/);
  assert.match(home, /Developed &amp; taught online/);
  assert.doesNotMatch(home, /staying-connected|help-now-section|help-terms|help-example/);
  assert.doesNotMatch(academy, /data-library-preview|enrollment isn’t open/);
});

test("G7: Footer matches simplified nav", () => {
  for (const { page, html } of shipped) {
    assert.equal(html.includes("Coaching &amp; about Tabor"), false, page);
    assert.match(html, /Footer navigation[\s\S]*href="\/about\/">About Tabor/);
    if (page.endsWith("/public/index.html")) {
      assert.match(html, /Get help[\s\S]*Let’s Chat/);
    } else {
      assert.match(html, /Get help[\s\S]*Let’s Chat/);
    }
    assert.match(html, /Get help[\s\S]*href="\/academy\/resources\/">Resources/);
  }
});

test("G8: prefers-reduced-motion still present; no extra-work chapter", () => {
  assert.match(css, /prefers-reduced-motion/);
  assert.equal(home.includes("The extra work"), false);
  assert.equal(home.includes("Digital noise<br>"), false);
  assert.match(home, /What would you like/);
  assert.match(home, /Which tools actually fit\?/);
});

test("G11: homepage question section copy; no parentheticals or em dashes", () => {
  assert.match(home, /<h3>Which tools actually fit\?<\/h3>/);
  assert.match(home, /<h3>Why won’t it work together\?<\/h3>/);
  assert.match(home, /<h3>Is there an easier way to keep in touch\?<\/h3>/);
  assert.match(home, /<h3>Why am I doing this twice\?<\/h3>/);
  assert.match(home, /I’ll help you sort through it\./);
  assert.equal(home.includes("not only a church-made page"), false);
  const start = home.indexOf('class="question-list"');
  const end = home.indexOf('class="question-figure"');
  assert.ok(start >= 0 && end > start);
  const questions = home.slice(start, end);
  assert.equal(questions.includes("("), false);
  assert.equal(questions.includes("\u2014"), false);
  assert.equal(questions.includes(" -- "), false);
});

test("G12: About title uses MM heading rhythm, not 8ch crush", () => {
  assert.match(css, /--font:"Source Sans 3"/);
  assert.match(css, /font:400 18px\/1\.55 var\(--font\)/);
  assert.match(css, /--paper:#f5f0e8/);
  assert.match(css, /--blue:#005be8/);
  assert.match(css, /--about-h1-size:clamp\(2\.875rem,4\.6vw,3\.75rem\)/);
  assert.match(css, /--about-h1-tracking:-.04em/);
  assert.match(css, /--about-lede-size:clamp\(1\.25rem,1\.7vw,1\.375rem\)/);
  assert.match(css, /--about-lede-measure:38ch/);
  assert.match(css, /--about-lede-color:var\(--ink\)/);
  assert.match(css, /--about-body-size:1\.125rem/);
  assert.match(css, /--about-body-measure:42ch/);
  assert.match(css, /--about-body-color:var\(--muted\)/);
  assert.match(css, /--about-label-size:.9375rem/);
  assert.match(css, /\.page-about \.about-more-story a\{font-weight:600;color:var\(--blue\)\}/);
  assert.equal(css.includes("max-width:8ch"), false);
  assert.equal(css.includes("tabornorm"), false);
  assert.equal(css.includes("fonts.google"), false);
  assert.equal(css.includes("Bebas"), false);
  assert.equal(css.includes("Playfair"), false);
  assert.match(about, /<h1 id="about-title"[^>]*>Hi, I’m Tabor\.<\/h1>/);
  assert.match(css, /\.scene-trusted-help \.scene-art/);
  assert.match(css, /\.help-person__portrait/);
});

test("G13: trusted-help scene JS replaces the old silence branch", () => {
  assert.match(siteJs, /scene\.classList\.contains\("scene-trusted-help"\)/);
  assert.match(siteJs, /help-connection path/);
  assert.match(siteJs, /help-person/);
  assert.equal(siteJs.includes("quiet-draft"), false);
  assert.match(home, /<noscript><nav class="noscript-nav"[^>]*>[\s\S]*href="#start">Let’s Chat<\/a>/);
});

test("G9: About page ships founder biography with story video", () => {
  assert.match(about, /<h1 id="about-title"[^>]*>Hi, I’m Tabor\.<\/h1>/);
  assert.doesNotMatch(about, /<h1[^>]*>You came to the field/);
  assert.match(about, /I help missionaries choose and use technology so they can spend less time fighting with tools and more time focused on ministry\./);
  assert.match(about, /audio and video production, church systems, and digital security/);
  assert.doesNotMatch(about, /top creators/);
  assert.match(about, /class="button about-hero-cta"[\s\S]*data-contact-dialog>Let’s Chat/);
  assert.match(about, /class="story-card about-story-card"/);
  assert.match(about, /src="\/assets\/story-thumbnail\.jpg"/);
  assert.match(about, /data-story-video/);
  assert.match(about, /id="story-video-dialog"/);
  assert.match(about, /id="contact-dialog"/);
  assert.equal(about.includes("Why Missionary Media exists"), false);
  assert.equal(about.includes("Think Media"), false);
  assert.equal(about.includes("Full Time Filmmaker"), false);
  assert.equal(about.includes("Tomorrow Filmmakers"), false);
  assert.equal(about.includes("A+"), false);
  assert.equal(about.includes("Security+"), false);
  assert.equal(about.includes("Watch / listen"), false);
  assert.equal(about.includes("about-chips"), false);
  assert.equal(about.includes("three countries"), false);
  assert.equal(about.includes("Valley Forge"), false);
  assert.equal(about.includes("\u2014"), false);
  assert.equal(about.includes("digital-door"), false);
});

test("WO-WEB-ACADEMY-CARD-001: Academy package cards and shared cache pin", () => {
  assert.match(academy, /class="course-package"/);
  assert.match(academy, /digital-media-package\.png/);
  assert.match(academy, /it-basics-package\.png/);
  assert.match(css, /@media\(prefers-reduced-motion:reduce\)/);
  for (const { page, html } of shipped) {
    if (!html.includes("/assets/site.css")) continue;
    assert.match(html, /\/assets\/site\.css\?v=offer26/, page);
  }
});

test("G10: About hero title-then-CTA stagger and reduced-motion", () => {
  assert.match(css, /@keyframes about-hero-in/);
  assert.match(css, /about-hero-in 480ms cubic-bezier\(0\.22, 1, 0\.36, 1\) both/);
  assert.match(css, /\.about-hero h1\[data-about-stagger\]\{animation-delay:0ms\}/);
  assert.match(css, /\.about-hero .about-help\[data-about-stagger\]\{animation-delay:90ms\}/);
  assert.match(css, /\.about-hero .about-hero-cta\[data-about-stagger\]\{animation-delay:180ms\}/);
  assert.equal(css.includes(".about-hero .lead[data-about-stagger]"), false);
  assert.match(css, /prefers-reduced-motion:reduce\)\{\s*\.about-hero \[data-about-stagger\]\{animation:none;opacity:1;transform:none\}/);
  assert.match(about, /class="about-help" data-about-stagger/);
  assert.match(about, /data-about-stagger href="\/#start" data-contact-dialog>Let’s Chat/);
});

test("Consulting hero and story video on home and about", () => {
  assert.match(home, /I help missionaries/);
  assert.match(home, /Start with a free 30-minute conversation/);
  assert.match(home, /class="story-card founder-story-card"/);
  assert.match(home, /data-story-video/);
  assert.match(about, /class="story-card about-story-card"/);
  assert.doesNotMatch(about, /data-media-drift/);
});

test("WO-HOME-SPINE-001 REV-4: intake required cues, optional question, note above submit", () => {
  for (const { page, html } of shipped) {
    if (!html.includes("class=\"intake-form\"")) continue;
    assert.match(html, /class="field-cue">Required</, page);
    assert.match(html, /class="field-cue">Optional</, page);
    assert.equal(/id="(?:intake|waiting)-question"[^>]*\srequired/.test(html), false, page);
    const formStart = html.indexOf('class="intake-form"');
    const form = html.slice(formStart, formStart + 5000);
    const notePos = form.indexOf("transfer-note");
    const buttonPos = form.indexOf('type="submit"');
    assert.ok(notePos >= 0 && buttonPos > notePos, page);
    assert.match(form, /form-note--next/, page);
  }
  assert.match(home, /type="submit">Choose a time/);
  assert.match(css, /\.form-note--next\{font-size:16px/);
  assert.match(css, /\.field-cue\{/);
});

test("Rolling copy preserves source and supports reduced motion", () => {
  assert.match(siteJs, /rollingCopy.set\(copy, copy.textContent\)/);
  assert.match(siteJs, /copy.textContent = text/);
  assert.match(siteJs, /prepareRollingCopy\(story, false\)/);
  assert.match(siteJs, /range.getBoundingClientRect\(\).top/);
  assert.match(css, /prefers-reduced-motion:reduce\)\{.pain-story\[data-pain-pin\] .roll-line\{transform:none/);
});
