import { supabase } from "../supabase";

export const invoiceData = {

  getInvoiceById: async (id) => {
    return await supabase
      .from('invoices')
      .select('id, invoice_number, invoice_date, due_date, total_amount, paid_amount, invoice_statuses(name, code)')
      .eq('id', id)
      .single();
  },

  getAllInvoices: async () => {
    return await supabase
      .from('invoices')
      .select('id, invoice_number, invoice_date, total_amount, invoice_statuses(name, code)')
      .is('deleted_at', null)
      .order('invoice_date', { ascending: false })
      .limit(20);
  }
}