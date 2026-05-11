import supabase from "../config/supabaseClient.js";

const AILogs = {
  async list({ limit = 100, offset = 0 } = {}) {
    const { data, error } = await supabase.from("ai_assistant_logs").select("*").order("created_at", { ascending: false }).range(offset, offset + limit - 1);
    if (error) throw error;
    return data;
  },
};

export default AILogs;
