// import React from 'react';
// import { View, Text, TouchableOpacity } from 'react-native';
// import { useAuth } from '../_layout';

// export default function ManagerOnlyScreen() {
//   const { signOut } = useAuth();

//   return (
//     <View className="flex-1 items-center justify-center px-6 bg-gray-50 dark:bg-[#020617]">
      
//       <Text className="text-xl font-bold mb-3 text-center text-orange-600 dark:text-[#f97316]">
//         Access restricted
//       </Text>

//       <Text className="text-sm text-center mb-6 text-gray-700 dark:text-[#e5e7eb]">
//         This mobile application is available only for users with the Manager role.
//       </Text>

//       <TouchableOpacity
//         onPress={signOut}
//         className="rounded-lg border px-4 py-2.5 bg-white border-gray-300 dark:bg-transparent dark:border-gray-600"
//       >
//         <Text className="font-semibold text-gray-700 dark:text-[#e5e7eb]">
//           Log out
//         </Text>
//       </TouchableOpacity>
//     </View>
//   );
// }

import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useAuth } from '../_layout';


export default function ManagerOnlyScreen() {
  const { signOut } = useAuth();


  return (
    <View
      style={{
        flex: 1,
        backgroundColor: '#020617',
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 24,
      }}
    >
      <Text
        style={{
          color: '#f97316',
          fontSize: 20,
          fontWeight: '700',
          marginBottom: 12,
          textAlign: 'center',
        }}
      >
        Access restricted
      </Text>
      <Text
        style={{
          color: '#e5e7eb',
          fontSize: 14,
          textAlign: 'center',
          marginBottom: 24,
        }}
      >
        This mobile application is available only for users with the Manager role.
      </Text>
      <TouchableOpacity
        onPress={signOut}
        style={{
          borderRadius: 8,
          borderWidth: 1,
          borderColor: '#4b5563',
          paddingHorizontal: 16,
          paddingVertical: 10,
        }}
      >
        <Text style={{ color: '#e5e7eb', fontWeight: '600' }}>Log out</Text>
      </TouchableOpacity>
    </View>
  );
}