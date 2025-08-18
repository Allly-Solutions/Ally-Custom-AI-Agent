import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import metricsRoutes from "./routes/metricsRoutes.js";
import healthRoutes from './routes/healthRoutes.js'
import contactRoutes from './routes/contactRoutes.js'

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

// Basic health check



// 🔹 /api/metrics endpoint
app.use("/api/metrics",metricsRoutes);
app.use("/api",healthRoutes)
app.use("/api",contactRoutes)

// Catch unknown routes
app.use((req, res) => {
  res.status(404).json({ message: "Not Found" });
});

export default app;
