import React from 'react';
import { View } from 'react-native';
import { Colors } from '../../constants/Colors'

export default function AppShell({ children }) {
  return (
    <View style={{
      flex: 1,
      backgroundColor: Colors.appBackground,
      }}>
      <View style={{ flex: 1 }}>{children}</View>
    </View>
  );
}