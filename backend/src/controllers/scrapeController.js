const asyncHandler = require("../utils/asyncHandler");
const scrapeTopStories = require("../utils/scrapeStories");

const scrapeNews = asyncHandler(async (_req, res) => {
  const stories = await scrapeTopStories();

  res.status(200).json({
    message: "Hacker News stories scraped successfully",
    count: stories.length,
    stories
  });
});

module.exports = {
  scrapeNews
};
