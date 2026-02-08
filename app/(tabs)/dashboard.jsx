import React, { useEffect, useState } from 'react';
import { ScrollView, View, Text, ActivityIndicator } from 'react-native';
import AppShell from '../../components/layout/AppShell';
import { supabase } from '../../lib/supabase';
import { formatCurrency } from '../../lib/utils/formatCurrency';
import StatCard from '../../components/StatCard';
import RevenueChart from '../../components/RevenueChart';

export default function DashboardScreen() {
  const [loading, setLoading] = useState(true);
  const [revenueData, setRevenueData] = useState([]);
  const [stats, setStats] = useState({
    totalRevenue: '—',
    totalDebt: '—',
    activeOrders: '—',
    expiringContracts: '-',
  });

  useEffect(() => {
    async function loadStats() {
      setLoading(true);

      const { data: globalRevenue } = await supabase
        .from('report_global_revenue')
        .select('*')
        .order('month_date', { ascending: false })

      const totalRevenue = globalRevenue?.reduce((acc, row) => acc + Number(row.total ?? 0), 0) ?? 0;

      const { data: clientSummary } = await supabase
        .from('report_client_summary')
        .select('current_debt');

      const totalDebt = clientSummary?.reduce((acc, row) => acc + Number(row.current_debt ?? 0), 0) ?? 0;

      const { data: revenueByCategory } = await supabase
        .from('report_revenue_by_category')
        .select('category, total')

      setRevenueData(revenueByCategory || []);

      const { data: ordersByStatus } = await supabase
        .from('report_orders_by_status')
        .select('*');

      const activeOrders = ordersByStatus?.reduce((acc, row) => acc + Number(row.order_count ?? 0), 0);

      const { data: contractsByStatus } = await supabase
        .from('report_contracts')
        .select('*');

      const expiringContracts = contractsByStatus?.filter((row) => row.status === 'Expiring Soon').length;

      setStats({
        totalRevenue: `${formatCurrency(totalRevenue.toFixed(2), 'EUR')}`,
        totalDebt: `${formatCurrency(totalDebt.toFixed(2), 'EUR')}`,
        activeOrders: String(activeOrders ?? 0),
        expiringContracts: String(expiringContracts ?? 0),
      });

      setLoading(false);
    }

    loadStats();
  }, []);

  return (
    <AppShell>
      <ScrollView
        style={{ flex: 1, paddingHorizontal: 16, paddingTop: 12 }}
        contentContainerStyle={{ paddingBottom: 24 }}
      >
        {loading ? (
          <View
            style={{
              marginTop: 32,
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <ActivityIndicator color="#0ea5e9" />
          </View>
        ) : (
          <>
            <StatCard
              label="Total revenue (all time)"
              value={stats.totalRevenue}
              description="Aggregated from all invoices."
              valueColor="#16a34a"
            />
            <StatCard
              label="Outstanding debt"
              value={stats.totalDebt}
              description="Total unpaid invoices."
              valueColor="#dc2626"
            />

            <RevenueChart data={revenueData} />

            <StatCard
              label="Active orders"
              value={stats.activeOrders}
              description="Active orders across all statuses."
            />
            <StatCard
              label="Expiring contracts"
              value={stats.expiringContracts}
              description="Due within 30 days."
            />
          </>
        )}
      </ScrollView>
    </AppShell>
  );
}
