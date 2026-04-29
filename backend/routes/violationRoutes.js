import express from "express";
import Violation from "../models/Violation.js";
import authMiddleware from "../middleware/authMiddleware.js";
import roleMiddleware from "../middleware/roleMiddleware.js";

const router = express.Router();

// 🔥 CREATE VIOLATION (Professor + Admin)
router.post(
  "/",
  authMiddleware,
  roleMiddleware("professor", "admin"),
  async (req, res) => {
    try {
      const { student, violationType, description } = req.body;

      const violation = await Violation.create({
        student,
        violationType,
        description,
        reportedBy: req.user.id,
      });

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
      const violations = await Violation.find()
        .populate("student", "fullName email")
        .populate("reportedBy", "fullName role");

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
      const violations = await Violation.find({
        student: req.user.id,
      });

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

      const violation = await Violation.findByIdAndUpdate(
        req.params.id,
        {
          severity,
          punishment,
          communityServiceHours,
          status,
        },
        { new: true }
      );

      res.json(violation);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
);

export default router;