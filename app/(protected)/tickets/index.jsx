import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useRouter } from 'expo-router';
import AppShell from '../../../components/layout/AppShell';
import { supabase } from '../../../lib/supabase';

export default function TicketsListScreen() {
  const [loading, setLoading] = useState(true);
  const [tickets, setTickets] = useState([]);
  const router = useRouter();

  useEffect(() => {
    async function loadTickets() {
      setLoading(true);

      const { data, error } = await supabase
        .from('tickets')
        .select(`id, subject, created_at, ticket_statuses(name, code), ticket_priorities(name, code)`)
        .is('deleted_at', null)
        .order('created_at', { ascending: false })
        .limit(20);

      if (!error) {
        setTickets(
          (data ?? []).map((row) => ({
            id: row.id,
            subject: row.subject,
            createdAt: row.created_at,
            statusName: row.ticket_statuses?.name,
            statusCode: row.ticket_statuses?.code,
            priorityName: row.ticket_priorities?.name,
            priorityCode: row.ticket_priorities?.code,
          })),
        );
      }

      setLoading(false);
    }

    loadTickets();
  }, []);

  function renderItem({ item }) {
    return (
      <TouchableOpacity
        onPress={() => router.push(`/tickets/${item.id}`)}
        style={{
          backgroundColor: '#020617',
          borderRadius: 12,
          padding: 16,
          borderWidth: 1,
          borderColor: '#1e293b',
          marginBottom: 12,
        }}
      >
        <Text
          style={{
            color: '#e5e7eb',
            fontSize: 16,
            fontWeight: '600',
            marginBottom: 4,
          }}
          numberOfLines={1}
        >
          {item.subject}
        </Text>
        <Text style={{ color: '#9ca3af', fontSize: 12 }}>
          Status: {item.statusName || item.statusCode || '—'}
        </Text>
        <Text style={{ color: '#9ca3af', fontSize: 12, marginTop: 2 }}>
          Priority: {item.priorityName || item.priorityCode || '—'}
        </Text>
        <Text style={{ color: '#6b7280', fontSize: 12, marginTop: 4 }}>
          Created at: {item.createdAt?.slice(0, 19).replace('T', ' ')}
        </Text>
      </TouchableOpacity>
    );
  }

  return (
    <AppShell>
      <View style={{ flex: 1, paddingHorizontal: 16, paddingTop: 16 }}>
        {loading ? (
          <ActivityIndicator color="#0ea5e9" />
        ) : (
          <FlatList
            data={tickets}
            keyExtractor={(item) => item.id}
            renderItem={renderItem}
            contentContainerStyle={{ paddingBottom: 24 }}
          />
        )}
      </View>
    </AppShell>
  );
}