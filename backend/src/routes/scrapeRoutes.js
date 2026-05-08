const express = require("express");

const { scrapeNews } = require("../controllers/scrapeController");

const router = express.Router();

router.post("/", scrapeNews);

module.exports = router;
