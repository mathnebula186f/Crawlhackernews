const express = require("express");
const axios = require("axios");
const cheerio = require("cheerio");
const cors = require("cors");

const app = express();
app.use(cors());
const port = 5000;

app.use(express.json());

app.get("/news", async (req, res) => {
  try {
    const pageCount = 3; // Number of pages to scrape
    const newsItems = [];

    for (let page = 1; page <= pageCount; page++) {
      const response = await axios.get(
        `https://news.ycombinator.com/news?p=${page}`
      );
      const html = response.data;
      const $ = cheerio.load(html);

      $("tr.athing").each((index, element) => {
        const title = $(element).find(".title a").text().trim();
        const url = $(element).find(".title a").attr("href");
        const hnUrl = $(element).find(".title a").attr("href");
        const score = $(element).next().find(".score").text().trim();
        const user = $(element).next().find(".hnuser").text().trim();
        const comments = $(element)
          .next()
          .find('a[href*="item?id="]')
          .text()
          .trim();
        const timestamp = $(element).next().find(".age").attr("title");

        newsItems.push({
          title,
          url,
          hnUrl: `https://news.ycombinator.com/${hnUrl}`,
          score,
          user,
          comments,
          timestamp,
        });
      });
    }

    res.json(newsItems);
  } catch (error) {
    console.error("Error fetching news:", error);
    res.status(500).json({ error: "Error fetching news" });
  }
});

app.listen(port, () => {
  console.log(`Proxy server listening at http://localhost:${port}`);
});
