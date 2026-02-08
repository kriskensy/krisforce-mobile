import React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import { ChevronRight } from 'lucide-react-native';
import { Colors } from '../constants/Colors'

 export default function CategoryCard({ label, description, onPress, icon: Icon }) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        backgroundColor: Colors.background,
        borderRadius: 16,
        padding: 20,
        borderWidth: 1,
        borderColor: Colors.border,
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
            backgroundColor: Colors.primaryLight,
            alignItems: 'center',
            justifyContent: 'center',
            marginRight: 16,
          }}
        >
          <Icon size={24} color={Colors.primary} />
        </View>
      )}

      <View style={{ flex: 1 }}>
        <Text style={{ color: Colors.text.primary, fontSize: 16, fontWeight: '600', marginBottom: 4 }}>
          {label}
        </Text>
        <Text style={{ color: Colors.text.tertiary, fontSize: 13 }}>
          {description}
        </Text>
      </View>

      <ChevronRight size={20} color={Colors.icon.default} />
    </TouchableOpacity>
  );
}