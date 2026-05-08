import { NavLink } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Navbar() {
  const { isAuthenticated, logout, user } = useAuth();

  return (
    <header className="topbar">
      <div className="brand-block">
        <p className="eyebrow">MERN News Desk</p>
        <h1 className="brand-title">Hacker News reader with bookmarks</h1>
      </div>

      <nav className="nav-links">
        <NavLink className="nav-link" to="/">
          Home
        </NavLink>
        <NavLink className="nav-link" to="/bookmarks">
          Bookmarks
        </NavLink>
        {isAuthenticated ? (
          <>
            <span className="nav-user">{user.name}</span>
            <button className="ghost-button" type="button" onClick={logout}>
              Log out
            </button>
          </>
        ) : (
          <>
            <NavLink className="nav-link" to="/login">
              Login
            </NavLink>
            <NavLink className="nav-link" to="/register">
              Register
            </NavLink>
          </>
        )}
      </nav>
    </header>
  );
}

export default Navbar;
