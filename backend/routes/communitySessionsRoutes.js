import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import roleMiddleware from "../middleware/roleMiddleware.js";
import CommunitySessions from "../models/CommunitySessions.js";

const router = express.Router();

// List sessions (admin or filtering by student)
router.get("/", authMiddleware, roleMiddleware("admin"), async (req, res) => {
  try {
    const items = await CommunitySessions.list(req.query);
    res.json(items);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create a session (admin)
router.post("/", authMiddleware, roleMiddleware("admin"), async (req, res) => {
  try {
    const created = await CommunitySessions.create(req.body);
    res.status(201).json(created);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update session (admin)
router.put("/:id", authMiddleware, roleMiddleware("admin"), async (req, res) => {
  try {
    const updated = await CommunitySessions.update(req.params.id, req.body);
    res.json(updated);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get session by id (admin)
router.get("/:id", authMiddleware, roleMiddleware("admin"), async (req, res) => {
  try {
    const item = await CommunitySessions.getById(req.params.id);
    res.json(item);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Partial update (PATCH)
router.patch("/:id", authMiddleware, roleMiddleware("admin"), async (req, res) => {
  try {
    const updated = await CommunitySessions.update(req.params.id, req.body);
    res.json(updated);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Delete session (admin)
router.delete("/:id", authMiddleware, roleMiddleware("admin"), async (req, res) => {
  try {
    const deleted = await CommunitySessions.remove(req.params.id);
    res.json(deleted);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
