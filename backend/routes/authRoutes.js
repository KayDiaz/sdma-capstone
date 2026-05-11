import express from "express";
import supabase from "../config/supabaseClient.js";

const router = express.Router();

// REGISTER ROUTE
router.post("/register", async (req, res) => {
    try {
        const { fullName, email, password, role, studentId, department } = req.body;


        // 1. Create the user in Supabase Auth using admin API to avoid confirmation email
        const { data: adminData, error: adminError } = await supabase.auth.admin.createUser({
            email,
            password,
            user_metadata: { fullName, role, studentId, department },
            email_confirm: true,
        });

        if (adminError) return res.status(400).json({ message: adminError.message });

        // 2. Insert the profile data into your public.users table (link by the created user's id)
        const userId = adminData.user?.id ?? adminData.id;
        let userProfile = null;
        try {
            const insert = await supabase
                .from("users")
                .insert({
                    id: userId, // Link to the Auth user
                    fullName,
                    email,
                    role,
                    department,
                })
                .select();

            // If insert returns an array (no .single), use first element
            if (insert.error) throw insert.error;
            userProfile = Array.isArray(insert.data) ? insert.data[0] : insert.data;
        } catch (dbErr) {
            // Handle Row-Level Security blocking inserts in development Supabase projects
            console.warn("Failed to insert profile row into users table:", dbErr.message || dbErr);
            // Fallback: use the auth user's metadata as the profile
            const authUser = adminData.user ?? adminData;
            userProfile = {
                id: userId,
                fullName: authUser.user_metadata?.fullName ?? fullName,
                email: authUser.email ?? email,
                role: authUser.user_metadata?.role ?? role,
                department: authUser.user_metadata?.department ?? department,
                note: "profile stored in auth.user_metadata due to RLS on users table",
            };
        }

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

        if (authError) return res.status(400).json({ message: authError.message });

        // 2. Fetch the extra profile data from your public.users table
        console.log("authData from signInWithPassword:", authData);

        const { data: profiles, error: profileError } = await supabase
            .from("users")
            .select("*")
            .eq("id", authData.user.id);

        if (profileError) throw profileError;

        if (!profiles || profiles.length === 0) {
            return res.status(404).json({ message: "No user profile found for this account" });
        }

        if (profiles.length > 1) {
            // Defensive: multiple rows found for the same id — surface for debugging
            return res.status(500).json({ message: "Multiple user profiles found for this id", count: profiles.length, profiles });
        }

        const userProfile = profiles[0];

        // Return the session token (access_token) and user data
        res.status(200).json({
            message: "Login successful",
            token: authData.session?.access_token, // Supabase's built-in JWT
            user: userProfile,
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

export default router;