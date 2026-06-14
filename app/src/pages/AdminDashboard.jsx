import { useState } from "react";

import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
import StatsCards from "../components/StatsCards";
import RecentReservations from "../components/RecentReservations";
import RecentMessages from "../components/RecentMessages";

import "../styles/adminDashboard.css";

function AdminDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="dashboard">
      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div
          className="sidebar-overlay"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <Sidebar
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
      />

      {/* Main Content */}
        <main className="main-content">
            <Topbar setSidebarOpen={setSidebarOpen} />

            <div className="dashboard-body">
                <StatsCards />

                <div className="dashboard-content">
                <RecentReservations />
                <RecentMessages />
                </div>
            </div>
        </main>
    </div>
  );
}

export default AdminDashboard;