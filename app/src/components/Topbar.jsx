import { useState, useEffect } from "react";
import "../adminDashboardStyles/topBar.css";
import axios from "axios";
import { supabase } from "../supabaseClient";
import { useNavigate } from "react-router-dom";

import {
  FaBell,
  FaChevronDown,
  FaBars,
  FaUser,
  FaCog,
  FaSignOutAlt,
} from "react-icons/fa";

function Topbar({ setSidebarOpen }) {
    const [showProfileMenu, setShowProfileMenu] = useState(false);
    const [showNotifications, setShowNotifications] = useState(false);
    const [unreadCount, setUnreadCount] = useState(0);
    const [notifications, setNotifications] = useState([]);
    const navigate = useNavigate();
  
  const [admin] = useState({
      name: "Cafe Owner",
      role: "Administrator",
    });

    useEffect(() => {
        fetchUnreadCount();
        fetchNotifications();

        const contactsChannel = supabase
            .channel("contacts-realtime")
            .on(
            "postgres_changes",
            {
                event: "*",
                schema: "public",
                table: "contacts",
            },
            () => {
                fetchUnreadCount();
            }
            )
        .subscribe();

        const reservationsChannel = supabase
        .channel("reservations-realtime")
        .on(
            "postgres_changes",
            {
            event: "*",
            schema: "public",
            table: "reservations",
            },
            () => {
            fetchUnreadCount();
            fetchNotifications();
            }
        )
        .subscribe();

        return () => {
            supabase.removeChannel(
            contactsChannel
            );

            supabase.removeChannel(
            reservationsChannel
            );
        };
    }, []);

    // ======================================
    const fetchNotifications = async () => {
    try {
        const [messagesRes, reservationsRes] =
        await Promise.all([
            axios.get(
            `${import.meta.env.VITE_API_URL}/api/admin/messages`
            ),
            axios.get(
            `${import.meta.env.VITE_API_URL}/api/admin/reservations`
            ),
        ]);

        const messageNotifications =
        messagesRes.data.messages
            .filter((msg) => !msg.is_read)
            .map((msg) => ({
            id: msg.id,
            type: "message",
            title: msg.name,
            text: msg.subject,
            created_at: msg.created_at,
            }));

        const reservationNotifications =
        reservationsRes.data.reservations
            .filter(
            (res) =>
                res.status === "pending"
            )
            .map((res) => ({
            id: res.id,
            type: "reservation",
            title: res.name,
            text: `${res.party_size} guests`,
            created_at: res.created_at,
            }));

        const combined = [
        ...messageNotifications,
        ...reservationNotifications,
        ].sort(
        (a, b) =>
            new Date(b.created_at) -
            new Date(a.created_at)
        );

        setNotifications(combined);
    } catch (error) {
        console.error(error);
    }
    };

    const fetchUnreadCount = async () => {
    try {
        const [messagesRes, reservationsRes] = await Promise.all([
        axios.get(`${import.meta.env.VITE_API_URL}/api/admin/messages`),
        axios.get(`${import.meta.env.VITE_API_URL}/api/admin/reservations`),
        ]);

        const unreadMessages = messagesRes.data.messages.filter(
        (m) => !m.is_read
        ).length;

        const pendingReservations = reservationsRes.data.reservations.filter(
        (r) => r.status === "pending"
        ).length;

        setUnreadCount(unreadMessages + pendingReservations);
    } catch (error) {
        console.error("Failed to fetch unread count", error);
    }
    };

    // ======================================
    const formatTimeAgo = (date) => {
    const seconds =
        Math.floor(
        (new Date() - new Date(date)) /
        1000
        );

        const minutes =
            Math.floor(seconds / 60);

        const hours =
            Math.floor(minutes / 60);

        const days =
            Math.floor(hours / 24);

        if (seconds < 60)
            return "Just now";

        if (minutes < 60)
            return `${minutes} min${
            minutes > 1 ? "s" : ""
            } ago`;

        if (hours < 24)
            return `${hours} hour${
            hours > 1 ? "s" : ""
            } ago`;

        return `${days} day${
            days > 1 ? "s" : ""
        } ago`;
    };

    // ============================================
    const handleNotificationClick = (
    notification
    ) => {
    setShowNotifications(false);

    if (
        notification.type ===
        "message"
    ) {
        navigate("/admin/messages");
    } else {
        navigate(
        "/admin/reservations"
        );
    }
    };

    // ====================================
    const markAllNotificationsRead =
    async () => {
        try {
        await axios.put(
            `${import.meta.env.VITE_API_URL}/api/admin/messages/read-all`
        );

        fetchUnreadCount();
        fetchNotifications();

        } catch (error) {
        console.error(error);
        }
    };
    
    return (
        <header className="topbar">
      {/* Left Section */}
      <div className="topbar-left">
        <button
          className="admin-menu-btn"
          onClick={() => setSidebarOpen(true)}
        >
          <i className="bi bi-list" style={{color:'black', fontSize:'20px'}}></i>
        </button>

        <h2>Dashboard</h2>
      </div>

      {/* Right Section */}
      <div className="topbar-right">
        {/* Notifications */}
        <div 
            className="notification"
            onClick={() =>
                setShowNotifications(
                !showNotifications
                )
            }
        >
            <i className="bi bi-bell-fill" style={{color: "black", fontSize: "20px"}}></i>

            {showNotifications && (
            <div className="notification-dropdown">
                <div className="notification-header">
                    <h4>Notifications</h4>

                    <button
                        onClick={
                        markAllNotificationsRead
                        }
                        style={{color:'black', padding:'5px', borderRadius:'10px', background:'whitesmoke', border:'none', fontWeight:'500'}}
                    >
                        Mark all read
                    </button>
                </div>

                {notifications.length === 0 ? (
                <p className="empty-notification">
                    No new notifications
                </p>
                ) : (
                notifications.slice(0, 10).map((item) => (
                    <div
                        key={`${item.type}-${item.id}`}
                        className="notification-item"
                        onClick={() =>
                            handleNotificationClick(item)
                        }
                        >
                        <strong>
                            {item.type === "message" ? <div><i className="bi bi-envelope-open-fill"></i> <span>Message</span></div> : <div><i className="bi bi-envelope-open-fill"></i> <span>Reservation</span></div>}
                        </strong>

                        <p>{item.text}</p>

                        <small>
                            {formatTimeAgo(
                            item.created_at
                            )}
                        </small>
                    </div>
                ))
                )}
            </div>
        )}

        {unreadCount > 0 && (
            <span className="notification-badge">
                {unreadCount}
            </span>
        )}
        </div>

        {/* User Profile */}
        <div
          className="user-profile"
          onClick={() =>
            setShowProfileMenu(!showProfileMenu)
          }
        >
          <img
            src="https://i.pinimg.com/1200x/c8/ec/05/c8ec0552d878e70bd29c25d0957a6faf.jpg"
            alt="Cafe Owner"
          />

          <div className="user-details">
            <h4>{admin?.name}</h4>
            <p>{admin?.role}</p>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Topbar;