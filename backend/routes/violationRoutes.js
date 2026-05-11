import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import roleMiddleware from "../middleware/roleMiddleware.js";
import supabase from "../config/supabaseClient.js";

const router = express.Router();

// 🔥 CREATE VIOLATION (Professor + Admin)
router.post(
  "/",
  authMiddleware,
  roleMiddleware("professor", "admin"),
  async (req, res) => {
    try {
      const { student, violationType, description } = req.body;

      const { data: violation, error } = await supabase
        .from("violation_record")
        .insert({
          student,
          violationType,
          description,
          reportedBy: req.user.id,
        })
        .select("*")
        .single();

      if (error) {
        throw error;
      }

      res.status(201).json(violation);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
);

// 🔥 GET ALL (Admin only)
router.get(
  "/",
  authMiddleware,
  roleMiddleware("admin"),
  async (req, res) => {
    try {
      const { data: violations, error } = await supabase
        .from("violation_record")
        .select("*, student:student(fullName,email), reportedBy:reportedBy(fullName,role)")
        .order("created_at", { ascending: false });

      if (error) {
        throw error;
      }

      res.json(violations);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
);

// 🔥 STUDENT VIEW OWN RECORDS
router.get(
  "/my-records",
  authMiddleware,
  roleMiddleware("student"),
  async (req, res) => {
    try {
      const { data: violations, error } = await supabase
        .from("violation_record")
        .select("*")
        .eq("student", req.user.id)
        .order("created_at", { ascending: false });

      if (error) {
        throw error;
      }

      res.json(violations);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
);

// 🔥 ADMIN ASSIGN PUNISHMENT
router.put(
  "/:id",
  authMiddleware,
  roleMiddleware("admin"),
  async (req, res) => {
    try {
      const { severity, punishment, communityServiceHours, status } = req.body;

      const { data: violation, error } = await supabase
        .from("violation_record")
        .update({
          severity,
          punishment,
          communityServiceHours,
          status,
        })
        .eq("id", req.params.id)
        .select("*")
        .single();

      if (error) {
        throw error;
      }

      res.json(violation);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
);

export default router;