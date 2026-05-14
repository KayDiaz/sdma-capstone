import express from "express";
import supabase from "../config/supabaseClient.js";
import jwt from "jsonwebtoken";

const router = express.Router();


// REGISTER
router.post("/register", async (req, res) => {
    try {
        // 1. Extract and Normalize Input
        const full_name = req.body?.full_name ?? null;
        const email = req.body?.email ?? null;
        const password = req.body?.password ?? null;
        const role = req.body?.role ?? null;
        const student_id = req.body?.student_id ?? null;
        const department = req.body?.department ?? req.body?.dept ?? null;

        // 2. Initial Validation
        const requiredMissing = [];
        if (!full_name) requiredMissing.push("full_name");
        if (!email) requiredMissing.push("email");
        if (!password) requiredMissing.push("password");
        if (!role) requiredMissing.push("role");
        
        if (requiredMissing.length) {
            return res.status(400).json({ 
                message: `Missing required fields: ${requiredMissing.join(", ")}` 
            });
        }

        // Normalize role values
        const normalizeRole = (r) => {
            if (!r) return r;
            const lowered = String(r).toLowerCase();
            if (lowered === "prof" || lowered === "teacher") return "professor";
            if (lowered === "admin" || lowered === "administrator") return "admin";
            if (lowered === "student" || lowered === "stud") return "student";
            return lowered;
        };
        const normalizedRole = normalizeRole(role);

        // --- THE "GHOST USER" FIX ---
        // Check for student_id BEFORE hitting Supabase Auth and validate format only for students
        if (normalizedRole === "student") {
            if (!student_id) {
                return res.status(400).json({
                    message: "student_id is required when role is 'student'",
                });
            }

            const studentIdRegex = /^\d{2}-\d{5}-\d{3}$/;
            if (!studentIdRegex.test(student_id)) {
                return res.status(400).json({
                    message: "Invalid Student ID format. Expected format: 00-00000-000",
                });
            }
        }

        const dept = typeof department === "string" ? department.trim() : department;

        // 3. Create the user in Supabase Auth
        // Using admin API so the account is auto-confirmed
        const { data: adminData, error: adminError } = await supabase.auth.admin.createUser({
            email,
            password,
            user_metadata: { full_name, role: normalizedRole, student_id, department: dept },
            email_confirm: true,
        });

        if (adminError) return res.status(400).json({ message: adminError.message });

        const userId = adminData.user?.id ?? adminData.id;
        let userProfile = null;

        // 4. Create/Sync the Profile in public.users
        try {
            const payload = {
                id: userId,
                full_name,
                email,
                role: normalizedRole,
                department: dept,
                // If you have a student_id column in public.users, add it here:
                // student_id: student_id 
            };

            const { data: upserted, error: upsertErr } = await supabase
                .from("users")
                .upsert(payload, { onConflict: "id" })
                .select()
                .single();

            if (upsertErr) throw upsertErr;

            userProfile = {
                id: upserted.id,
                fullName: upserted.full_name,
                email: upserted.email,
                role: upserted.role,
                department: upserted.department,
                createdAt: upserted.created_at,
                updatedAt: upserted.updated_at,
            };
        } catch (dbErr) {
            console.warn("DB Sync Failed:", dbErr.message);
            // Fallback to Auth metadata if DB insert fails (e.g., RLS issues)
            const authUser = adminData.user ?? adminData;
            userProfile = {
                id: userId,
                fullName: authUser.user_metadata?.full_name ?? full_name,
                email: authUser.email ?? email,
                role: authUser.user_metadata?.role ?? normalizedRole,
                department: authUser.user_metadata?.department ?? dept,
                note: "Profile synced from Auth metadata (DB entry failed)",
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

// LOGIN
router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) return res.status(400).json({ message: "Missing email or password" });

        // 1. Log in via Supabase Auth
        const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
            email,
            password,
        });

        if (authError) return res.status(400).json({ message: authError.message });

        // 2. Fetch the extra profile data from your public.users table
        const { data: profiles, error: profileError } = await supabase
            .from("users")
            .select("*")
            .eq("id", authData.user.id);

        if (profileError) throw profileError;

        if (!profiles || profiles.length === 0) {
            // Fallback: if no profile row exists (RLS or missing insert), use auth user metadata
            const authUser = authData.user ?? authData;
            const fallbackProfile = {
                id: authUser.id,
                fullName: authUser.user_metadata?.full_name ?? null,
                email: authUser.email ?? email,
                role: authUser.user_metadata?.role ?? null,
                department: authUser.user_metadata?.department ?? null,
                note: "profile taken from auth.user_metadata due to missing users row",
            };

            const appTokenFallback = jwt.sign(
                { id: fallbackProfile.id, email: fallbackProfile.email, role: fallbackProfile.role },
                process.env.JWT_SECRET,
                { expiresIn: "1h" }
            );

            return res.status(200).json({
                message: "Login successful (profile from auth metadata)",
                token: appTokenFallback,
                supabaseToken: authData.session?.access_token,
                user: fallbackProfile,
            });
        }

        if (profiles.length > 1) {
            return res.status(500).json({ message: "Multiple user profiles found for this id", count: profiles.length, profiles });
        }

        const userProfile = profiles[0];

        // Map DB snake_case fields to camelCase for the API response
        const mappedUser = {
            id: userProfile.id,
            fullName: userProfile.full_name ?? userProfile.fullName,
            email: userProfile.email,
            role: userProfile.role,
            department: userProfile.department,
            createdAt: userProfile.created_at,
            updatedAt: userProfile.updated_at,
        };

        const appToken = jwt.sign(
            { id: mappedUser.id, email: mappedUser.email, role: mappedUser.role },
            process.env.JWT_SECRET,
            { expiresIn: "1h" }
        );

        res.status(200).json({
            message: "Login successful",
            token: appToken,
            supabaseToken: authData.session?.access_token,
            user: mappedUser,
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

export default router;