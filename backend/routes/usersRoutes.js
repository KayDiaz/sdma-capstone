import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import roleMiddleware from "../middleware/roleMiddleware.js";
import supabase from "../config/supabaseClient.js";
import Users from "../models/User.js";

const router = express.Router();

// List users (admin)
router.get("/", authMiddleware, roleMiddleware("admin"), async (req, res) => {
  try {
    const { role } = req.query;
    let builder = supabase.from("users").select("*").order("created_at", { ascending: false });
    if (role) builder = builder.eq("role", role);
    const { data, error } = await builder;
    if (error) throw error;
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get current user's profile
router.get("/me", authMiddleware, async (req, res) => {
  try {
    const user = await Users.getById(req.user.id);
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get user by id (admin or self)
router.get("/:id", authMiddleware, async (req, res) => {
  try {
    const { id } = req.params;
    if (req.user.id !== id && req.user.role !== "admin") return res.status(403).json({ message: "Forbidden" });
    const user = await Users.getById(id);
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update user (self or admin)
router.put("/:id", authMiddleware, async (req, res) => {
  try {
    const { id } = req.params;
    if (req.user.id !== id && req.user.role !== "admin") return res.status(403).json({ message: "Forbidden" });
    const updates = req.body;
    const updated = await Users.update(id, updates);
    res.json(updated);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Partial update (PATCH) - alias to PUT
router.patch("/:id", authMiddleware, async (req, res) => {
  try {
    const { id } = req.params;
    if (req.user.id !== id && req.user.role !== "admin") return res.status(403).json({ message: "Forbidden" });
    const updates = req.body;
    const updated = await Users.update(id, updates);
    res.json(updated);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create user (admin) - creates profile row; authentication/credentials managed via /auth/register
router.post("/", authMiddleware, roleMiddleware("admin"), async (req, res) => {
  try {
    const created = await Users.create(req.body);
    res.status(201).json(created);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Delete user (admin)
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
