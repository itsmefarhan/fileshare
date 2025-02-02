import { createClient } from "../utils/client";

const supabase = createClient();

export const signupAPI = async (val) => {
  const res = await supabase.auth.signUp({
    email: val.email,
    password: val.password,
  });
  if (!res.error) {
    const { error } = await supabase
      .from("users")
      .insert({ id: res.data.user.id, name: val.name, email: val.email });
    return error;
  }
};

export const loginAPI = async (val) => {
  const res = await supabase.auth.signInWithPassword({
    email: val.email,
    password: val.password,
  });
  return res.error;
};

export const logoutAPI = async () => await supabase.auth.signOut();
