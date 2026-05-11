import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import roleMiddleware from "../middleware/roleMiddleware.js";
import supabase from "../config/supabaseClient.js";
import Users from "../models/User.js";

const router = express.Router();

// List students (admin)
router.get("/", authMiddleware, roleMiddleware("admin"), async (req, res) => {
  try {
    const { data, error } = await supabase.from("users").select("*").eq("role", "student").order("created_at", { ascending: false });
    if (error) throw error;
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get student by id (admin or self)
router.get("/:id", authMiddleware, async (req, res) => {
  try {
    const { id } = req.params;
    if (req.user.id !== id && req.user.role !== "admin") return res.status(403).json({ message: "Forbidden" });
    const user = await Users.getById(id);
    if (user.role !== "student") return res.status(404).json({ message: "Not a student" });
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update student (self or admin)
router.put("/:id", authMiddleware, async (req, res) => {
  try {
    const { id } = req.params;
    if (req.user.id !== id && req.user.role !== "admin") return res.status(403).json({ message: "Forbidden" });
    const updated = await Users.update(id, req.body);
    res.json(updated);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Delete student (admin)
router.delete("/:id", authMiddleware, roleMiddleware("admin"), async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Users.remove(id);
    res.json(deleted);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
