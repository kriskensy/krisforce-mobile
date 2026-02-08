import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, ActivityIndicator} from 'react-native';
import { useRouter } from 'expo-router';
import AppShell from '../../../components/layout/AppShell';
import { supabase } from '../../../lib/supabase';
import { formatCurrency } from '../../../lib/utils/formatCurrency';
import { Colors } from '../../../constants/Colors'

export default function InvoicesListScreen() {
  const [loading, setLoading] = useState(true);
  const [invoices, setInvoices] = useState([]);
  const router = useRouter();

  useEffect(() => {
    async function loadInvoices() {
      setLoading(true);
     
      const { data, error } = await supabase
        .from('invoices')
        .select('id, invoice_number, invoice_date, total_amount, invoice_statuses(name, code)')
        .is('deleted_at', null)
        .order('invoice_date', { ascending: false })
        .limit(20);

      if (!error) {
        setInvoices(
          (data ?? []).map((row) => ({
            id: row.id,
            invoiceNumber: row.invoice_number,
            invoiceDate: row.invoice_date,
            toalAmount: row.total_amount,
            invoiceStatusName: row.invoice_statuses?.name,
            invoiceStatusCode: row.invoice_statuses?.code,
          })),
        );
      }
      setLoading(false);
    }
    loadInvoices();
  }, []);

  function renderItem({ item }) {
    return (
      <TouchableOpacity
        onPress={() => router.push(`/invoices/${item.id}`)}
        style={{
          backgroundColor: Colors.background,
          borderRadius: 12,
          padding: 16,
          borderWidth: 1,
          borderColor: Colors.border,
          marginBottom: 12,
        }}
      >
        <Text style={{ color: Colors.text.secondary, fontSize: 16, fontWeight: '600', marginBottom: 4 }}>
          {item.invoiceNumber}
        </Text>
        <Text style={{ color: Colors.text.muted, fontSize: 12 }}>
          Date: {item.invoiceDate?.slice(0, 10)}
        </Text>
        <Text style={{ color: Colors.text.muted, fontSize: 12 }}>
          Status: {item.invoiceStatusName || item.invoiceStatusCode || '—' }
        </Text>
        <Text style={{ color: Colors.text.subtle, fontSize: 13, marginTop: 4 }}>
          Total: {formatCurrency((item.toalAmount ?? 0).toFixed(2), 'EUR')}
        </Text>
      </TouchableOpacity>
    );
  }

  return (
    <AppShell>
      <View style={{ flex: 1, paddingHorizontal: 16, paddingTop: 16 }}>
        {loading ? (
          <ActivityIndicator color={Colors.primary} />
        ) : (
          <FlatList
            data={invoices}
            keyExtractor={(item) => item.id}
            renderItem={renderItem}
            contentContainerStyle={{ paddingBottom: 24 }}
          />
        )}
      </View>
    </AppShell>
  );
}