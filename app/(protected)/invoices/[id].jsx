// import React, { useEffect, useState } from 'react';
// import { View, Text, ActivityIndicator } from 'react-native';
// import { useLocalSearchParams } from 'expo-router';
// import AppShell from '../../../components/layout/AppShell';
// import { supabase } from '../../../lib/supabase';

// export default function InvoiceDetailsScreen() {
//   const { id } = useLocalSearchParams();
//   const [loading, setLoading] = useState(true);
//   const [invoice, setInvoice] = useState(null);
//   const [statusName, setStatusName] = useState(null);

//   useEffect(() => {
//     async function loadInvoice() {
//       setLoading(true);

//       const { data, error } = await supabase
//         .from('invoices')
//         .select(
//           'id, invoice_number, invoice_date, due_date, total_amount, paid_amount, status_id',
//         )
//         .eq('id', id)
//         .single();

//       if (!error && data) {
//         setInvoice(data);

//         if (data.status_id) {
//           const { data: statusRow } = await supabase
//             .from('invoice_statuses')
//             .select('name, code')
//             .eq('id', data.status_id)
//             .single();

//           if (statusRow) {
//             setStatusName(`${statusRow.name} (${statusRow.code})`);
//           }
//         }
//       }

//       setLoading(false);
//     }

//     if (id) {
//       loadInvoice();
//     }
//   }, [id]);

//   if (loading) {
//     return (
//       <AppShell>
//         <View className="flex-1 items-center justify-center">
//           <ActivityIndicator color="#0ea5e9" />
//         </View>
//       </AppShell>
//     );
//   }

//   if (!invoice) {
//     return (
//       <AppShell>
//         <View className="flex-1 items-center justify-center">
//           <Text className="text-gray-500 dark:text-[#e5e7eb]">
//             Invoice not found.
//           </Text>
//         </View>
//       </AppShell>
//     );
//   }

//   const total = Number(invoice.total_amount ?? 0);
//   const paid = Number(invoice.paid_amount ?? 0);
//   const outstanding = total - paid;

//   return (
//     <AppShell>
//       <View className="flex-1 px-4 pt-4">
//         <View className="rounded-2xl border p-5 shadow-sm bg-white border-gray-200 dark:bg-[#020617] dark:border-[#1e293b]">
          
//           <Text className="text-xl font-bold mb-2 text-gray-900 dark:text-[#e5e7eb]">
//             {invoice.invoice_number}
//           </Text>

//           <Text className="text-sm text-gray-500 dark:text-[#9ca3af]">
//             Invoice date: {invoice.invoice_date?.slice(0, 10)}
//           </Text>
//           <Text className="text-sm mt-1 text-gray-500 dark:text-[#9ca3af]">
//             Due date: {invoice.due_date?.slice(0, 10) || '—'}
//           </Text>

//           <Text className="text-sm mt-2 text-gray-500 dark:text-[#9ca3af]">
//             Status: {statusName || '—'}
//           </Text>

//           <Text className="text-base mt-4 font-semibold text-gray-900 dark:text-[#e5e7eb]">
//             Total: {total.toFixed(2)} PLN
//           </Text>
          
//           <Text className="text-sm mt-1 text-green-600 dark:text-[#22c55e]">
//             Paid: {paid.toFixed(2)} PLN
//           </Text>
          
//           <Text className="text-sm mt-1 text-orange-600 dark:text-[#f97316]">
//             Outstanding: {outstanding.toFixed(2)} PLN
//           </Text>
//         </View>
//       </View>
//     </AppShell>
//   );
// }

import React, { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import AppShell from '../../../components/layout/AppShell';
import { supabase } from '../../../lib/supabase';


export default function InvoiceDetailsScreen() {
  const { id } = useLocalSearchParams();
  const [loading, setLoading] = useState(true);
  const [invoice, setInvoice] = useState(null);
  const [statusName, setStatusName] = useState(null);


  useEffect(() => {
    async function loadInvoice() {
      setLoading(true);


      const { data, error } = await supabase
        .from('invoices')
        .select(
          'id, invoice_number, invoice_date, due_date, total_amount, paid_amount, status_id',
        )
        .eq('id', id)
        .single();


      if (!error && data) {
        setInvoice(data);


        if (data.status_id) {
          const { data: statusRow } = await supabase
            .from('invoice_statuses')
            .select('name, code')
            .eq('id', data.status_id)
            .single();


          if (statusRow) {
            setStatusName(`${statusRow.name} (${statusRow.code})`);
          }
        }
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
        <View
          style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <ActivityIndicator color="#0ea5e9" />
        </View>
      </AppShell>
    );
  }


  if (!invoice) {
    return (
      <AppShell>
        <View
          style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Text style={{ color: '#e5e7eb' }}>Invoice not found.</Text>
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
            backgroundColor: '#020617',
            borderRadius: 16,
            padding: 20,
            borderWidth: 1,
            borderColor: '#1e293b',
          }}
        >
          <Text
            style={{
              color: '#e5e7eb',
              fontSize: 20,
              fontWeight: '700',
              marginBottom: 8,
            }}
          >
            {invoice.invoicenumber}
          </Text>


          <Text style={{ color: '#9ca3af', fontSize: 14 }}>
            Invoice date: {invoice.invoice_date?.slice(0, 10)}
          </Text>
          <Text style={{ color: '#9ca3af', fontSize: 14, marginTop: 4 }}>
            Due date: {invoice.due_date?.slice(0, 10) || '—'}
          </Text>


          <Text style={{ color: '#9ca3af', fontSize: 14, marginTop: 8 }}>
            Status: {statusName || '—'}
          </Text>


          <Text style={{ color: '#e5e7eb', fontSize: 16, marginTop: 12 }}>
            Total: {total.toFixed(2)} PLN
          </Text>
          <Text style={{ color: '#22c55e', fontSize: 14, marginTop: 4 }}>
            Paid: {paid.toFixed(2)} PLN
          </Text>
          <Text style={{ color: '#f97316', fontSize: 14, marginTop: 4 }}>
            Outstanding: {outstanding.toFixed(2)} PLN
          </Text>
        </View>
      </View>
    </AppShell>
  );
}