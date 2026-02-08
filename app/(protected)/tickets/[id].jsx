import React, { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import { User, Clock } from 'lucide-react-native';
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
        .select(`id, ticket_number, subject, clients(name), description, created_at, ticket_statuses(name, code), ticket_priorities(name, code), ticket_comments(id, message, created_at, user_profiles(first_name, last_name))`)
        .eq('id', id)
        .order('created_at', { foreignTable: 'ticket_comments', ascending: false })
        .single();

      if (!error && data) {
        setTicket({
          id: data.id,
          ticketNumber: data.ticket_number,
          subject: data.subject,
          clientName: data.clients?.name,
          description: data.description,
          createdAt: data.created_at,
          statusName: data.ticket_statuses?.name,
          statusCode: data.ticket_statuses?.code,
          priorityName: data.ticket_priorities?.name,
          priorityCode: data.ticket_priorities?.code,
          comments: data.ticket_comments || [],
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
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }} >
          <ActivityIndicator color="#0ea5e9" />
        </View>
      </AppShell>
    );
  }

  if (!ticket) {
    return (
      <AppShell>
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }} >
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
          <Text style={{ color: '#e5e7eb', fontSize: 20, fontWeight: '700', marginBottom: 8 }} >
            {ticket.ticketNumber}
          </Text>
          <Text style={{ color: '#e5e7eb', fontSize: 18, fontWeight: '700', marginBottom: 8 }} >
            {ticket.subject}
          </Text>

          <Text style={{ color: '#9ca3af', fontSize: 16 }}>
            Client: {ticket.clientName ||  '—'}
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
            <Text style={{ color: '#e5e7eb', fontSize: 14, marginTop: 12 }} >
              {ticket.description}
            </Text>
          ) : null}
          
          {/* comments line */}
          <View style={{ height: 1, backgroundColor: '#334155', marginVertical: 24, width: '100%'}} />

          <Text style={{ color: '#f8fafc', fontSize: 18, fontWeight: '600', marginBottom: 16 }}>
            Comments ({ticket.comments.length})
          </Text>

          {ticket.comments.length === 0 ? (
            <Text style={{ color: '#64748b', fontStyle: 'italic' }}>No comments yet.</Text>
          ) : (
            <View style={{ gap: 16 }}>
              {ticket.comments.map((comment) => {

                const firstName = comment.user_profiles?.first_name || '';
                const lastName = comment.user_profiles?.last_name || '';
                const userFullName = (firstName || lastName)  ? `${firstName} ${lastName}`.trim() : 'Unknown User';

                return (
                  <View key={comment.id} style={{ backgroundColor: '#1e293b', borderRadius: 12, padding: 12 }} >
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 6 }}>
                      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
                          <User size={14} color="#94a3b8" />
                          <Text style={{ color: '#0ea5e9', fontSize: 13, fontWeight: '600' }}>
                              {userFullName}
                          </Text>
                      </View>
                      <Text style={{ color: '#64748b', fontSize: 12 }}>
                          {comment.created_at?.slice(0, 16).replace('T', ' ')}
                      </Text>
                    </View>

                    <Text style={{ color: '#e2e8f0', fontSize: 14, lineHeight: 20 }}>
                      {comment.message}
                    </Text>
                  </View>
                );
              })}
            </View>
          )}
        </View>
      </View>
    </AppShell>
  );
}