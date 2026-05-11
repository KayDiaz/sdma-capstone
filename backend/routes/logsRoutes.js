import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import roleMiddleware from "../middleware/roleMiddleware.js";
import AILogs from "../models/AILogs.js";

const router = express.Router();

// Admin: list AI assistant logs
router.get("/ai-assistant", authMiddleware, roleMiddleware("admin"), async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 100;
    const offset = parseInt(req.query.offset) || 0;
    const logs = await AILogs.list({ limit, offset });
    res.json(logs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
