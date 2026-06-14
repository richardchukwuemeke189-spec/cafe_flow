import express from "express";

import {
  createReservation, updateReservationStatus
} from "../controllers/reservationController.js";

const router = express.Router();

router.post("/", createReservation);
router.patch("/:id/status", updateReservationStatus);

export default router;