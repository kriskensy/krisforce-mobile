import React, { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import AppShell from '../../../components/layout/AppShell';
import { formatCurrency } from '../../../lib/utils/formatCurrency';
import { Colors } from '../../../constants/Colors'
import { invoiceData } from '../../../lib/data/invoices';

export default function InvoiceDetailsScreen() {
  const { id } = useLocalSearchParams();
  const [loading, setLoading] = useState(true);
  const [invoice, setInvoice] = useState(null);
  const [statusName, setStatusName] = useState(null);

  useEffect(() => {
    async function loadInvoice() {
      setLoading(true);

      const { data, error } = await invoiceData.getInvoiceById(id);

      if (!error && data) {
        setInvoice({
          ...data,
          statusName: data.invoice_statuses ? `${data.invoice_statuses.name}(${data.invoice_statuses.code})` : '—'
        });
      }
      setLoading(false);
    }

    if (id) {
      loadInvoice();
    }
  }, [id]);

  if (loading) {
    return (
      <AppShell>
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center'}} >
          <ActivityIndicator color={Colors.primary} />
        </View>
      </AppShell>
    );
  }

  if (!invoice) {
    return (
      <AppShell>
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}} >
          <Text style={{ color: Colors.text.secondary }}>Invoice not found.</Text>
        </View>
      </AppShell>
    );
  }

  const total = Number(invoice.total_amount ?? 0);
  const paid = Number(invoice.paid_amount ?? 0);
  const outstanding = total - paid;

  return (
    <AppShell>
      <View style={{ flex: 1, paddingHorizontal: 16, paddingTop: 16 }}>
        <View
          style={{
            backgroundColor: Colors.background,
            borderRadius: 16,
            padding: 20,
            borderWidth: 1,
            borderColor: Colors.border,
          }}
        >
          <Text style={{ color: Colors.text.secondary, fontSize: 20, fontWeight: '700', marginBottom: 8}} >
            {invoice.invoice_number}
          </Text>

          <Text style={{ color: Colors.text.muted, fontSize: 14 }}>
            Invoice date: {invoice.invoice_date?.slice(0, 10)}
          </Text>
          <Text style={{ color: Colors.text.muted, fontSize: 14, marginTop: 4 }}>
            Due date: {invoice.due_date?.slice(0, 10) || '—'}
          </Text>
          <Text style={{ color: Colors.text.muted, fontSize: 14, marginTop: 8 }}>
            Status: {statusName || '—'}
          </Text>
          <Text style={{ color: Colors.text.secondary, fontSize: 16, marginTop: 12 }}>
            Total: {formatCurrency(total.toFixed(2), 'EUR')}
          </Text>
          <Text style={{ color: Colors.status.success, fontSize: 14, marginTop: 4 }}>
            Paid: {formatCurrency(paid.toFixed(2), 'EUR')}
          </Text>
          <Text style={{ color: Colors.status.warning, fontSize: 14, marginTop: 4 }}>
            Outstanding: {formatCurrency(outstanding.toFixed(2), 'EUR')}
          </Text>
        </View>
      </View>
    </AppShell>
  );
}