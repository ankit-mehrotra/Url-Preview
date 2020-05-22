const express = require("express");
const puppeteer = require("puppeteer");
const cors = require("cors");

// Cors/express and puppeteer packages used.

const app = express();

// Middleware
app.use(express.json());
app.use(cors("*"));

// Url
let url =
  "https://www.amazon.in/dp/B07DJHXTLJ?pf_rd_r=1DGC4TS9KVNYZ99EQ2SZ&pf_rd_p=d0c97f40-6a58-40fc-ab0a-a3847b73a797";

app.get("/", (req, res) => {
  getExample(url)
    .then((data) => {
      res.json(data).status(200);
    })
    .catch((err) => console.log(err));
});

app.listen(4000, () => console.log("Listening on Port 4000"));

// Web Scraping for data
async function getExample(url) {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(url);
  const [el] = await page.$x('//*[@id="landingImage"]');
  const src = await el.getProperty("src");
  const srctText = await src.jsonValue();

  const [el2] = await page.$x('//*[@id="productTitle"]');
  const txt = await el2.getProperty("textContent");
  const rawText = await txt.jsonValue();

  return {
    srctText,
    rawText: rawText.trim().replace(/(\r\n|\n|\r)/gm, ""),
    url,
  };
}
