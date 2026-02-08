import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import AppShell from '../../components/layout/AppShell';
import { useAuth } from '../../lib/AuthContext';
import { formatDate } from '../../lib/utils/formatDate';

export default function MenuScreen() {
  const { profile, signOut } = useAuth();

  const userRole = profile ? `${profile.roleName}` : '';

  return (
    <AppShell>
      <View
        style={{
          flex: 1,
          paddingHorizontal: 16,
          paddingTop: 24,
          backgroundColor: '#0f172af2',
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
            {userRole} summary
          </Text>
          <Text
            style={{
              color: '#e5e7eb',
              fontSize: 18,
              fontWeight: '700',
              marginBottom: 8,
            }}
          >
            {profile ? `${profile.firstName ?? ''} ${profile.lastName ?? ''}`.trim() : '—'}
          </Text>
          <Text style={{ color: '#9ca3af', fontSize: 13 }}>
            Role: {profile?.roleName || profile?.roleCode || '-'}
          </Text>
          <Text style={{ color: '#9ca3af', fontSize: 13, marginTop: 4 }}>
            Email: {profile?.email || '—'}
          </Text>
          <Text style={{ color: '#9ca3af', fontSize: 13, marginTop: 4 }}>
            Registered since: {formatDate(profile?.createdAt)}
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