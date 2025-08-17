import express from "express"; 
import { metrics } from "../controllers/metricsController.js";

const router = express.Router();

router.get("/", metrics);

export default router;