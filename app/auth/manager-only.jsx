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