import { Outlet, NavLink } from "react-router-dom";
import { useAuth } from "../AuthContext";
import "../styles/Layout.css";

import { ReactComponent as PersonIcon } from "../assets/icons/person.svg";
import { ReactComponent as DashboardIcon } from "../assets/icons/dashboard.svg";
import { ReactComponent as SettingsIcon } from "../assets/icons/settings.svg";

export default function Layout() {
  const { user, logout } = useAuth();

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
            <DashboardIcon className="svg-icon" />
            <span>Dashboard</span>
          </NavLink>

          <NavLink
            to="/settings"
            className={({ isActive }) => (isActive ? "link active" : "link")}
          >
            <SettingsIcon className="svg-icon" />
            <span>Settings</span>
          </NavLink>
        </nav>

        <div className="bottom-section">
          <div className="username">
            <PersonIcon className="svg-icon" />
            {user}
          </div>
          <button onClick={logout} className="logout-button">
            Logout
          </button>
        </div>
      </aside>

      <main className="content">
        <Outlet />
      </main>
    </div>
  );
}
