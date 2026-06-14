import "../adminDashboardStyles/recentMessages.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

function RecentMessages() {
  const [messages, setMessages] =
    useState([]);

  useEffect(() => {
    const fetchMessages =
      async () => {
        try {
          const res = await axios.get(
            `${import.meta.env.VITE_API_URL}/api/admin/messages/recent`
          );

          setMessages(
            res.data.messages
          );

        } catch (error) {
          console.error(
            "Failed to fetch messages",
            error
          );
          toast.error("Failed to fetch messages");
        }
      };

    fetchMessages();
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
    <div className="message-panel">
      <div className="panel-header">
        <h3>Recent Messages</h3>

        <Link to='/admin/messages'>
            <button>
                View All
            </button>
        </Link>
      </div>

      {/* {messages.map((msg) => (
        <div
          className="message-item"
          key={msg.id}
        >
          <div className="avatar">
            {getInitials(msg.name)}
          </div>

          <div className="message-content">
            <h4>{msg.name}</h4>

            <span>
              {msg.subject}
            </span>

            <p>
              {msg.message}
            </p>
          </div>
        </div>
      ))} */}

      {messages.length === 0 ? (
        <div className="empty-state">
            <p style={{color:'#888'}}>No Messages</p>
        </div>
        ) : (
        messages.map((msg) => (
            <div
            className="message-item"
            key={msg.id}
            >
            <div className="avatar">
                {getInitials(msg.name)}
            </div>

            <div className="message-content">
                <h4>{msg.name}</h4>

                <span>{msg.subject}</span>

                <p>{msg.message}</p>
            </div>
            </div>
        ))
        )}
    </div>
  );
}

export default RecentMessages;