# Resume source

`Ajay_Thorat.html` is the editable source for `public/Resume/Ajay_Thorat.pdf` — the PDF has no other
editable original, so edit this file and regenerate rather than editing the PDF directly.

Regenerate with Playwright (or any headless-Chromium `page.pdf()` call):

```js
const { chromium } = require("playwright");
(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.goto("file://" + require("path").resolve("resume-source/Ajay_Thorat.html"));
  await page.pdf({ path: "public/Resume/Ajay_Thorat.pdf", format: "Letter", printBackground: true });
  await browser.close();
})();
```
