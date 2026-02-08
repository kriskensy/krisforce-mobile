// import React from 'react';
// import { View, Text, TouchableOpacity } from 'react-native';
// import AppShell from '../../components/layout/AppShell';
// import { useAuth } from '../../lib/AuthContext'; 

// export default function MenuScreen() {
//   const { profile, signOut } = useAuth();

//   return (
//     <AppShell>
//       <View className="flex-1 px-4 pt-6 bg-transparent dark:bg-slate-900/95">
        
//         <View className="mb-6 rounded-2xl border p-5 shadow-sm bg-white border-gray-200 dark:bg-[#020617] dark:border-[#1e293b]">
          
//           <Text className="text-xs mb-1 text-gray-500 dark:text-[#9ca3af]">
//             Manager summary
//           </Text>
          
//           <Text className="text-lg font-bold mb-2 text-gray-900 dark:text-[#e5e7eb]">
//             {profile
//               ? `${profile.firstName ?? ''} ${profile.lastName ?? ''}`.trim()
//               : '—'}
//           </Text>
          
//           <Text className="text-xs text-gray-500 dark:text-[#9ca3af]">
//             Role: {profile?.roleName || profile?.roleCode || 'manager'}
//           </Text>
          
//           <Text className="text-xs mt-1 text-gray-500 dark:text-[#9ca3af]">
//             Email: {profile?.email || '—'}
//           </Text>
//         </View>

//         <TouchableOpacity
//           onPress={signOut}
//           className="rounded-xl border py-3 items-center bg-white border-red-500 dark:bg-transparent dark:border-red-700"
//         >
//           <Text className="font-semibold text-red-600 dark:text-red-300">
//             Log out
//           </Text>
//         </TouchableOpacity>
//       </View>
//     </AppShell>
//   );
// }

import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import AppShell from '../../components/layout/AppShell';
// import { useAuth } from '../_layout';
import { useAuth } from '../../lib/AuthContext';


export default function MenuScreen() {
  const { profile, signOut } = useAuth();


  return (
    <AppShell>
      <View
        style={{
          flex: 1,
          paddingHorizontal: 16,
          paddingTop: 24,
          backgroundColor: 'rgba(15,23,42,0.95)',
        }}
      >
        <View
          style={{
            backgroundColor: '#020617',
            borderRadius: 16,
            padding: 20,
            borderWidth: 1,
            borderColor: '#1e293b',
            marginBottom: 24,
          }}
        >
          <Text style={{ color: '#9ca3af', fontSize: 12, marginBottom: 4 }}>
            Manager summary
          </Text>
          <Text
            style={{
              color: '#e5e7eb',
              fontSize: 18,
              fontWeight: '700',
              marginBottom: 8,
            }}
          >
            {profile
              ? `${profile.firstName ?? ''} ${profile.lastName ?? ''}`.trim()
              : '—'}
          </Text>
          <Text style={{ color: '#9ca3af', fontSize: 13 }}>
            Role: {profile?.roleName || profile?.roleCode || 'manager'}
          </Text>
          <Text style={{ color: '#9ca3af', fontSize: 13, marginTop: 4 }}>
            Email: {profile?.email || '—'}
          </Text>
        </View>


        <TouchableOpacity
          onPress={signOut}
          style={{
            borderRadius: 12,
            borderWidth: 1,
            borderColor: '#b91c1c',
            paddingVertical: 12,
            alignItems: 'center',
          }}
        >
          <Text style={{ color: '#fca5a5', fontWeight: '600' }}>Log out</Text>
        </TouchableOpacity>
      </View>
    </AppShell>
  );
}