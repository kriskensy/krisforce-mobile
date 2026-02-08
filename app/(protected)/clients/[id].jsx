// import React, { useEffect, useState } from 'react';
// import { View, Text, ActivityIndicator } from 'react-native';
// import { useLocalSearchParams } from 'expo-router';
// import AppShell from '../../../components/layout/AppShell';
// import { supabase } from '../../../lib/supabase';

// export default function ClientDetailsScreen() {
//   const { id } = useLocalSearchParams();
//   const [loading, setLoading] = useState(true);
//   const [client, setClient] = useState(null);

//   useEffect(() => {
//     async function loadClient() {
//       setLoading(true);
//       const { data, error } = await supabase
//         .from('clients')
//         .select('id, name, nip, created_at')
//         .eq('id', id)
//         .single();

//       if (!error) {
//         setClient(data);
//       }
//       setLoading(false);
//     }

//     if (id) {
//       loadClient();
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

//   if (!client) {
//     return (
//       <AppShell>
//         <View className="flex-1 items-center justify-center">
//           <Text className="text-gray-500 dark:text-[#e5e7eb]">
//             Client not found.
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
//             {client.name}
//           </Text>
          
//           <Text className="text-sm text-gray-600 dark:text-[#9ca3af]">
//             NIP: {client.nip || '—'}
//           </Text>
          
//           <Text className="text-xs mt-2 text-gray-400 dark:text-[#6b7280]">
//             Created at: {client.created_at?.slice(0, 10)}
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


export default function ClientDetailsScreen() {
  const { id } = useLocalSearchParams();
  const [loading, setLoading] = useState(true);
  const [client, setClient] = useState(null);


  useEffect(() => {
    async function loadClient() {
      setLoading(true);
      const { data, error } = await supabase
        .from('clients')
        .select('id, name, nip, created_at')
        .eq('id', id)
        .single();


      if (!error) {
        setClient(data);
      }
      setLoading(false);
    }


    if (id) {
      loadClient();
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


  if (!client) {
    return (
      <AppShell>
        <View
          style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Text style={{ color: '#e5e7eb' }}>Client not found.</Text>
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
            {client.name}
          </Text>
          <Text style={{ color: '#9ca3af', fontSize: 14 }}>
            NIP: {client.nip || '—'}
          </Text>
          <Text style={{ color: '#6b7280', fontSize: 13, marginTop: 8 }}>
            Created at: {client.created_at?.slice(0, 10)}
          </Text>
        </View>
      </View>
    </AppShell>
  );
}