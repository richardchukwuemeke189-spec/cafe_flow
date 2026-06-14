import "../adminDashboardStyles/recentReservations.css";
import "../adminDashboardStyles/recentMessages.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

function RecentReservations() {
  const [reservations, setReservations] =
    useState([]);

  useEffect(() => {
    const fetchReservations =
      async () => {
        try {
          const res = await axios.get(
            `${import.meta.env.VITE_API_URL}/api/admin/reservations/recent`
          );

          setReservations(
            res.data.reservations
          );

        } catch (error) {
          console.error(
            "Failed to fetch reservations",
            error
          );
          toast.error("Failed to fetch reservations");
        }
      };

    fetchReservations();
  }, []);

  const getInitials = (name) => {
    if (!name) return "NA";

    return name
      .split(" ")
      .map((word) => word[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <div className="reservation-panel">
      <div className="panel-header">
        <h3>Recent Reservations</h3>

        <Link to='/admin/reservations'>
          <button>
            View All
          </button>
        </Link>
      </div>

      {/* {reservations.map(
        (item, index) => (
          <div
            className="reservation-item"
            key={item.id}
          >
            <div className="avatar">
            {getInitials(item.name)}
          </div>

            <div className="reservation-info">
              <h4>{item.name}</h4>

              <p>
                {item.partySize} People •{" "}
                {item.date} •{" "}
                {item.time}
              </p>
            </div>

            <span
              className={`status ${item.status?.toLowerCase()}`}
            >
              {item.status ||
                "Pending"}
            </span>
          </div>
        )
      )} */}

      {reservations.length === 0 ? (
  <div className="empty-state">
    <p style={{color:'#888'}}>No Reservations</p>
  </div>
) : (
  reservations.map((item, index) => (
    <div
      className="reservation-item"
      key={item.id}
    >
      <div className="avatar">
        {getInitials(item.name)}
      </div>

      <div className="reservation-info">
        <h4>{item.name}</h4>

        <p>
          {item.party_size} People •{" "}
          {item.date} • {item.time}
        </p>
      </div>

      <span
        className={`status ${item.status?.toLowerCase()}`}
      >
        {item.status || "Pending"}
      </span>
    </div>
  ))
)}
    </div>
  );
}

export default RecentReservations;