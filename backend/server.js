import "dotenv/config";
import express from "express";
import cors from "cors";
import authRoutes from "./routes/authRoutes.js";
import authMiddleware from "./middleware/authMiddleware.js";
import roleMiddleware from "./middleware/roleMiddleware.js";
import violationRoutes from './routes/violationRoutes.js';

const app = express();
app.use(express.json());
app.use(cors());

app.use("/api/auth", authRoutes);
app.use("/api/violations", violationRoutes);

app.get(
  "/admin",
  authMiddleware,
  roleMiddleware("admin"),
  (req, res) => {
    res.json({ message: "Welcome Admin"});
  }
);

app.get(
  "/student",
  authMiddleware,
  roleMiddleware("student"),
  (req, res) => {
    res.json({ message: "Welcome Student"});
  }
);

app.get(
  "/professor",
  authMiddleware,
  roleMiddleware("professor"),
  (req, res) => {
    res.json({ message: "Welcome Professor"});
  }
);

app.get("/protected", authMiddleware, (req, res) => {
  res.json({
    message: "You are authorized",
    user: req.user,
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on port ${PORT}`);
});