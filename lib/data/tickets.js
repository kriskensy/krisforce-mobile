import { supabase } from "../supabase";

export const ticketData = {

  getTicketById: async (id) => {
    return await supabase
      .from('tickets')
      .select(`id, ticket_number, subject, clients(name), description, created_at, ticket_statuses(name, code), ticket_priorities(name, code), ticket_comments(id, message, created_at, user_profiles(first_name, last_name))`)
      .eq('id', id)
      .order('created_at', { foreignTable: 'ticket_comments', ascending: false })
      .single();
  },

  getAllTickets: async () => {
    return await supabase
      .from('tickets')
      .select(`id, subject, created_at, ticket_statuses(name, code), ticket_priorities(name, code)`)
      .is('deleted_at', null)
      .order('created_at', { ascending: false })
      .limit(20);
  }
}