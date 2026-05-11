import supabase from "../config/supabaseClient.js";

const Users = {
    async getById(id) {
        const { data, error } = await supabase.from("users").select("*").eq("id", id).single();
        if (error) throw error;
        return data;
    },

    async getByEmail(email) {
        const { data, error } = await supabase.from("users").select("*").eq("email", email).single();
        if (error) throw error;
        return data;
    },

    async create(profile) {
        const { data, error } = await supabase
            .from("users")
            .insert(profile)
            .select()
            .single();
        if (error) throw error;
        return data;
    },

    async update(id, updates) {
        const { data, error } = await supabase
            .from("users")
            .update(updates)
            .eq("id", id)
            .select()
            .single();
        if (error) throw error;
        return data;
    },

    async remove(id) {
        const { data, error } = await supabase.from("users").delete().eq("id", id).select().single();
        if (error) throw error;
        return data;
    },
};

export default Users;