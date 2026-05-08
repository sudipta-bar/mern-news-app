import StoryFeed from "./StoryFeed";

function BookmarksPage() {
  return (
    <main className="page-shell">
      <section className="hero compact-hero">
        <div>
          <p className="eyebrow">Your library</p>
          <h2 className="page-title">Bookmarked stories</h2>
          <p className="hero-copy">
            This page is protected. It only shows stories you have bookmarked from the main feed.
          </p>
        </div>
      </section>

      <StoryFeed mode="bookmarks" />
    </main>
  );
}

export default BookmarksPage;
