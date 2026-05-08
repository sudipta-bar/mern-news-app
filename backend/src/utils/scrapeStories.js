const axios = require("axios");
const cheerio = require("cheerio");

const Story = require("../models/Story");

const HN_URL = "https://news.ycombinator.com/";
const STORIES_LIMIT = 10;

const toAbsoluteUrl = (url) => {
  if (!url) {
    return HN_URL;
  }

  if (url.startsWith("item?id=") || url.startsWith("from?")) {
    return `${HN_URL}${url}`;
  }

  return url;
};

const parseAgeToDate = (ageText) => {
  if (!ageText) {
    return new Date();
  }

  const match = ageText.match(/(\d+)\s+(minute|minutes|hour|hours|day|days|month|months|year|years)\s+ago/i);

  if (!match) {
    return new Date();
  }

  const amount = Number(match[1]);
  const unit = match[2].toLowerCase();
  const postedAt = new Date();

  if (unit.startsWith("minute")) {
    postedAt.setMinutes(postedAt.getMinutes() - amount);
  } else if (unit.startsWith("hour")) {
    postedAt.setHours(postedAt.getHours() - amount);
  } else if (unit.startsWith("day")) {
    postedAt.setDate(postedAt.getDate() - amount);
  } else if (unit.startsWith("month")) {
    postedAt.setMonth(postedAt.getMonth() - amount);
  } else if (unit.startsWith("year")) {
    postedAt.setFullYear(postedAt.getFullYear() - amount);
  }

  return postedAt;
};

const scrapeTopStories = async () => {
  const { data } = await axios.get(HN_URL, {
    headers: {
      "User-Agent": "mern-news-app/1.0"
    }
  });

  const $ = cheerio.load(data);
  const stories = [];

  $(".athing").slice(0, STORIES_LIMIT).each((_, element) => {
    const row = $(element);
    const subtext = row.next();
    const title = row.find(".titleline a").first().text().trim();
    const url = toAbsoluteUrl(row.find(".titleline a").first().attr("href"));
    const pointsText = subtext.find(".score").first().text().trim();
    const author = subtext.find(".hnuser").first().text().trim() || "unknown";
    const ageText = subtext.find(".age").first().text().trim();

    stories.push({
      title,
      url,
      points: Number.parseInt(pointsText, 10) || 0,
      author,
      postedAt: parseAgeToDate(ageText)
    });
  });

  const savedStories = [];

  for (const story of stories) {
    const savedStory = await Story.findOneAndUpdate(
      { url: story.url },
      story,
      {
        new: true,
        upsert: true,
        setDefaultsOnInsert: true,
        runValidators: true
      }
    );

    savedStories.push(savedStory);
  }

  return savedStories;
};

module.exports = scrapeTopStories;
