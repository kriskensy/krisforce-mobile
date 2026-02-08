import "../global.css";
import React, { useEffect } from 'react';
import { ActivityIndicator, View } from 'react-native';
import { Stack, useRouter, useSegments } from 'expo-router';
import { SafeAreaProvider } from "react-native-safe-area-context";
import { StatusBar } from 'expo-status-bar';
import TopBar from '../components/layout/TopBar';
import { AuthProvider, useAuth } from '../lib/AuthContext';
import { Colors } from '../constants/Colors'

function RootLayoutNav() {
  const {session, loading, isManagerOrAdmin} = useAuth();
  const router = useRouter();
  const segments = useSegments();

  //redirect for non manager/admin users
  useEffect(() => {
    if (loading) return;

    const inAuthGroup = segments[0] === 'auth';
    const isManagerScreen = segments[1] === 'manager-only';//check if user is on manager-only screen

    if (!session && (!inAuthGroup || isManagerScreen))
      router.replace('/auth/login');

    if (session && !isManagerOrAdmin && !isManagerScreen)
      router.replace('/auth/manager-only');
    
    if (session && isManagerOrAdmin && inAuthGroup)
      router.replace('/(tabs)/dashboard');

  }, [session, segments, loading, isManagerOrAdmin]);

  //spinner
  if (loading) {
    return (
      <View style={{ flex: 1, backgroundColor: Colors.background, alignItems: 'center', justifyContent: 'center' }} >
        <ActivityIndicator size="large" color={Colors.primary} />
      </View>
    );
  }

  return (
    <SafeAreaProvider>
      <StatusBar style="light" backgroundColor={Colors.text.primary} />
      
      <Stack screenOptions={{
        header: () => <TopBar />,
        contentStyle: { backgroundColor: Colors.text.primary }
      }}>
        <Stack.Screen name="auth" options={{ headerShown: false }} />

        {isManagerOrAdmin ? (
          <>
            <Stack.Screen name="(tabs)" options={{ headerShown: true }} />
            <Stack.Screen name="protected" options={{ headerShown: true }} />
          </>
        ) : (
          <Stack.Screen name="(tabs)" options={{ href: null }} />
        )}
      </Stack>
    </SafeAreaProvider>
  );
}

export default function RootLayout() {
  return (
    <AuthProvider>
      <RootLayoutNav />
    </AuthProvider>
  )
}