import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useRouter } from 'expo-router';
import AppShell from '../../../components/layout/AppShell';
import { supabase } from '../../../lib/supabase';
import { Colors } from '../../../constants/Colors'

export default function ClientsListScreen() {
  const [loading, setLoading] = useState(true);
  const [clients, setClients] = useState([]);
  const router = useRouter();

  useEffect(() => {
    async function loadClients() {
      setLoading(true);
      const { data, error } = await supabase
        .from('clients')
        .select('id, name, nip, created_at')
        .is('deleted_at', null)
        .order('created_at', { ascending: false })
        .limit(20);

      if (!error) {
        setClients(data ?? []);
      }
      setLoading(false);
    }
    loadClients();
  }, []);

  function renderItem({ item }) {
    return (
      <TouchableOpacity
        onPress={() => router.push(`/clients/${item.id}`)}
        style={{
          backgroundColor: Colors.background,
          borderRadius: 12,
          padding: 16,
          borderWidth: 1,
          borderColor: Colors.border,
          marginBottom: 12,
        }}
      >
        <Text style={{ color: Colors.text.secondary, fontSize: 16, fontWeight: '600', marginBottom: 4 }}>
          {item.name}
        </Text>
        <Text style={{ color: Colors.text.muted, fontSize: 12 }}>NIP: {item.nip}</Text>
        <Text style={{ color: Colors.text.subtle, fontSize: 12, marginTop: 4 }}>
          Created at: {item.created_at?.slice(0, 10)}
        </Text>
      </TouchableOpacity>
    );
  }

  return (
    <AppShell>
      <View style={{ flex: 1, paddingHorizontal: 16, paddingTop: 16 }}>
        {loading ? (
          <ActivityIndicator color={Colors.primary} />
        ) : (
          <FlatList
            data={clients}
            keyExtractor={(item) => item.id}
            renderItem={renderItem}
            contentContainerStyle={{ paddingBottom: 24 }}
          />
        )}
      </View>
    </AppShell>
  );
}