import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import metricsRoutes from "./routes/metricsRoutes.js";
import healthRoutes from './routes/healthRoutes.js'
import contactRoutes from './routes/contactRoutes.js'

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Basic health check



// 🔹 /api/metrics endpoint
app.use("/api/metrics",metricsRoutes);
app.use("/api",healthRoutes)
app.use("/api",contactRoutes)

app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
