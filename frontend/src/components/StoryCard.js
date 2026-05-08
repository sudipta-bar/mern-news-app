function formatDate(value) {
  return new Intl.DateTimeFormat("en-US", {
    dateStyle: "medium",
    timeStyle: "short"
  }).format(new Date(value));
}

function StoryCard({ story, onBookmark, pending, isBookmarked, showBookmarkButton = true }) {
  return (
    <article className="story-card">
      <div className="story-meta">
        <span>{story.points} points</span>
        <span>by {story.author}</span>
        <span>{formatDate(story.postedAt)}</span>
      </div>

      <h4>
        <a href={story.url} target="_blank" rel="noreferrer">
          {story.title}
        </a>
      </h4>

      <div className="story-actions">
        {showBookmarkButton ? (
          <button
            className="bookmark-button"
            type="button"
            onClick={() => onBookmark(story._id)}
            disabled={pending}
          >
            {pending ? "Updating..." : isBookmarked ? "Remove bookmark" : "Bookmark"}
          </button>
        ) : (
          <span className="bookmark-status">Saved</span>
        )}

        <span className="bookmark-count">
          {story.bookmarkedBy?.length || 0} bookmark
          {(story.bookmarkedBy?.length || 0) === 1 ? "" : "s"}
        </span>
      </div>
    </article>
  );
}

export default StoryCard;
