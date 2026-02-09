import React, { useEffect, useState } from 'react';
import { ScrollView, View, ActivityIndicator } from 'react-native';
import AppShell from '../../components/layout/AppShell';
import { formatCurrency } from '../../lib/utils/formatCurrency';
import StatCard from '../../components/StatCard';
import RevenueChart from '../../components/RevenueChart';
import { Colors } from '../../constants/Colors'
import { dashboardData } from '../../lib/data/dashboard';

export default function DashboardScreen() {
  const [loading, setLoading] = useState(true);
  const [revenueData, setRevenueData] = useState([]);
  const [stats, setStats] = useState(null)

  useEffect(() => {
    async function loadStats() {
      setLoading(true);

      const { data, error } = await dashboardData.getDashboardStats();

      if(!error && data) {
        setStats({
          totalRevenue: `${formatCurrency(data.totalRevenue.toFixed(2), 'EUR')}`,
          totalDebt: `${formatCurrency(data.totalDebt.toFixed(2), 'EUR')}`,
          activeOrders: String(data.activeOrders ?? 0),
          expiringContracts: String(data.expiringContracts ?? 0),
        });
        setRevenueData(data.revenueByCategory || []);
      }
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
            <ActivityIndicator color={Colors.status.info} />
          </View>
        ) : (
          <>
            <StatCard
              label="Total revenue (all time)"
              value={stats.totalRevenue}
              description="Aggregated from all invoices."
              valueColor={Colors.status.success}
            />
            <StatCard
              label="Outstanding debt"
              value={stats.totalDebt}
              description="Total unpaid invoices."
              valueColor={Colors.status.danger}
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
