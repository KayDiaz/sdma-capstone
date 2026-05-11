import supabase from "../config/supabaseClient.js";

const CommunitySessions = {
  async list(query = {}) {
    let builder = supabase.from("community_service_sessions").select("*").order("created_at", { ascending: false });
    if (query.student) builder = builder.eq("student", query.student);
    if (query.assignedBy) builder = builder.eq("assignedBy", query.assignedBy);
    const { data, error } = await builder;
    if (error) throw error;
    return data;
  },

  async getById(id) {
    const { data, error } = await supabase.from("community_service_sessions").select("*").eq("id", id).single();
    if (error) throw error;
    return data;
  },

  async create(payload) {
    const { data, error } = await supabase.from("community_service_sessions").insert(payload).select().single();
    if (error) throw error;
    return data;
  },

  async update(id, updates) {
    const { data, error } = await supabase.from("community_service_sessions").update(updates).eq("id", id).select().single();
    if (error) throw error;
    return data;
  },

  async remove(id) {
    const { data, error } = await supabase.from("community_service_sessions").delete().eq("id", id).select().single();
    if (error) throw error;
    return data;
  },
};

export default CommunitySessions;
