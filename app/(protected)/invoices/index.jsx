import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, ActivityIndicator} from 'react-native';
import { useRouter } from 'expo-router';
import AppShell from '../../../components/layout/AppShell';
import { supabase } from '../../../lib/supabase';


export default function InvoicesListScreen() {
  const [loading, setLoading] = useState(true);
  const [invoices, setInvoices] = useState([]);
  const router = useRouter();

  useEffect(() => {
    async function loadInvoices() {
      setLoading(true);
     
      const { data, error } = await supabase
        .from('invoices')
        .select('id, invoice_number, invoice_date, total_amount, status_id')
        .is('deleted_at', null)
        .order('invoice_date', { ascending: false })
        .limit(20);

      if (!error) {
        setInvoices(data ?? []);
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
          backgroundColor: '#020617',
          borderRadius: 12,
          padding: 16,
          borderWidth: 1,
          borderColor: '#1e293b',
          marginBottom: 12,
        }}
      >
        <Text
          style={{
            color: '#e5e7eb',
            fontSize: 16,
            fontWeight: '600',
            marginBottom: 4,
          }}
        >
          {item.invoice_number}
        </Text>
        <Text style={{ color: '#9ca3af', fontSize: 12 }}>
          Date: {item.invoice_date?.slice(0, 10)}
        </Text>
        <Text style={{ color: '#6b7280', fontSize: 13, marginTop: 4 }}>
          Total: {Number(item.total_amount ?? 0).toFixed(2)} PLN
        </Text>
      </TouchableOpacity>
    );
  }

  return (
    <AppShell>
      <View style={{ flex: 1, paddingHorizontal: 16, paddingTop: 16 }}>
        {loading ? (
          <ActivityIndicator color="#0ea5e9" />
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