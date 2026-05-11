import "dotenv/config";
import express from "express";
import cors from "cors";
import authRoutes from "./routes/authRoutes.js";
import authMiddleware from "./middleware/authMiddleware.js";
import roleMiddleware from "./middleware/roleMiddleware.js";
import violationRoutes from './routes/violationRoutes.js';
import usersRoutes from './routes/usersRoutes.js';
import violationsCatalogRoutes from './routes/violationsCatalogRoutes.js';
import communitySessionsRoutes from './routes/communitySessionsRoutes.js';
import logsRoutes from './routes/logsRoutes.js';
import professorsRoutes from './routes/professorsRoutes.js';
import studentsRoutes from './routes/studentsRoutes.js';
import adminsRoutes from './routes/adminsRoutes.js';

const app = express();
app.use(express.json());
app.use(cors());

app.use("/api/auth", authRoutes);
app.use("/api/violations", violationRoutes);
app.use("/api/users", usersRoutes);
app.use("/api/violations/catalog", violationsCatalogRoutes);
app.use("/api/community-sessions", communitySessionsRoutes);
app.use("/api/logs", logsRoutes);
app.use("/api/professors", professorsRoutes);
app.use("/api/students", studentsRoutes);
app.use("/api/admins", adminsRoutes);

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