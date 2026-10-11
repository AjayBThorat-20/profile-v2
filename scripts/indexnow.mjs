// Tells the IndexNow search engines (Bing, Yandex, Seznam, Naver, Yep) about
// every page in the live sitemap, so they crawl it now instead of whenever
// they next find a link. Bing's index also feeds DuckDuckGo, Yahoo, Copilot
// and ChatGPT search. Google doesn't take IndexNow - use Search Console.
//
// Run it after a deploy that adds or changes pages: npm run indexnow
// The key file in public/ has to be live first: IndexNow fetches it to check
// the submission comes from whoever controls the site.
//
// Another site serving the same key file (the DevCompass docs do) can be
// submitted by passing its URL: npm run indexnow -- https://devcompass.ajaythorat.com

const SITE = (process.argv[2] || process.env.NEXT_PUBLIC_SITE_URL || "https://ajaythorat.com").replace(/\/$/, "");
const KEY = "29467ea13fbad92433efc5aec87b4c88";
const keyLocation = `${SITE}/${KEY}.txt`;

const liveKey = await fetch(keyLocation).then((res) => (res.ok ? res.text() : ""));
if (liveKey.trim() !== KEY) {
  console.error(`The key file isn't live at ${keyLocation} yet. Deploy, then run this again.`);
  process.exit(1);
}

// Page URLs only: the sitemap's <image:loc> entries don't match <loc>.
const sitemap = await fetch(`${SITE}/sitemap.xml`).then((res) => res.text());
const urlList = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1]);

const res = await fetch("https://api.indexnow.org/indexnow", {
  method: "POST",
  headers: { "Content-Type": "application/json; charset=utf-8" },
  body: JSON.stringify({ host: new URL(SITE).host, key: KEY, keyLocation, urlList }),
});

// 200 means accepted; 202 means accepted while the key is still being checked.
console.log(`IndexNow answered ${res.status} for ${urlList.length} URLs:`);
urlList.forEach((url) => console.log(`  ${url}`));
if (!res.ok) process.exit(1);
