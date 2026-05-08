const mongoose = require("mongoose");

const Story = require("../models/Story");
const asyncHandler = require("../utils/asyncHandler");

const getAllStories = asyncHandler(async (req, res) => {
  const page = Math.max(Number.parseInt(req.query.page || "1", 10), 1);
  const limit = Math.max(Number.parseInt(req.query.limit || "10", 10), 1);
  const skip = (page - 1) * limit;

  const [stories, total] = await Promise.all([
    Story.find().sort({ points: -1, postedAt: -1 }).skip(skip).limit(limit),
    Story.countDocuments()
  ]);

  res.status(200).json({
    stories,
    pagination: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit)
    }
  });
});

const getStoryById = asyncHandler(async (req, res) => {
  const story = await Story.findById(req.params.id);

  if (!story) {
    res.status(404);
    throw new Error("Story not found");
  }

  res.status(200).json(story);
});

const toggleBookmark = asyncHandler(async (req, res) => {
  const story = await Story.findById(req.params.id);

  if (!story) {
    res.status(404);
    throw new Error("Story not found");
  }

  const userId = new mongoose.Types.ObjectId(req.user._id);
  const isBookmarked = story.bookmarkedBy.some((id) => id.equals(userId));

  if (isBookmarked) {
    story.bookmarkedBy = story.bookmarkedBy.filter((id) => !id.equals(userId));
  } else {
    story.bookmarkedBy.push(userId);
  }

  await story.save();

  res.status(200).json({
    message: isBookmarked ? "Bookmark removed" : "Bookmark added",
    bookmarked: !isBookmarked,
    bookmarksCount: story.bookmarkedBy.length,
    story
  });
});

module.exports = {
  getAllStories,
  getStoryById,
  toggleBookmark
};
