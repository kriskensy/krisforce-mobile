// import React from 'react';
// import { View, Text, TouchableOpacity } from 'react-native';
// import { useRouter } from 'expo-router';
// import AppShell from '../../components/layout/AppShell';

// function CategoryTile({ label, description, onPress }) {
//   return (
//     <TouchableOpacity
//       onPress={onPress}
//       className="mb-4 rounded-2xl border p-5 shadow-sm bg-white border-gray-200 dark:bg-[#020617] dark:border-[#1e293b]"
//     >
//       <Text className="text-lg font-bold mb-1 text-gray-900 dark:text-[#e5e7eb]">
//         {label}
//       </Text>
//       <Text className="text-xs text-gray-500 dark:text-[#6b7280]">
//         {description}
//       </Text>
//     </TouchableOpacity>
//   );
// }

// export default function CategoriesScreen() {
//   const router = useRouter();

//   return (
//     <AppShell>
//       <View className="flex-1 px-4 pt-4">
//         <CategoryTile
//           label="Clients"
//           description="View last added clients."
//           onPress={() => router.push('/(protected)/clients')}
//         />
//         <CategoryTile
//           label="Invoices"
//           description="Monitor latest invoices."
//           onPress={() => router.push('/(protected)/invoices')}
//         />
//         <CategoryTile
//           label="Tickets"
//           description="Follow recent support tickets."
//           onPress={() => router.push('/(protected)/tickets')}
//         />
//       </View>
//     </AppShell>
//   );
// }

import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import AppShell from '../../components/layout/AppShell';


function CategoryTile({ label, description, onPress }) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        backgroundColor: '#020617',
        borderRadius: 16,
        padding: 20,
        borderWidth: 1,
        borderColor: '#1e293b',
        marginBottom: 16,
      }}
    >
      <Text
        style={{ color: '#e5e7eb', fontSize: 18, fontWeight: '700', marginBottom: 4 }}
      >
        {label}
      </Text>
      <Text style={{ color: '#6b7280', fontSize: 13 }}>{description}</Text>
    </TouchableOpacity>
  );
}


export default function CategoriesScreen() {
  const router = useRouter();


  return (
    <AppShell>
      <View style={{ flex: 1, paddingHorizontal: 16, paddingTop: 16 }}>
        <CategoryTile
          label="Clients"
          description="View last added clients."
          onPress={() => router.push('/(protected)/clients')}
        />
        <CategoryTile
          label="Invoices"
          description="Monitor latest invoices."
          onPress={() => router.push('/(protected)/invoices')}
        />
        <CategoryTile
          label="Tickets"
          description="Follow recent support tickets."
          onPress={() => router.push('/(protected)/tickets')}
        />
      </View>
    </AppShell>
  );
}