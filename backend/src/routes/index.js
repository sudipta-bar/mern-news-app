const express = require("express");

const authRoutes = require("./authRoutes");
const scrapeRoutes = require("./scrapeRoutes");
const storyRoutes = require("./storyRoutes");

const router = express.Router();

router.use("/auth", authRoutes);
router.use("/scrape", scrapeRoutes);
router.use("/stories", storyRoutes);

module.exports = router;
