import React from 'react';
import { View } from 'react-native';

export default function AppShell({ children }) {

  return (
    <View style={{
      flex: 1,
      backgroundColor: '#0f172af2',
      }}>
      <View style={{ flex: 1 }}>{children}</View>
    </View>
  );
}