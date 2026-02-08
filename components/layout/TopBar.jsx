// import React from 'react';
// import { View, Text, Image } from 'react-native';
// import { useAuth } from '../../lib/AuthContext';
// import { useSafeAreaInsets } from 'react-native-safe-area-context';

// export default function TopBar() {
//   const { profile, logoUrl } = useAuth();
//   const insets = useSafeAreaInsets();

//   const fullName = profile ? `${profile.firstName ?? ''} ${profile.lastName ?? ''}`.trim() : '';

//   return (
//     <View
//       style={{ paddingTop: insets.top + 10 }}
//       className="px-4 pb-3 border-b flex-row items-center justify-between bg-white border-gray-200 dark:bg-[#020617] dark:border-[#1e293b]"
//     >
//       <View className="flex-row items-center">

//         <View className="w-10 h-10 bg-sky-500 rounded-xl items-center justify-center mr-3 shadow-sm">
//           <Text className="text-white font-bold text-lg">
//             {profile?.firstName?.[0]}{profile?.lastName?.[0]}
//           </Text>
//         </View>

//         <View>
//           <Text className="text-[10px] uppercase font-bold tracking-[1px] text-gray-500 dark:text-[#9ca3af]">
//             Manager
//           </Text>
//           <Text className="text-base font-bold text-gray-900 dark:text-[#f9fafb]">
//             {fullName}
//           </Text>
//         </View>
//       </View>

//       <View className="flex-row items-center gap-4">
//         {logoUrl && (
//           <Image
//             source={{ uri: logoUrl }}
//             className="w-20 h-8 opacity-100 dark:opacity-80"
//             resizeMode="contain"
//           />
//         )}
//       </View>
//     </View>
//   );
// }



import React from 'react';
import { View, Text, Image } from 'react-native';
// import { useAuth } from '../../app/_layout';
import { useAuth } from '../../lib/AuthContext';
import { useSafeAreaInsets } from 'react-native-safe-area-context';


export default function TopBar() {
  const { profile, logoUrl } = useAuth();
  const insets = useSafeAreaInsets();


  const fullName = profile
    ? `${profile.firstName ?? ''} ${profile.lastName ?? ''}`.trim()
    : '';


  return (
    <View
      style={{
        paddingTop: insets.top + 10,
        paddingBottom: 10,
        paddingHorizontal: 16,
        backgroundColor: '#020617',
        borderBottomWidth: 1,
        borderBottomColor: '#1e293b',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}
    >
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <View style={{ width: 40, height: 40, backgroundColor: '#0ea5e9', borderRadius: 12, alignItems: 'center', justifyContent: 'center', marginRight: 12 }}>
             <Text style={{ color: 'white', fontWeight: 'bold' }}>
               {profile?.firstName?.[0]}{profile?.lastName?.[0]}
             </Text>
          </View>
          <View>
            <Text style={{ color: '#9ca3af', fontSize: 10, textTransform: 'uppercase', fontWeight: 'bold', letterSpacing: 1 }}>Manager</Text>
            <Text style={{ color: '#f9fafb', fontSize: 16, fontWeight: 'bold' }}>
              {fullName}
            </Text>
          </View>
      </View>


      {logoUrl && (
        <Image
          source={{ uri: logoUrl }}
          style={{ width: 80, height: 30, resizeMode: 'contain', opacity: 0.8 }}
        />
      )}
    </View>
  );
}