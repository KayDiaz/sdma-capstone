import supabase from "../config/supabaseClient.js";

const Violations = {
    async create(payload) {
        const { data, error } = await supabase
            .from("violations")
            .insert(payload)
            .select()
            .single();
        if (error) throw error;
        return data;
    },

    async getAll() {
        const { data, error } = await supabase
            .from("violations")
            .select("*, student:student(fullName,email), reportedBy:reportedBy(fullName,role)")
            .order("created_at", { ascending: false });
        if (error) throw error;
        return data;
    },

    async getById(id) {
        const { data, error } = await supabase.from("violations").select("*").eq("id", id).single();
        if (error) throw error;
        return data;
    },

    async getByStudent(studentId) {
        const { data, error } = await supabase
            .from("violations")
            .select("*")
            .eq("student", studentId)
            .order("created_at", { ascending: false });
        if (error) throw error;
        return data;
    },

    async update(id, updates) {
        const { data, error } = await supabase
            .from("violations")
            .update(updates)
            .eq("id", id)
            .select()
            .single();
        if (error) throw error;
        return data;
    },

    async remove(id) {
        const { data, error } = await supabase.from("violations").delete().eq("id", id).select().single();
        if (error) throw error;
        return data;
    },
};

export default Violations;