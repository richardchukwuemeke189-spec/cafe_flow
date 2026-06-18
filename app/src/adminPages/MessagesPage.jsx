import { useState, useEffect } from "react";
import axios from "axios";
import "../adminDashboardStyles/reservationAndMessage.css";

import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
import { toast } from "react-toastify";

function MessagesPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All Status");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedMessages, setSelectedMessages] = useState([]);

  const messagesPerPage = 5;

  useEffect(() => {
    fetchMessages();
  }, []);

  // ================= FETCH MESSAGES
  const fetchMessages = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/admin/messages`
      );

      setMessages(res.data.messages);
    } catch (error) {
      console.error(error);
      toast.error("Failed to fetch messages");
    }
  };

  // ================= MARK ONE AS READ
  const markAsRead = async (id) => {
    try {
      await axios.patch(
        `${import.meta.env.VITE_API_URL}/api/admin/messages/${id}/read`
      );

      fetchMessages();
    } catch (error) {
      console.error(error);
    }
  };

  // ================= MARK ALL AS READ
  const markAllAsRead = async () => {
    try {
      await axios.patch(
        `${import.meta.env.VITE_API_URL}/api/admin/messages/read-all`
      );

      fetchMessages();
    } catch (error) {
      console.error(error);
    }
  };

  // ================= DELETE MESSAGE
  const deleteMessage = async (id) => {
    if (!window.confirm("Delete this message?")) return;

    try {
      await axios.delete(
        `${import.meta.env.VITE_API_URL}/api/admin/messages/${id}`
      );

      fetchMessages();
    } catch (error) {
      console.error(error);
    }
  };

  // ================= BULK MARK AS READ
  const markSelectedAsRead = async () => {
    try {
      await axios.patch(
        `${import.meta.env.VITE_API_URL}/api/admin/messages/mark-selected`,
        { ids: selectedMessages }
      );

      setSelectedMessages([]);
      fetchMessages();
    } catch (error) {
      console.error(error);
    }
  };

  // ================= TOGGLE SELECTION
  const toggleSelect = (id) => {
    setSelectedMessages((prev) =>
      prev.includes(id)
        ? prev.filter((item) => item !== id)
        : [...prev, id]
    );
  };

  // ================= FILTER + SEARCH
  const filteredMessages = messages
    .filter((message) => {
      const matchesSearch =
        message.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        message.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        message.subject?.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesStatus =
        statusFilter === "All Status" ||
        (statusFilter === "Read" && message.is_read) ||
        (statusFilter === "Unread" && !message.is_read);

      return matchesSearch && matchesStatus;
    })
    .sort((a, b) => {
      if (a.is_read !== b.is_read) {
        return a.is_read ? 1 : -1;
      }
      return new Date(b.created_at) - new Date(a.created_at);
    });

  // ================= PAGINATION
  const indexOfLastMessage = currentPage * messagesPerPage;
  const indexOfFirstMessage = indexOfLastMessage - messagesPerPage;

  const currentMessages = filteredMessages.slice(
    indexOfFirstMessage,
    indexOfLastMessage
  );

  const totalPages = Math.ceil(filteredMessages.length / messagesPerPage);

    const deleteSelectedMessages = async () => {
    try {
        const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/admin/messages/bulk-delete`,
        { ids: selectedMessages }
        );

        console.log("DELETE RESPONSE:", res.data);

        setSelectedMessages([]);
        fetchMessages();
        toast.success("Deleted successfully");
    } catch (error) {
        console.error("DELETE ERROR:", error.response?.data || error.message);
        toast.error(error.response?.data?.error || "Failed to delete messages");
    }
    };

    // ===========================
    const initials = (name) => {
    if (!name) return "NA";

    return name
      .split(" ")
      .map((word) => word[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <div className="dashboard">
      {sidebarOpen && (
        <div
          className="sidebar-overlay"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <Sidebar
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
      />

      <main className="main-content">
        <Topbar setSidebarOpen={setSidebarOpen} />

        <div className="dashboard-body">
          <div className="messages-container">

            <div className="messages-header">
              <div>
                <h2>Messages</h2>
                <p>Manage all customer messages</p>
              </div>
            </div>

            <div className="messages-card">

              {/* FILTERS */}
              <div className="message-filters">
                <select
                  className="message-select"
                  value={statusFilter}
                  onChange={(e) => {
                    setStatusFilter(e.target.value);
                    setCurrentPage(1);
                  }}
                >
                  <option>All Status</option>
                  <option>Read</option>
                  <option>Unread</option>
                </select>

                <input
                  type="text"
                  placeholder="Search by name, email or subject..."
                  className="message-search"
                  value={searchTerm}
                  onChange={(e) => {
                    setSearchTerm(e.target.value);
                    setCurrentPage(1);
                  }}
                />

                <button
                  className="mark-read-btn"
                  onClick={markAllAsRead}
                >
                  Mark all as read
                </button>

                {/* {selectedMessages.length > 0 && (
                  <button
                    className="mark-read-btn"
                    onClick={markSelectedAsRead}
                  >
                    Mark Selected ({selectedMessages.length})
                  </button>

                  
                )} */}

                {selectedMessages.length > 0 && (
                    <>
                        <button
                        className="mark-read-btn"
                        onClick={markSelectedAsRead}
                        >
                        Mark Selected ({selectedMessages.length})
                        </button>

                        <button
                        className="delete-btn"
                        onClick={deleteSelectedMessages}
                        style={{ background: "#EE1D51", marginLeft: "10px", color:"white", borderRadius:'10px', border:'none', padding:'0px 10px' }}
                        >
                        Delete Selected ({selectedMessages.length})
                        </button>
                    </>
                )}
              </div>

              {/* TABLE */}
              <div className="table-wrapper">
                <table className="message-table">
                  <thead>
                    <tr>
                      <th>
                        <input
                          type="checkbox"
                          checked={
                            currentMessages.length > 0 &&
                            currentMessages.every((m) =>
                              selectedMessages.includes(m.id)
                            )
                          }
                          onChange={(e) => {
                            if (e.target.checked) {
                              setSelectedMessages(
                                currentMessages.map((m) => m.id)
                              );
                            } else {
                              setSelectedMessages([]);
                            }
                          }}
                        />
                      </th>
                      <th>Sender</th>
                      <th>Subject</th>
                      <th>Message</th>
                      <th>Date</th>
                      <th>Status</th>
                      <th>Actions</th>
                    </tr>
                  </thead>

                  <tbody>
                    {currentMessages.length === 0 ? (
                        <tr>
                        <td colSpan="7" className="empty-table">
                            No Messages Found
                        </td>
                        </tr>
                    ) : (
                        currentMessages.map((message) => (
                        <tr key={message.id}>
                          <td>
                            <input
                              type="checkbox"
                              checked={selectedMessages.includes(message.id)}
                              onChange={() => toggleSelect(message.id)}
                            />
                          </td>

                          <td>
                            <div className="sender-info">
                              <div className="avatar" style={{ color: "white" }}>
                                {initials(message.name)}
                              </div>

                              <div>
                                <h4>{message.name}</h4>
                                <p>{message.email}</p>
                              </div>
                            </div>
                          </td>

                          <td>{message.subject}</td>

                          <td className="message-preview">
                            {message.message}
                          </td>

                          <td>
                            {new Date(message.created_at).toLocaleDateString()}
                          </td>

                          <td>
                            <span
                              className={`message-status ${
                                message.is_read ? "read" : "unread"
                              }`}
                            >
                              {message.is_read ? "Read" : "Unread"}
                            </span>
                          </td>

                          <td className="message-actions">
                            <button onClick={() => markAsRead(message.id)}>
                              <i className="bi bi-eye-fill"></i>
                            </button>

                            <button onClick={() => deleteMessage(message.id)}>
                              <i
                                className="bi bi-trash3-fill"
                                style={{ color: "red" }}
                              ></i>
                            </button>
                          </td>
                        </tr>
      
                        ))
                    )}
                    </tbody>
                </table>
              </div>

              {/* PAGINATION */}
              <div className="table-footer">
                <span>
                  Showing{" "}
                  {filteredMessages.length === 0
                    ? 0
                    : indexOfFirstMessage + 1}{" "}
                  -{" "}
                  {Math.min(indexOfLastMessage, filteredMessages.length)} of{" "}
                  {filteredMessages.length} messages
                </span>

                <div className="pagination">
                  <button
                    disabled={currentPage === 1}
                    onClick={() => setCurrentPage(currentPage - 1)}
                  >
                    {"<"}
                  </button>

                  {Array.from({ length: totalPages }, (_, index) => (
                    <button
                      key={index + 1}
                      className={currentPage === index + 1 ? "active" : ""}
                      onClick={() => setCurrentPage(index + 1)}
                    >
                      {index + 1}
                    </button>
                  ))}

                  <button
                    disabled={currentPage === totalPages}
                    onClick={() => setCurrentPage(currentPage + 1)}
                  >
                    {">"}
                  </button>
                </div>
              </div>

            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default MessagesPage;