import { supabase } from "../supabase";

export const clientData = {

  getClientById: async (id) => {
    return await supabase
      .from('clients')
      .select('id, name, nip, created_at')
      .eq('id', id)
      .single();
  },

  getAllClients: async () => {
    return await supabase
      .from('clients')
      .select('id, name, nip, created_at')
      .is('deleted_at', null)
      .order('created_at', { ascending: false })
      .limit(20);
  }
}