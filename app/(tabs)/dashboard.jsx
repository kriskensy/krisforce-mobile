import React, { useEffect, useState } from 'react';
import { ScrollView, View, Text, ActivityIndicator } from 'react-native';
import AppShell from '../../components/layout/AppShell';
import { supabase } from '../../lib/supabase';
import { formatCurrency } from '../../lib/utils/formatCurrency';

function StatCard({ label, value, description }) {
  return (
    <View
      style={{
        backgroundColor: '#020617',
        borderRadius: 12,
        padding: 16,
        borderWidth: 1,
        borderColor: '#1e293b',
        marginBottom: 12,
      }}
    >
      <Text style={{ color: '#9ca3af', fontSize: 12 }}>{label}</Text>
      <Text
        style={{
          color: '#e5e7eb',
          fontSize: 20,
          fontWeight: '700',
          marginTop: 4,
        }}
      >
        {value}
      </Text>
      {description ? (
        <Text
          style={{
            color: '#6b7280',
            fontSize: 12,
            marginTop: 4,
          }}
        >
          {description}
        </Text>
      ) : null}
    </View>
  );
}

export default function DashboardScreen() {
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalRevenue: '—',
    lastMonthRevenue: '—',
    categoriesCount: '—',
    openOrders: '—',
    openInvoices: '—',
    lastPayments: '—',
  });

  useEffect(() => {
    async function loadStats() {
      setLoading(true);

      const { data: globalRevenue } = await supabase
        .from('report_global_revenue')
        .select('*')
        .order('month_date', { ascending: false })
        .limit(2);

      const totalRevenue =
        globalRevenue?.reduce((acc, row) => acc + Number(row.total ?? 0), 0) ??
        0;
      const lastMonthRevenue =
        globalRevenue && globalRevenue[0]
          ? Number(globalRevenue[0].total ?? 0)
          : 0;

      const { data: revenueByCategory } = await supabase
        .from('report_revenue_by_category')
        .select('category');

      const categoriesCount = revenueByCategory?.length ?? 0;

      const { data: ordersByStatus } = await supabase
        .from('report_orders_by_status')
        .select('*');

      const openOrders = ordersByStatus?.reduce(
        (acc, row) => acc + Number(row.ordercount ?? 0),
        0,
      );

      const { data: invoices } = await supabase
        .from('report_invoices')
        .select('*');

      const openInvoices = invoices?.filter(
        (row) => row.statuscode !== 'paid' && row.statuscode !== 'cancelled',
      ).length;

      const { data: payments } = await supabase
        .from('report_payments')
        .select('*')
        .order('payment_date', { ascending: false })
        .limit(5);

      const lastPayments = payments?.reduce(
        (acc, row) => acc + Number(row.paymentamount ?? 0),
        0,
      );

      setStats({
        totalRevenue: `${formatCurrency(totalRevenue.toFixed(2), 'EUR')}`,
        lastMonthRevenue: `${formatCurrency(lastMonthRevenue.toFixed(2), 'EUR')}`,
        categoriesCount: String(categoriesCount),
        openOrders: String(openOrders ?? 0),
        openInvoices: String(openInvoices ?? 0),
        lastPayments: `${formatCurrency((lastPayments ?? 0).toFixed(2), 'EUR')}`,
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
            />
            <StatCard
              label="Revenue last month"
              value={stats.lastMonthRevenue}
              description="From report_global_revenue."
            />
            <StatCard
              label="Revenue categories"
              value={stats.categoriesCount}
              description="Distinct product categories."
            />
            <StatCard
              label="Open orders"
              value={stats.openOrders}
              description="From report_orders_by_status."
            />
            <StatCard
              label="Open invoices"
              value={stats.openInvoices}
              description="Non-paid, non-cancelled invoices."
            />
            <StatCard
              label="Last 5 payments sum"
              value={stats.lastPayments}
              description="Recent payments from report_payments."
            />
          </>
        )}
      </ScrollView>
    </AppShell>
  );
}
