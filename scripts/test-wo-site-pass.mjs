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

test("G5: Academy waiting-list CTAs open the existing contact dialog", () => {
  assert.equal(academy.includes("Book a discovery call"), false);
  assert.match(academy, /data-contact-dialog>Join the waiting list/);
  assert.match(academy, /id="contact-dialog"/);
  assert.match(academy, /action="https:\/\/calendly\.com\/missionarymediahub\/30min"/);
});

test("G6: Home removals and FOUNDER-006 beginning only (no invented continuation)", () => {
  assert.equal(home.includes("academy-teaser"), false);
  assert.equal(home.includes("What we’re building"), false);
  assert.equal(home.includes("Not Missionary Media."), false);
  assert.equal(home.includes("high-school classroom"), false);
  assert.equal(home.includes("I founded Missionary Media"), false);
  assert.equal(home.includes("three countries"), false);
  assert.match(home, /You came to the field to plant churches, share the gospel, and stay in the work\. The digital side should serve that, not eat the week\. Missionary Media helps missionaries navigate the digital side of their ministry\. We sit with you, listen to what you[’']re trying to do, and help you find a next step that fits\.<\/p>/);
  assert.match(home, /TODO-FOUNDER-006/);
  assert.equal(home.includes("I have helped missionaries"), false);
  assert.equal(home.includes("I have studied visual arts"), false);
  assert.equal(home.includes("And we’re just getting started"), false);
  assert.equal(home.includes("And we're just getting started"), false);
  assert.match(home, /If I don’t have the answer, I’ll connect you with a trustworthy resource/);
  assert.match(home, /href="\/about\/">More about Tabor/);
  assert.equal(home.includes("help-aspects"), false);
  assert.match(home, />Tools</);
  assert.match(home, />People</);
  assert.match(home, />Steps</);
  assert.match(home, /scene-trusted-help/);
  assert.match(home, /data-pain-scene="2"/);
  assert.match(home, /data-scene-jump="2"[^>]*>Steps</);
  assert.equal(home.includes("quiet-draft"), false);
  assert.equal(home.includes("site-card--church"), false);
});

test("G7: Footer matches simplified nav", () => {
  for (const { page, html } of shipped) {
    assert.equal(html.includes("Coaching &amp; about Tabor"), false, page);
    assert.match(html, /Footer navigation[\s\S]*href="\/about\/">About Tabor/);
    if (page.endsWith("/public/index.html")) {
      assert.match(html, /Get help[\s\S]*Let’s Chat/);
    } else {
      assert.match(html, /Get help[\s\S]*Join the waiting list/);
    }
    assert.match(html, /Get help[\s\S]*href="\/academy\/resources\/">Resources/);
  }
});

test("G8: prefers-reduced-motion still present; no extra-work chapter", () => {
  assert.match(css, /prefers-reduced-motion/);
  assert.equal(home.includes("The extra work"), false);
  assert.equal(home.includes("Digital noise<br>"), false);
  assert.match(home, /Does any of this/);
  assert.match(home, /I keep getting told to try another app\./);
});

test("G11: WO-HOME-SPINE-001 chapter copy; no parentheticals or em dashes", () => {
  assert.match(home, /<h3 id="pain-one-title"[^>]*>I keep getting told to try another app\.<\/h3>/);
  assert.match(home, /I help you choose what you need and make better use of what you already have\./);
  assert.match(home, /<h3 id="pain-two-title"[^>]*>Everything technical comes back to me\.<\/h3>/);
  assert.match(home, /I don[’']t even know who to ask\./);
  assert.match(home, /I send the same prayer letter one person at a time\./);
  assert.match(home, /I help you organize your contacts and send updates without repeating the same work\./);
  assert.equal(home.includes("not only a church-made page"), false);
  const start = home.indexOf('<div class="pain-chapters">');
  const end = home.indexOf('<div class="pain-visual">');
  assert.ok(start >= 0 && end > start);
  const chapters = home.slice(start, end);
  assert.equal(chapters.includes("("), false);
  assert.equal(chapters.includes("\u2014"), false);
  assert.equal(chapters.includes(" -- "), false);
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
  assert.match(about, /<h1 id="about-title"[^>]*>About Tabor<\/h1>/);
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

test("G9: About page ships ABOUT-003 sparse copy with short H1", () => {
  assert.match(about, /<h1 id="about-title"[^>]*>About Tabor<\/h1>/);
  assert.doesNotMatch(about, /<h1[^>]*>You came to the field/);
  assert.match(about, /<h2>How I help<\/h2>\s*<p class="about-help"[^>]*>You came to the field to plant churches, share the gospel, and stay in the work\. The digital side should serve that, not eat the week\. Missionary Media helps missionaries navigate the digital side of their ministry\. I sit with you, listen to what you[’']re trying to do, and help you find a next step that fits, without asking you to become the media person\. I[’']m Tabor\.<\/p>/);
  assert.match(about, /I[’']ve helped missionaries in a few countries with AV, church systems, and digital security/);
  assert.match(about, /trained in the same rooms the top creators use\. And we[’']re just getting started/);
  assert.match(about, /class="button about-hero-cta"[\s\S]*data-contact-dialog>Join the waiting list/);
  assert.match(about, /src="\/assets\/resources\/tabor-speaking\.jpg"/);
  assert.match(about, /alt="Tabor Normoyle in side profile at a desk, talking toward a computer"/);
  assert.match(about, /id="contact-dialog"/);
  assert.equal(about.includes("Why Missionary Media exists"), false);
  assert.equal(about.includes("Think Media"), false);
  assert.equal(about.includes("Full Time Filmmaker"), false);
  assert.equal(about.includes("Tomorrow Filmmakers"), false);
  assert.equal(about.includes("A+"), false);
  assert.equal(about.includes("Security+"), false);
  assert.equal(about.includes("Watch / listen"), false);
  assert.equal(about.includes("about-chips"), false);
  assert.equal(about.includes("academy-hero-tabor"), false);
  assert.equal(about.includes("three countries"), false);
  assert.equal(about.includes("Valley Forge"), false);
  assert.equal(about.includes("\u2014"), false);
  assert.equal(about.includes("digital-door"), false);
});

test("WO-WEB-ACADEMY-CARD-001: mobile door hero layers photo behind left copy", () => {
  assert.match(css, /Mobile door hero: raise the photo behind left copy and keep the glow on the right\./);
  assert.equal(css.includes("height:calc(54% + 15px)"), false);
  assert.equal(css.includes("linear-gradient(180deg,#071c32 36%"), false);
  assert.match(css, /\.academy-door-copy\{max-width:51%;position:relative\}/);
  assert.match(css, /@media\(max-width:740px\)\{[\s\S]*\.academy-door-copy\{max-width:58%;padding-right:8px\}/);
  assert.match(css, /@media\(max-width:740px\)\{[\s\S]*\.academy-door-copy h1\{font-size:36px;max-width:10ch\}/);
  assert.match(css, /@media\(max-width:740px\)\{[\s\S]*\.academy-door-hero::after\{background:linear-gradient\(90deg/);
  assert.match(css, /@media\(max-width:740px\)\{[\s\S]*\.academy-door-image img\{[^}]*object-position:94% 40%/);
  assert.match(css, /@media\(prefers-reduced-motion:reduce\)/);
  for (const { page, html } of shipped) {
    if (!html.includes("/assets/site.css")) continue;
    assert.match(html, /\/assets\/site\.css\?v=sitepass10/, page);
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
  assert.match(about, /data-about-stagger href="\/#start" data-contact-dialog>Join the waiting list/);
});

test("WO-HOME-SPINE-001: hero, seating, person-connection, no coaching or price", () => {
  assert.match(home, /I help missionaries/);
  assert.match(home, /handle technology/);
  assert.match(home, /for ministry\./);
  assert.match(home, /I help you choose what to use, learn how to use it, and work out who will handle it\./);
  assert.match(home, />Let’s Chat/);
  assert.match(home, /Start with a free 30-minute conversation\. If you[’']d like my help, I[’']ll explain the work and the cost before we begin\./);
  assert.match(home, /data-pain-scene="0"/);
  assert.match(home, /class="pain-scene scene-work"[^>]*data-pain-scene="0"/);
  assert.match(home, /class="pain-scene scene-trusted-help"[^>]*data-pain-scene="1"/);
  assert.match(home, /class="pain-scene scene-sending"[^>]*data-pain-scene="2"/);
  assert.match(home, /help-person/);
  assert.match(home, /help-connection/);
  assert.match(home, /Another app/);
  assert.match(home, /Send it once/);
  assert.match(home, /A teammate/);
  assert.match(home, /The free 30-minute conversation is to identify what you need/);
  assert.equal(home.includes("A few familiar choices, settling into a clearer arrangement."), false);
  assert.equal(home.includes("We’ll work through it together."), false);
  assert.equal(home.includes("Format the letter"), false);
  assert.equal(home.includes("DIY"), false);
  assert.equal(home.includes("One-on-one coaching and monthly live training are available now"), false);
  assert.equal(home.includes("A video you’re trying to make"), false);
  assert.equal(home.includes("fruitfulness"), false);
  assert.equal(home.includes("$100"), false);
  assert.match(home, /id="staying-connected"/);
  assert.match(home, /Home Connection is the whole workflow/);
  assert.match(home, /A letter or a video is one piece of that process\./);
  const storyJs = siteJs.slice(siteJs.indexOf("const makeNarrative"), siteJs.indexOf("// Native scrolling is the timeline"));
  assert.equal(storyJs.includes("setTimeout"), false);
  assert.match(siteJs, /Native scrolling is the timeline/);
});
