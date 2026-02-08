import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useAuth } from '../../lib/AuthContext';
import { Colors } from '../../constants/Colors'

export default function ManagerOnlyScreen() {
  const { signOut } = useAuth();

  const handleLogout = async () => {
    await signOut();
  }

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: Colors.background,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 24,
      }}
    >
      <Text
        style={{
          color: Colors.status.warning,
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
          color: Colors.text.secondary,
          fontSize: 14,
          textAlign: 'center',
          marginBottom: 24,
        }}
      >
        This mobile application is available only for users with the Manager role.
      </Text>
      <TouchableOpacity
        onPress={handleLogout}
        style={{
          borderRadius: 8,
          borderWidth: 1,
          borderColor: '#4b5563',
          paddingHorizontal: 16,
          paddingVertical: 10,
        }}
      >
        <Text style={{ color: Colors.text.secondary, fontWeight: '600' }}>Log out</Text>
      </TouchableOpacity>
    </View>
  );
}