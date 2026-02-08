import React from 'react';
import { View, Text } from 'react-native';

export default function StatCard({ label, value, description, valueColor }) {
  return (
    <View
      style={{
        backgroundColor: '#020617',
        borderRadius: 12,
        padding: 16,
        borderWidth: 1,
        borderColor: '#1e293b',
        marginBottom: 12,
      }}
    >
      <Text style={{ color: '#9ca3af', fontSize: 12 }}>{label}</Text>
      <Text
        style={{
          color: '#e5e7eb',
          fontSize: 20,
          fontWeight: '700',
          marginTop: 4,
          color: valueColor ? valueColor : '#ffffff',
        }}
      >
        {value}
      </Text>
      {description ? (
        <Text
          style={{
            color: '#6b7280',
            fontSize: 12,
            marginTop: 4,
          }}
        >
          {description}
        </Text>
      ) : null}
    </View>
  );
}