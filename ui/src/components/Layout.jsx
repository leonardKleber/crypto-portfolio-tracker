import { Outlet, NavLink } from "react-router-dom";
import "../styles/Layout.css";

export default function Layout() {
  return (
    <div className="layout">
      <aside className="sidebar">
        <h1 className="title">My Portfolio</h1>
        <nav className="nav">
          <NavLink
            to="/"
            end
            className={({ isActive }) => (isActive ? "link active" : "link")}
          >
            Dashboard
          </NavLink>

          <NavLink
            to="/settings"
            className={({ isActive }) => (isActive ? "link active" : "link")}
          >
            Settings
          </NavLink>
        </nav>
      </aside>

      <main className="content">
        <Outlet />
      </main>
    </div>
  );
}
