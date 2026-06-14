import { useEffect, useState } from "react";
import axios from "axios";
import "../adminDashboardStyles/reservationAndMessage.css";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
import "../styles/adminDashboard.css";
import { toast } from "react-toastify";

function ReservationsPage(){
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [reservations, setReservations] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const [statusFilter, setStatusFilter] = useState("All Status");
    const [dateFilter, setDateFilter] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const reservationsPerPage = 5;
    const [loadingId, setLoadingId] = useState(null);
    const [loadingAction, setLoadingAction] = useState(null);

    // ===== fetch reservation =====
    const fetchReservations = async () => {
        try {
            const res = await axios.get(
            `${import.meta.env.VITE_API_URL}/api/admin/reservations`
            );

            setReservations(
            res.data.reservations
            );

        } catch (error) {
            console.error(error);
            toast.error("Failed to fetch reservations");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchReservations();
    }, []);


    // ===== confirm reservation =====
    const confirmReservation =
    async (id) => {
        try {
        await axios.patch(
            `${import.meta.env.VITE_API_URL}/api/admin/reservations/${id}/confirm`
        );

        fetchReservations();

        } catch (error) {
        console.error(error);
        }
    };

    // ===== delete reservation =====
    const deleteReservation =
    async (id) => {

        if (
        !window.confirm(
            "Delete this reservation?"
        )
        ) {
        return;
        }

        try {
        await axios.delete(
            `${import.meta.env.VITE_API_URL}/api/admin/reservations/${id}`
        );

        fetchReservations();

        } catch (error) {
        console.error(error);
        }
    };

    // ===== cancel reservation =====
    const cancelReservation =
    async (id) => {
        try {
        await axios.patch(
            `${import.meta.env.VITE_API_URL}/api/admin/reservations/${id}/cancel`
        );

        fetchReservations();

        } catch (error) {
        console.error(error);
        }
    };

    // ===== filter =====
    const filteredReservations =
    reservations.filter(
        (reservation) => {

        const matchesSearch =
            reservation.name
            ?.toLowerCase()
            .includes(
                searchTerm.toLowerCase()
            ) ||

            reservation.email
            ?.toLowerCase()
            .includes(
                searchTerm.toLowerCase()
            ) ||

            reservation.phone
            ?.toLowerCase()
            .includes(
                searchTerm.toLowerCase()
            );

        const matchesStatus =
            statusFilter ===
            "All Status" ||
            reservation.status ===
            statusFilter;

        const matchesDate =
            !dateFilter ||
            reservation.date ===
            dateFilter;

        return (
            matchesSearch &&
            matchesStatus &&
            matchesDate
        );
        }
    );

    // ========================================
    const indexOfLastReservation =
    currentPage *
    reservationsPerPage;

    const indexOfFirstReservation =
    indexOfLastReservation -
    reservationsPerPage;

    const currentReservations =
    filteredReservations.slice(
        indexOfFirstReservation,
        indexOfLastReservation
    );

    const totalPages = Math.ceil(
    filteredReservations.length /
    reservationsPerPage
    );

    const updateStatus = async (
        id,
        status
    ) => {
    try {
        setLoadingAction(
        `${id}-${status}`
        );

        await axios.put(
        `${import.meta.env.VITE_API_URL}/api/admin/reservations/${id}/status`,
        { status }
        );

        fetchReservations();

        toast.success(
        `Reservation ${status.toLowerCase()}`
        );

    } catch (error) {
        console.error(error);

        toast.error(
        "Failed to update reservation"
        );
    } finally {
        setLoadingAction(null);
    }
    };

    return(
        <>
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
                        <div className="reservations-container">
                            <div className="reservations-header">
                                <div>
                                <h2>Reservations</h2>
                                <p>Manage all customer reservations</p>
                                </div>
                            </div>

                            <div className="reservation-card">
                                {/* Filters */}
                                <div className="reservation-filters">
                                    <input
                                    type="date"
                                    className="filter-input"
                                    value={dateFilter}
                                    onChange={(e) =>
                                        setDateFilter(e.target.value)
                                    }
                                    />

                                    <select
                                    className="filter-select"
                                    value={statusFilter}
                                    onChange={(e) =>
                                        setStatusFilter(e.target.value)
                                    }
                                    >
                                    <option>All Status</option>
                                    <option>Pending</option>
                                    <option>Confirmed</option>
                                    <option>Cancelled</option>
                                    </select>

                                    <input
                                    type="text"
                                    placeholder="Search by name, email or phone..."
                                    className="search-input"
                                    value={searchTerm}
                                    onChange={(e) =>
                                        setSearchTerm(e.target.value)
                                    }
                                    />
                                </div>

                                {/* Table */}
                                <div className="table-wrapper">
                                <table className="reservation-table">
                                    <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>Customer</th>
                                        <th>Contact</th>
                                        <th>Date</th>
                                        <th>Time</th>
                                        <th>Guests</th>
                                        <th>Status</th>
                                        <th>Special Request</th>
                                        <th>Actions</th>
                                    </tr>
                                    </thead>

                                    <tbody>
                                        {currentReservations.length === 0 ? (
                                            <tr>
                                            <td colSpan="9" className="empty-table">
                                                No Reservations Found
                                            </td>
                                            </tr>
                                        ) : (
                                            currentReservations.map(
                                            (reservation, index) => (
                                                <tr key={reservation.id}>
                                                <td>{index + 1}</td>

                                                <td>{reservation.name}</td>

                                                <td>
                                                    {reservation.email}
                                                    <br />
                                                    {reservation.phone}
                                                </td>

                                                <td>{reservation.date}</td>

                                                <td>{reservation.time}</td>

                                                <td>{reservation.party_size}</td>

                                                <td>
                                                    <span
                                                    className={`status ${reservation.status?.toLowerCase()}`}
                                                    >
                                                    {reservation.status}
                                                    </span>
                                                </td>

                                                <td>
                                                    {reservation.special_request}
                                                </td>

                                                <td className="actions">
                                                <button
                                                    disabled={!!loadingAction}
                                                    onClick={() =>
                                                        updateStatus(
                                                        reservation.id,
                                                        "Confirmed"
                                                        )
                                                    }
                                                    >
                                                    {loadingAction ===
                                                    `${reservation.id}-Confirmed` ? (
                                                        <div className="action-loader"></div>
                                                    ) : (
                                                        <i
                                                        className="bi bi-check-circle-fill"
                                                        style={{ color: "green" }}
                                                        ></i>
                                                    )}
                                                </button>

                                                <button
                                                    disabled={!!loadingAction}
                                                    onClick={() =>
                                                        updateStatus(
                                                        reservation.id,
                                                        "Cancelled"
                                                        )
                                                    }
                                                    >
                                                    {loadingAction ===
                                                    `${reservation.id}-Cancelled` ? (
                                                        <div className="action-loader"></div>
                                                    ) : (
                                                        <i
                                                        className="bi bi-x-circle-fill"
                                                        style={{ color: "#F59E0B" }}
                                                        ></i>
                                                    )}
                                                </button>

                                                <button
                                                    onClick={() =>
                                                    deleteReservation(
                                                        reservation.id
                                                    )
                                                    }
                                                >
                                                    <i className="bi bi-trash3-fill" style={{color:'red'}}></i>
                                                </button>
                                                </td>
                                            </tr>
                                        )
                                        )
                                    )}
                                    </tbody>
                                </table>
                                </div>

                                <div className="table-footer">
                                    <span>
                                        Showing{" "}
                                        {filteredReservations.length === 0
                                            ? 0
                                            : indexOfFirstReservation + 1}
                                        {" - "}
                                        {Math.min(
                                            indexOfLastReservation,
                                            filteredReservations.length
                                        )}
                                        {" of "}
                                        {filteredReservations.length}
                                        {" reservations"}
                                    </span>

                                    <div className="pagination">
                                        <button
                                            disabled={currentPage === 1}
                                            onClick={() =>
                                            setCurrentPage(currentPage - 1)
                                            }
                                        >
                                            {"<"}
                                        </button>

                                        {Array.from(
                                            { length: totalPages },
                                            (_, index) => (
                                            <button
                                                key={index + 1}
                                                className={
                                                currentPage === index + 1
                                                    ? "active"
                                                    : ""
                                                }
                                                onClick={() =>
                                                setCurrentPage(index + 1)
                                                }
                                            >
                                                {index + 1}
                                            </button>
                                            )
                                        )}

                                        <button
                                            disabled={
                                            currentPage === totalPages
                                            }
                                            onClick={() =>
                                            setCurrentPage(currentPage + 1)
                                            }
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
        </>
    )
}

export default ReservationsPage;