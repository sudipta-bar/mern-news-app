import StoryFeed from "./StoryFeed";

function HomePage() {
  return (
    <main className="page-shell">
      <section className="hero">
        <div>
          <p className="eyebrow">Top stories</p>
          <h2 className="page-title">Browse the highest-scoring Hacker News stories.</h2>
          <p className="hero-copy">
            The backend scraper runs on startup and stores stories in MongoDB. Bookmark any
            story after logging in.
          </p>
        </div>
        <div className="hero-card">
          <p className="status-label">Collection</p>
          <h3>Sorted by points</h3>
          <p className="status-copy">Pagination-ready story API with per-user bookmark toggles.</p>
        </div>
      </section>

      <StoryFeed mode="all" />
    </main>
  );
}

export default HomePage;
