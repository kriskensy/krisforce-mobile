// import React, { useState } from 'react';
// import { View, Text, TextInput, TouchableOpacity, ActivityIndicator, Alert } from 'react-native';
// import { supabase } from '../../lib/supabase';

// export default function LoginScreen() {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [loading, setLoading] = useState(false);

//   async function handleLogin() {
//     if (!email || !password) {
//       Alert.alert('Error', 'Please enter email and password.');
//       return;
//     }
//     setLoading(true);
//     const { error } = await supabase.auth.signInWithPassword({
//       email,
//       password,
//     });
//     setLoading(false);

//     if (error) {
//       Alert.alert('Login failed', error.message);
//     }
//   }

//   return (
//     <View className="flex-1 items-center justify-center px-6 bg-gray-50 dark:bg-[#020617]">
      
//       <Text className="text-2xl font-bold mb-6 text-gray-900 dark:text-[#f9fafb]">
//         KrisForce Manager
//       </Text>

//       <TextInput
//         placeholder="Email"
//         placeholderTextColor="#6b7280" 
//         value={email}
//         onChangeText={setEmail}
//         keyboardType="email-address"
//         autoCapitalize="none"
//         className="w-full rounded-lg border px-3 py-2.5 mb-3 bg-white border-gray-300 text-gray-900 dark:bg-[#020617] dark:border-[#1f2937] dark:text-[#f9fafb]"
//       />

//       <TextInput
//         placeholder="Password"
//         placeholderTextColor="#6b7280"
//         value={password}
//         onChangeText={setPassword}
//         secureTextEntry
//         className="w-full rounded-lg border px-3 py-2.5 mb-4 bg-white border-gray-300 text-gray-900 dark:bg-[#020617] dark:border-[#1f2937] dark:text-[#f9fafb]"
//       />

//       <TouchableOpacity
//         onPress={handleLogin}
//         disabled={loading}
//         className={`w-full rounded-lg py-3 items-center ${
//           loading ? 'bg-[#0ea5e9]/70' : 'bg-[#0ea5e9]'
//         }`}
//       >
//         {loading ? (
//           <ActivityIndicator color="#f9fafb" />
//         ) : (
//           <Text className="font-semibold text-white">Log in</Text>
//         )}
//       </TouchableOpacity>
//     </View>
//   );
// }



import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ActivityIndicator, Alert } from 'react-native';
import { supabase } from '../../lib/supabase';


export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);


  async function handleLogin() {
    if (!email || !password) {
      Alert.alert('Error', 'Please enter email and password.');
      return;
    }
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    setLoading(false);


    if (error) {
      Alert.alert('Login failed', error.message);
    }
  }


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
          color: '#f9fafb',
          fontSize: 24,
          fontWeight: '700',
          marginBottom: 24,
        }}
      >
        KrisForce Manager
      </Text>


      <TextInput
        placeholder="Email"
        placeholderTextColor="#6b7280"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
        style={{
          width: '100%',
          borderRadius: 8,
          borderWidth: 1,
          borderColor: '#1f2937',
          paddingHorizontal: 12,
          paddingVertical: 10,
          color: '#f9fafb',
          marginBottom: 12,
          backgroundColor: '#020617',
        }}
      />
      <TextInput
        placeholder="Password"
        placeholderTextColor="#6b7280"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={{
          width: '100%',
          borderRadius: 8,
          borderWidth: 1,
          borderColor: '#1f2937',
          paddingHorizontal: 12,
          paddingVertical: 10,
          color: '#f9fafb',
          marginBottom: 16,
          backgroundColor: '#020617',
        }}
      />


      <TouchableOpacity
        onPress={handleLogin}
        disabled={loading}
        style={{
          width: '100%',
          borderRadius: 8,
          backgroundColor: loading ? '#0ea5e9aa' : '#0ea5e9',
          paddingVertical: 12,
          alignItems: 'center',
        }}
      >
        {loading ? (
          <ActivityIndicator color="#f9fafb" />
        ) : (
          <Text style={{ color: '#f9fafb', fontWeight: '600' }}>Log in</Text>
        )}
      </TouchableOpacity>
    </View>
  );
}