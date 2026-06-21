import express from "express";
import {
  loginAdmin,
  getDashboardStats,
  getRecentReservations,
  getRecentMessages,
  getAllReservations,
  confirmReservation,
  deleteReservation,
  getAllMessages,
  markMessageAsRead,
  markAllMessagesAsRead,
  deleteMessage,
  cancelReservation,
  updateReservationStatus,
  markSelectedMessages,
  deleteSelectedMessages,
} from "../controllers/adminController.js";

const router = express.Router();

/* ================= AUTH ================= */
router.post("/login", loginAdmin);

/* ================= DASHBOARD ================= */
router.get("/stats", getDashboardStats);

/* ================= RESERVATIONS ================= */
router.get("/reservations", getAllReservations);
router.get("/reservations/recent", getRecentReservations);

// router.put("/reservations/:id/status", updateReservationStatus);
router.put("/reservations/:id/status", (req, res, next) => {
  console.log("Reservation status route hit");
  next();
}, updateReservationStatus);

router.patch("/reservations/:id/confirm", confirmReservation);
router.patch("/reservations/:id/cancel", cancelReservation);
router.delete("/reservations/:id", deleteReservation);

/* ================= MESSAGES ================= */
router.get("/messages", getAllMessages);
router.get("/messages/recent", getRecentMessages);

router.patch("/messages/:id/read", markMessageAsRead);
router.patch("/messages/read-all", markAllMessagesAsRead);

/* ================= BULK ACTIONS (IMPORTANT FIX) ================= */
// ⚠️ use POST to avoid route conflicts with :id
router.post("/messages/bulk-read", markSelectedMessages);
router.post("/messages/bulk-delete", deleteSelectedMessages);

/* ================= SINGLE DELETE (KEEP LAST) ================= */
router.delete("/messages/:id", deleteMessage);

export default router;