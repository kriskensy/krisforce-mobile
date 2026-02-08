// import React, { useEffect, useState } from 'react';
// import { View, Text, ActivityIndicator } from 'react-native';
// import { useLocalSearchParams } from 'expo-router';
// import AppShell from '../../../components/layout/AppShell';
// import { supabase } from '../../../lib/supabase';

// export default function TicketDetailsScreen() {
//   const { id } = useLocalSearchParams();
//   const [loading, setLoading] = useState(true);
//   const [ticket, setTicket] = useState(null);

//   useEffect(() => {
//     async function loadTicket() {
//       setLoading(true);

//       const { data, error } = await supabase
//         .from('tickets')
//         .select(`id, subject, description, created_at, ticket_statuses(name, code), ticket_priorities(name, code)`)
//         .eq('id', id)
//         .single();

//       if (!error && data) {
//         setTicket({
//           id: data.id,
//           subject: data.subject,
//           description: data.description,
//           createdAt: data.created_at,
//           statusName: data.ticket_statuses?.name,
//           statusCode: data.ticket_statuses?.code,
//           priorityName: data.ticket_priorities?.name,
//           priorityCode: data.ticket_priorities?.code,
//         });
//       }

//       setLoading(false);
//     }

//     if (id) {
//       loadTicket();
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

//   if (!ticket) {
//     return (
//       <AppShell>
//         <View className="flex-1 items-center justify-center">
//           <Text className="text-gray-500 dark:text-[#e5e7eb]">
//             Ticket not found.
//           </Text>
//         </View>
//       </AppShell>
//     );
//   }

//   return (
//     <AppShell>
//       <View className="flex-1 px-4 pt-4">
//         <View className="rounded-2xl border p-5 shadow-sm bg-white border-gray-200 dark:bg-[#020617] dark:border-[#1e293b]">
          
//           <Text className="text-xl font-bold mb-2 text-gray-900 dark:text-[#e5e7eb]">
//             {ticket.subject}
//           </Text>

//           <Text className="text-sm text-gray-500 dark:text-[#9ca3af]">
//             Status: {ticket.statusName || ticket.statusCode || '—'}
//           </Text>
          
//           <Text className="text-sm mt-1 text-gray-500 dark:text-[#9ca3af]">
//             Priority: {ticket.priorityName || ticket.priorityCode || '—'}
//           </Text>
          
//           <Text className="text-xs mt-2 text-gray-400 dark:text-[#6b7280]">
//             Created at: {ticket.createdAt?.slice(0, 19).replace('T', ' ')}
//           </Text>

//           {ticket.description ? (
//             <View className="mt-4 border-t border-gray-100 dark:border-gray-800 pt-3">
//               <Text className="text-sm text-gray-700 dark:text-[#e5e7eb] leading-5">
//                 {ticket.description}
//               </Text>
//             </View>
//           ) : null}
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


export default function TicketDetailsScreen() {
  const { id } = useLocalSearchParams();
  const [loading, setLoading] = useState(true);
  const [ticket, setTicket] = useState(null);


  useEffect(() => {
    async function loadTicket() {
      setLoading(true);


      const { data, error } = await supabase
        .from('tickets')
        .select(
          `
          id,
          subject,
          description,
          created_at,
          ticket_statuses(name, code),
          ticket_priorities(name, code)
        `,
        )
        .eq('id', id)
        .single();


      if (!error && data) {
        setTicket({
          id: data.id,
          subject: data.subject,
          description: data.description,
          createdAt: data.created_at,
          statusName: data.ticket_statuses?.name,
          statusCode: data.ticket_statuses?.code,
          priorityName: data.ticket_priorities?.name,
          priorityCode: data.ticket_priorities?.code,
        });
      }


      setLoading(false);
    }


    if (id) {
      loadTicket();
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


  if (!ticket) {
    return (
      <AppShell>
        <View
          style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Text style={{ color: '#e5e7eb' }}>Ticket not found.</Text>
        </View>
      </AppShell>
    );
  }


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
            {ticket.subject}
          </Text>


          <Text style={{ color: '#9ca3af', fontSize: 14 }}>
            Status: {ticket.statusName || ticket.statusCode || '—'}
          </Text>
          <Text style={{ color: '#9ca3af', fontSize: 14, marginTop: 2 }}>
            Priority: {ticket.priorityName || ticket.priorityCode || '—'}
          </Text>
          <Text style={{ color: '#6b7280', fontSize: 13, marginTop: 8 }}>
            Created at: {ticket.createdAt?.slice(0, 19).replace('T', ' ')}
          </Text>


          {ticket.description ? (
            <Text
              style={{
                color: '#e5e7eb',
                fontSize: 14,
                marginTop: 12,
              }}
            >
              {ticket.description}
            </Text>
          ) : null}
        </View>
      </View>
    </AppShell>
  );
}
