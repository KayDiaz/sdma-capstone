import express from "express";
import supabase from "../config/supabaseClient.js";

const router = express.Router();

// REGISTER ROUTE
router.post("/register", async (req, res) => {
    try {
        const { fullName, email, password, role, studentId, department } = req.body;

        // 1. Create the user in Supabase Auth (This handles the password)
        const { data: authData, error: authError } = await supabase.auth.signUp({
            email,
            password,
        });

        if (authError) return res.status(400).json({ message: authError.message });

        // 2. Insert the profile data into your public.users table
        const { data: userProfile, error: dbError } = await supabase
            .from("users")
            .insert({
                id: authData.user.id, // Link to the Auth user
                fullName,
                email,
                role,
                department,
            })
            .select()
            .single();

        if (dbError) throw dbError;

        res.status(201).json({
            message: "User registered successfully",
            user: userProfile,
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// LOGIN ROUTE
router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;

        // 1. Log in via Supabase Auth
        const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
            email,
            password,
        });

        if (authError) return res.status(400).json({ message: "Invalid email or password" });

        // 2. Fetch the extra profile data from your public.users table
        const { data: userProfile, error: profileError } = await supabase
            .from("users")
            .select("*")
            .eq("id", authData.user.id)
            .single();

        if (profileError) throw profileError;

        // Return the session token (access_token) and user data
        res.status(200).json({
            message: "Login successful",
            token: authData.session.access_token, // Supabase's built-in JWT
            user: userProfile,
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

export default router;