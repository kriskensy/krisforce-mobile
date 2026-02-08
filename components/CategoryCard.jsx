import React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import { ChevronRight } from 'lucide-react-native';

 export default function CategoryCard({ label, description, onPress, icon: Icon }) {
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
        flexDirection: 'row',
        alignItems: 'center',
      }}
    >
      {Icon && (
        <View
          style={{
            width: 48,
            height: 48,
            borderRadius: 10,
            backgroundColor: '#0ea5e926',
            alignItems: 'center',
            justifyContent: 'center',
            marginRight: 16,
          }}
        >
          <Icon size={24} color="#0ea5e9" />
        </View>
      )}

      <View style={{ flex: 1 }}>
        <Text style={{ color: '#f8fafc', fontSize: 16, fontWeight: '600', marginBottom: 4 }}>
          {label}
        </Text>
        <Text style={{ color: '#94a3b8', fontSize: 13 }}>
          {description}
        </Text>
      </View>

      <ChevronRight size={20} color="#64748b" />
    </TouchableOpacity>
  );
}