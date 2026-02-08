// import React from 'react';
// import { View } from 'react-native';

// export default function AppShell({ children }) {

//   return (
//     <View className="flex-1 bg-gray-50 dark:bg-[#020617]">
//       <View className="flex-1">
//         {children}
//       </View>
//     </View>
//   );
// }



import React from 'react';
import { View } from 'react-native';


export default function AppShell({ children }) {


  return (
    <View style={{
      flex: 1,
      backgroundColor: '#020617',
      }}>
      <View style={{ flex: 1 }}>{children}</View>
    </View>
  );
}