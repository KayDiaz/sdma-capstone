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

// Admin: get single log
router.get("/ai-assistant/:id", authMiddleware, roleMiddleware("admin"), async (req, res) => {
  try {
    const { id } = req.params;
    const { data, error } = await AILogs ? AILogs.list({ limit: 1, offset: 0 }) : null; // fallback placeholder
    // prefer direct query to fetch single record
    const resp = await (async () => {
      const { data: row, error: err } = await (await import("../config/supabaseClient.js")).default.from("ai_assistant_logs").select("*").eq("id", id).single();
      if (err) throw err;
      return row;
    })();
    res.json(resp);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Admin: create a log entry (internal/admin)
router.post("/ai-assistant", authMiddleware, roleMiddleware("admin"), async (req, res) => {
  try {
    const { data, error } = await (await import("../config/supabaseClient.js")).default.from("ai_assistant_logs").insert(req.body).select().single();
    if (error) throw error;
    res.status(201).json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Admin: delete a log entry or clear logs
// Admin: delete a single log entry
router.delete("/ai-assistant/:id", authMiddleware, roleMiddleware("admin"), async (req, res) => {
  try {
    const { id } = req.params;
    const { data, error } = await (await import("../config/supabaseClient.js")).default.from("ai_assistant_logs").delete().eq("id", id).select().single();
    if (error) throw error;
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Admin: clear all logs (dangerous)
router.delete("/ai-assistant", authMiddleware, roleMiddleware("admin"), async (req, res) => {
  try {
    const { data, error } = await (await import("../config/supabaseClient.js")).default.from("ai_assistant_logs").delete().neq("id", null).select();
    if (error) throw error;
    res.json({ deleted: data.length });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
