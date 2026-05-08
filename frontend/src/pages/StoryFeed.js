import { useEffect, useState } from "react";
import { getStories, toggleBookmark } from "../api";
import StoryCard from "../components/StoryCard";
import { useAuth } from "../context/AuthContext";

function StoryFeed({ mode }) {
  const [stories, setStories] = useState([]);
  const [pagination, setPagination] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [pendingId, setPendingId] = useState("");
  const [page, setPage] = useState(1);
  const { user, isAuthenticated } = useAuth();

  useEffect(() => {
    const loadStories = async () => {
      setLoading(true);
      setError("");

      try {
        const data = await getStories(page, 10);
        setStories(data.stories);
        setPagination(data.pagination);
      } catch (requestError) {
        setError(requestError.response?.data?.message || requestError.message);
      } finally {
        setLoading(false);
      }
    };

    loadStories();
  }, [page]);

  const visibleStories =
    mode === "bookmarks"
      ? stories.filter((story) => story.bookmarkedBy?.includes(user?._id))
      : stories;

  const handleBookmark = async (storyId) => {
    if (!isAuthenticated) {
      setError("You need to log in before bookmarking stories.");
      return;
    }

    setPendingId(storyId);
    setError("");

    try {
      const response = await toggleBookmark(storyId);
      setStories((current) =>
        current.map((story) => (story._id === storyId ? response.story : story))
      );
    } catch (requestError) {
      setError(requestError.response?.data?.message || requestError.message);
    } finally {
      setPendingId("");
    }
  };

  return (
    <section className="panel">
      <div className="stories-header">
        <div>
          <h3>{mode === "bookmarks" ? "Saved Stories" : "Top Stories"}</h3>
          <p className="stories-subtitle">
            {mode === "bookmarks"
              ? "Stories filtered from your bookmarked collection."
              : "Fetched from GET /api/stories and sorted by points descending."}
          </p>
        </div>
        {pagination ? (
          <div className="pagination">
            <button
              className="ghost-button"
              type="button"
              onClick={() => setPage((current) => Math.max(current - 1, 1))}
              disabled={page === 1}
            >
              Previous
            </button>
            <span className="pagination-label">
              Page {pagination.page} of {pagination.totalPages || 1}
            </span>
            <button
              className="ghost-button"
              type="button"
              onClick={() =>
                setPage((current) =>
                  current < (pagination.totalPages || 1) ? current + 1 : current
                )
              }
              disabled={page >= (pagination.totalPages || 1)}
            >
              Next
            </button>
          </div>
        ) : null}
      </div>

      {error ? <div className="message error">{error}</div> : null}

      {loading ? (
        <div className="empty-state">Fetching stories...</div>
      ) : visibleStories.length === 0 ? (
        <div className="empty-state">
          {mode === "bookmarks"
            ? "You have not bookmarked any stories on this page yet."
            : "No stories available yet. Run the scraper from the backend."}
        </div>
      ) : (
        <div className="story-list">
          {visibleStories.map((story) => (
            <StoryCard
              key={story._id}
              story={story}
              onBookmark={handleBookmark}
              pending={pendingId === story._id}
              isBookmarked={Boolean(user && story.bookmarkedBy?.includes(user._id))}
            />
          ))}
        </div>
      )}
    </section>
  );
}

export default StoryFeed;
