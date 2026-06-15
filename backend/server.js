import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import contactRoutes from "./routes/contactRoutes.js";
import reservationRoutes from "./routes/reservationRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";

dotenv.config();

const app = express();

const PORT = process.env.PORT || 5000;

// =====================================
// Middleware
// =====================================
app.use(
  cors({
    origin: [
      "http://localhost:5173",

      "https://cafeflow-app.netlify.app",
    ],
    credentials: true,
  })
);

app.use(express.json());

// =====================================
// Routes
// =====================================
app.use(
  "/api/contact",
  contactRoutes
);

app.use(
  "/api/reservations",
  reservationRoutes
);

app.use(
  "/api/admin",
  adminRoutes
);

// =====================================
// Health Check
// =====================================
app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "CafeFlow API Running",
  });
});

// =====================================
// 404 Handler
// =====================================
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
  });
});

// =====================================
// Global Error Handler
// =====================================
app.use(
  (
    err,
    req,
    res,
    next
  ) => {
    console.error(err);

    res.status(500).json({
      success: false,
      message:
        "Internal Server Error",
    });
  }
);

// =====================================
// Start Server
// =====================================
app.listen(PORT, () => {
  console.log(
    `Server running on port ${PORT}`
  );
});