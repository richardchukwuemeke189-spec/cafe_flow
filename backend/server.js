import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import contactRoutes from "./routes/contactRoutes.js";
import reservationRoutes from "./routes/reservationRoutes.js";

dotenv.config();

const app = express();

app.use(cors());

app.use(express.json());

app.use(
  "/api/contact",
  contactRoutes
);

app.use(
  "/api/reservations",
  reservationRoutes
);

app.get("/", (req, res) => {
  res.send("Coffee Shop API Running");
});

app.listen(
  process.env.PORT,
  () => {
    console.log(
      `Server running on port ${process.env.PORT}`
    );
  }
);