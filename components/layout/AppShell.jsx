import React from 'react';
import { View } from 'react-native';
import TopBar from './TopBar';

export default function AppShell({ children }) {
  return (
    <View style={{ flex: 1, backgroundColor: '#020617' }}>
      <TopBar />
      <View style={{ flex: 1 }}>{children}</View>
    </View>
  );
}
