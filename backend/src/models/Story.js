const mongoose = require("mongoose");

const storySchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true
    },
    url: {
      type: String,
      required: true,
      unique: true,
      trim: true
    },
    points: {
      type: Number,
      required: true,
      default: 0
    },
    author: {
      type: String,
      required: true,
      trim: true
    },
    postedAt: {
      type: Date,
      required: true
    },
    content: {
      type: String,
      trim: true
    },
    imageUrl: {
      type: String,
      trim: true
    },
    category: {
      type: String,
      trim: true,
      default: "General"
    },
    tags: {
      type: [String],
      default: []
    },
    bookmarkedBy: {
      type: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User"
        }
      ],
      default: []
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("Story", storySchema);
