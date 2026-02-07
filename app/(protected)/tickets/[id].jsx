import React, { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import AppShell from '../../../components/layout/AppShell';
import { supabase } from '../../../lib/supabase';

export default function TicketDetailsScreen() {
  const { id } = useLocalSearchParams();
  const [loading, setLoading] = useState(true);
  const [ticket, setTicket] = useState(null);

  useEffect(() => {
    async function loadTicket() {
      setLoading(true);

      const { data, error } = await supabase
        .from('tickets')
        .select(
          `
          id,
          subject,
          description,
          created_at,
          ticket_statuses(name, code),
          ticket_priorities(name, code)
        `,
        )
        .eq('id', id)
        .single();

      if (!error && data) {
        setTicket({
          id: data.id,
          subject: data.subject,
          description: data.description,
          createdAt: data.created_at,
          statusName: data.ticket_statuses?.name,
          statusCode: data.ticket_statuses?.code,
          priorityName: data.ticket_priorities?.name,
          priorityCode: data.ticket_priorities?.code,
        });
      }

      setLoading(false);
    }

    if (id) {
      loadTicket();
    }
  }, [id]);

  if (loading) {
    return (
      <AppShell>
        <View
          style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <ActivityIndicator color="#0ea5e9" />
        </View>
      </AppShell>
    );
  }

  if (!ticket) {
    return (
      <AppShell>
        <View
          style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Text style={{ color: '#e5e7eb' }}>Ticket not found.</Text>
        </View>
      </AppShell>
    );
  }

  return (
    <AppShell>
      <View style={{ flex: 1, paddingHorizontal: 16, paddingTop: 16 }}>
        <View
          style={{
            backgroundColor: '#020617',
            borderRadius: 16,
            padding: 20,
            borderWidth: 1,
            borderColor: '#1e293b',
          }}
        >
          <Text
            style={{
              color: '#e5e7eb',
              fontSize: 20,
              fontWeight: '700',
              marginBottom: 8,
            }}
          >
            {ticket.subject}
          </Text>

          <Text style={{ color: '#9ca3af', fontSize: 14 }}>
            Status: {ticket.statusName || ticket.statusCode || '—'}
          </Text>
          <Text style={{ color: '#9ca3af', fontSize: 14, marginTop: 2 }}>
            Priority: {ticket.priorityName || ticket.priorityCode || '—'}
          </Text>
          <Text style={{ color: '#6b7280', fontSize: 13, marginTop: 8 }}>
            Created at: {ticket.createdAt?.slice(0, 19).replace('T', ' ')}
          </Text>

          {ticket.description ? (
            <Text
              style={{
                color: '#e5e7eb',
                fontSize: 14,
                marginTop: 12,
              }}
            >
              {ticket.description}
            </Text>
          ) : null}
        </View>
      </View>
    </AppShell>
  );
}
