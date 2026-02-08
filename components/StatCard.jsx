import React from 'react';
import { View, Text } from 'react-native';
import { Colors } from '../constants/Colors'

export default function StatCard({ label, value, description, valueColor }) {
  return (
    <View
      style={{
        backgroundColor: Colors.background,
        borderRadius: 12,
        padding: 16,
        borderWidth: 1,
        borderColor: Colors.border,
        marginBottom: 12,
      }}
    >
      <Text style={{ color: Colors.text.muted, fontSize: 12 }}>{label}</Text>
      <Text
        style={{
          color: Colors.text.secondary,
          fontSize: 20,
          fontWeight: '700',
          marginTop: 4,
          color: valueColor ? valueColor : Colors.text.white,
        }}
      >
        {value}
      </Text>
      {description ? (
        <Text
          style={{
            color: Colors.text.subtle,
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