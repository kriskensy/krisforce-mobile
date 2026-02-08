import React from 'react';
import { View } from 'react-native';
import { useRouter } from 'expo-router';
import AppShell from '../../components/layout/AppShell';
import CategoryCard from '../../components/CategoryCard';

export default function CategoriesScreen() {
  const router = useRouter();

  return (
    <AppShell>
      <View style={{ flex: 1, paddingHorizontal: 16, paddingTop: 16 }}>
        <CategoryCard
          label="Clients"
          description="View last added clients."
          onPress={() => router.push('/(protected)/clients')}
        />
        <CategoryCard
          label="Invoices"
          description="Monitor latest invoices."
          onPress={() => router.push('/(protected)/invoices')}
        />
        <CategoryCard
          label="Tickets"
          description="Follow recent support tickets."
          onPress={() => router.push('/(protected)/tickets')}
        />
      </View>
    </AppShell>
  );
}