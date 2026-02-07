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
