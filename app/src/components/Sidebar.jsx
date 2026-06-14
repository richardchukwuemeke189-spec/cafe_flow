import "../adminDashboardStyles/sideBar.css";
import {
  FaHome,
  FaCalendarAlt,
  FaEnvelope,
  FaUsers,
  FaChartBar,
  FaCog,
  FaSignOutAlt,
  FaCoffee,
  FaImages,
  FaUtensils,
  FaTimes
} from "react-icons/fa";
import { NavLink } from "react-router-dom";
import Logout from "./Logout";

function Sidebar({ sidebarOpen, setSidebarOpen }) {
  const menuItems = [
    {
      icon: <FaHome />,
      title: "Dashboard",
      path: "/admin/dashboard",
    },
    {
      icon: <FaCalendarAlt />,
      title: "Reservations",
      path: "/admin/reservations",
    },
    {
      icon: <FaEnvelope />,
      title: "Messages",
      path: "/admin/messages",
    },
    // {
    //   icon: <FaCog />,
    //   title: "Settings",
    //   path: "/admin/settings",
    // },
  ];

  return (
    <aside
  className={`sidebar ${
    sidebarOpen ? "open" : ""
  }`}
>

  {/* Mobile Close Button */}

  <div className="sidebar-mobile-header">
    <button
      className="close-sidebar"
      onClick={() => setSidebarOpen(false)}
    >
      <FaTimes />
    </button>
  </div>

  {/* Logo */}

  <div className="sidebar-logo">
    <FaCoffee className="logo-icon" />
    <h2>CafeFlow</h2>
  </div>

  {/* Navigation */}

  <nav className="sidebar-nav">
    {menuItems.map((item) => (
      <NavLink
        key={item.path}
        to={item.path}
        onClick={() => setSidebarOpen(false)}
        className={({ isActive }) =>
          isActive
            ? "sidebar-item active"
            : "sidebar-item"
        }
      >
        {item.icon}
        <span>{item.title}</span>
      </NavLink>
    ))}
  </nav>

  {/* Logout */}
  <Logout />
</aside>
  );
}

export default Sidebar;