import React from 'react';
import { Text, TouchableOpacity } from 'react-native';

 export default function CategoryCard({ label, description, onPress }) {
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