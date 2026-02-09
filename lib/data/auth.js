import { supabase } from "../supabase";

export const authData = {

  getSession: async () => supabase.auth.getSession(),

  getUserProfile: async (userId) => {
    const { data: userRow, error } = await supabase
      .from('users')
      .select(`id, email, created_at, roles(code, name), user_profiles(first_name, last_name)`)
      .eq('id', userId)
      .single();

    if (error || !userRow) return null;

    return {
      id: userRow.id,
      email: userRow.email,
      createdAt: userRow.created_at,
      roleCode: userRow.roles?.code,
      roleName: userRow.roles?.name,
      firstName: userRow.user_profiles?.first_name,
      lastName: userRow.user_profiles?.last_name,
      isManagerOrAdmin: ['manager', 'admin'].includes(userRow.roles?.code),
    }
  }
}