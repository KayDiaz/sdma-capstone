import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import roleMiddleware from "../middleware/roleMiddleware.js";
import ViolationsCatalog from "../models/ViolationsCatalog.js";

const router = express.Router();

// Public: list catalog
router.get("/", authMiddleware, async (req, res) => {
  try {
    const items = await ViolationsCatalog.list();
    res.json(items);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Admin: create catalog entry
router.post("/", authMiddleware, roleMiddleware("admin"), async (req, res) => {
  try {
    const item = await ViolationsCatalog.create(req.body);
    res.status(201).json(item);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Admin: update
router.put("/:id", authMiddleware, roleMiddleware("admin"), async (req, res) => {
  try {
    const updated = await ViolationsCatalog.update(req.params.id, req.body);
    res.json(updated);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Admin: delete
router.delete("/:id", authMiddleware, roleMiddleware("admin"), async (req, res) => {
  try {
    const deleted = await ViolationsCatalog.remove(req.params.id);
    res.json(deleted);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
