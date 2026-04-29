import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

const router = express.Router();

router.post("/register", async (req,res) => {
    try {

        const { fullName, email, password, role, studentId, department } = req.body;

        const existingUser = await User.findOne ({ email });

        if (existingUser) {
            return res.status(400).json({ message: "Email already registered"});
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.create ({
            fullName,
            email,
            password:  hashedPassword,
            role,
            studentId,
            department,
        });

        res.status(201).json ({
            message: "User registered successfully",
            user: {
                id: user._id,
                fullName: user.fullName,
                email: user.email,
                role: user.role,
            },
        });
    } catch (error){
        res.status(500).json({ message: error.message});
    }
});

export default router;

router.post("/login", async (req, res) => {
    try {
        const { email, password} = req.body;

        const user = await User.findOne({email});

        if (!user){
            return res.status(400).json({message: "Invalid emal or password"});
        }

        const token = jwt.sign (
            {
                id:user._id,
                role: user.role,
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "1d",
            }
        );

        res.status(200).json({
            message: "Login successful",
            token,
            user: {
                id: user._id,
                fullName: user.fullName,
                email: user.email,
                role: user.role,
                studentId: user.studentId,
                department: user.department,
            },
        });
    } catch (error){
        res.status(500).json({message: error.message});
    }

});