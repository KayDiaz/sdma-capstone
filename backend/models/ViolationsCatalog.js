import supabase from "../config/supabaseClient.js";

const ViolationsCatalog = {
  async list() {
    const { data, error } = await supabase.from("violations_catalog").select("*").order("created_at", { ascending: true });
    if (error) throw error;
    return data;
  },

  async getById(id) {
    const { data, error } = await supabase.from("violations_catalog").select("*").eq("id", id).single();
    if (error) throw error;
    return data;
  },

  async create(payload) {
    const { data, error } = await supabase.from("violations_catalog").insert(payload).select().single();
    if (error) throw error;
    return data;
  },

  async update(id, updates) {
    const { data, error } = await supabase.from("violations_catalog").update(updates).eq("id", id).select().single();
    if (error) throw error;
    return data;
  },

  async remove(id) {
    const { data, error } = await supabase.from("violations_catalog").delete().eq("id", id).select().single();
    if (error) throw error;
    return data;
  },
};

export default ViolationsCatalog;
