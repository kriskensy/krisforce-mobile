import React from 'react';
import { View, Text, Image } from 'react-native';
import { useAuth } from '../../app/_layout';

export default function TopBar() {
  const { profile, logoUrl } = useAuth();

  const fullName = profile
    ? `${profile.firstName ?? ''} ${profile.lastName ?? ''}`.trim()
    : '';

  return (
    <View
      style={{
        height: 64,
        paddingHorizontal: 16,
        paddingVertical: 8,
        backgroundColor: '#020617',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}
    >
      <View>
        <Text style={{ color: '#9ca3af', fontSize: 12 }}>Logged in as</Text>
        <Text style={{ color: '#f9fafb', fontSize: 16, fontWeight: '600' }}>
          {fullName || 'Manager'}
        </Text>
      </View>
      {logoUrl ? (
        <Image
          source={{ uri: logoUrl }}
          style={{ width: 120, height: 32, resizeMode: 'contain' }}
        />
      ) : (
        <Text style={{ color: '#38bdf8', fontSize: 18, fontWeight: '700' }}>
          KrisForce
        </Text>
      )}
    </View>
  );
}
