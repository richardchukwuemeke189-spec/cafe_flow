import "../adminDashboardStyles/statsCards.css";
import { useEffect, useState } from "react";
import axios from "axios";

import {
  FaCalendarAlt,
  FaEnvelope,
  FaClock,
} from "react-icons/fa";

function StatsCards() {
  const [stats, setStats] = useState({
    totalReservations: 0,
    totalMessages: 0,
    pendingReservations: 0,
    unreadMessages: 0,
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/admin/stats`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem(
                "adminToken"
              )}`,
            },
          }
        );

        setStats(res.data.stats);
      } catch (error) {
        console.error(
          "Failed to fetch stats",
          error
        );
      }
    };

    fetchStats();
  }, []);

  const cards = [
    {
      // icon: <FaCalendarAlt />,
      icon: <div className="stat-icon"><i class="bi bi-calendar-minus-fill reservation"></i></div>,
      iconClass: "reservation-icon",
      number: stats.totalReservations,
      title: "Total Reservations",
      subtitle: "All Time",
    },
    {
      // icon: <FaEnvelope />,
      icon: <div className="stat-icon"><i class="bi bi-envelope-fill message"></i></div>,
      iconClass: "message-icon",
      number: stats.totalMessages,
      title: "Total Messages",
      subtitle: "All Time",
    },
    {
      // icon: <FaClock />,
      icon: <div className="stat-icon"><i className="bi bi-clock-fill pending"></i></div>,
      iconClass: "pending-icon",
      number: stats.pendingReservations,
      title: "Pending Reservations",
      subtitle: "Upcoming",
    },
    {
      // icon: <FaEnvelope />,
      icon: <div className="stat-icon"><i class="bi bi-envelope-fill unread"></i></div>,
      iconClass: "unread-icon",
      number: stats.unreadMessages,
      title: "Unread Messages",
      subtitle: "New",
    },
  ];

  return (
    <div className="stats-grid">
      {cards.map((item, index) => (
        <div
          className="stat-card"
          key={index}
        >
          <div className={` ${item.iconClass}`}>
            {item.icon}
          </div>

          <div className="stat-content">
            <h2>{item.number}</h2>
            <h4>{item.title}</h4>
            <p>{item.subtitle}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default StatsCards;