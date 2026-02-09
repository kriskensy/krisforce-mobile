import { supabase } from "../supabase";

export const dashboardData = {

  getDashboardStats: async () => {

    //faster with Promise.all
    const [
      revenueResult,
      debtResult,
      categoryResult,
      ordersResult,
      contractsResult
    ] = await Promise.all([
      supabase.from('report_global_revenue').select('*'),
      supabase.from('report_client_summary').select('current_debt'),
      supabase.from('report_revenue_by_category').select('category, total'),
      supabase.from('report_orders_by_status').select('*'),
      supabase.from('report_contracts').select('*'),
    ])

    const globalRevenue = revenueResult.data;
    const clientSummary = debtResult.data;
    const revenueByCategory = categoryResult.data;
    const ordersByStatus = ordersResult.data;
    const contractsByStatus = contractsResult.data;

    const totalRevenue = globalRevenue?.reduce((acc, row) => acc + Number(row.total ?? 0), 0) ?? 0;
    const totalDebt = clientSummary?.reduce((acc, row) => acc + Number(row.current_debt ?? 0), 0) ?? 0;
    const activeOrders = ordersByStatus?.reduce((acc, row) => acc + Number(row.order_count ?? 0), 0);
    const expiringContracts = contractsByStatus?.filter((row) => row.status === 'Expiring Soon').length;

    return {
      data: {
        totalRevenue,
        totalDebt,
        revenueByCategory,
        activeOrders,
        expiringContracts
      }
    };
  }
};