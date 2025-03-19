import { createClient } from "@supabase/supabase-js";
import { Guide } from "@/types";

const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY!;

const supabase = createClient(supabaseUrl, supabaseKey);

export const getGuide = async (guideId: string) => {
  const { data, error } = await supabase
    .from("Guides")
    .select("*")
    .eq("id", guideId)
    .single();

  if (error) {
    throw error;
  }

  return data;
};

export const saveGuideToDatabase = async (guide: Omit<Guide, "id">) => {
  const { data, error } = await supabase
    .from("Guides")
    .insert(guide)
    .select()
    .single();

  if (error) {
    throw error;
  }

  return data;
};

export default supabase;
