import "../global.css";
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, View } from 'react-native';
import { Stack, useRouter, useSegments } from 'expo-router';
import { supabase } from '../lib/supabase';
import { SafeAreaProvider } from "react-native-safe-area-context";
import { StatusBar } from 'expo-status-bar';
import TopBar from '../components/layout/TopBar';
import { AuthContext } from '../lib/AuthContext'; 

export default function RootLayout() {
  const [session, setSession] = useState(null);
  const [isManagerOrAdmin, setIsManagerOrAdmin] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [profile, setProfile] = useState(null);
  const [logoUrl, setLogoUrl] = useState(null);

  const router = useRouter();
  const segments = useSegments();

  //initial data
  useEffect(() => {
    async function init() {
      try {
        const { data, error } = await supabase.auth.getSession();
        if (!error && data?.session) {
          setSession(data.session);
          if (data.session.user) {
            await loadUserData(data.session.user.id);
          }
        }
        
        const { data: logoData } = await supabase
          .from('site_content')
          .select('value')
          .eq('key', 'nav_brand_logo')
          .single();

        if (logoData?.value) {
          setLogoUrl(logoData.value);
        }

      } catch (error) {
        console.error('Init error:', error);
      } finally {
        setIsLoading(false);
      }
    }

    init();

    //if session change
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (_event, newSession) => {
      setSession(newSession);
      if (newSession?.user) {
        await loadUserData(newSession.user.id);
      } else {
        setIsManagerOrAdmin(false);
        setProfile(null);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  async function loadUserData(userId) {
    try {
      const { data: userRow } = await supabase
        .from('users')
        .select('id, email, role_id, created_at')
        .eq('id', userId)
        .single();

      if (userRow) {
        const { data: roleRow } = await supabase
          .from('roles')
          .select('code, name')
          .eq('id', userRow.role_id)
          .single();
        
        setIsManagerOrAdmin(roleRow?.code === 'manager' || roleRow?.code === 'admin');

        const { data: profileRow } = await supabase
          .from('user_profiles')
          .select('first_name, last_name')
          .eq('user_id', userRow.id)
          .single();
        
        setProfile({
          id: userRow.id,
          email: userRow.email,
          roleCode: roleRow?.code,
          roleName: roleRow?.name,
          createdAt: userRow?.created_at,
          firstName: profileRow?.first_name,
          lastName: profileRow?.last_name,
        });
      }
    } catch (error) {
      console.error("Error loading user data", error);
    }
  }

  //redirect for non manager/admin users
  useEffect(() => {
    if (isLoading) return;

    const inAuthGroup = segments[0] === 'auth';
    const isManagerScreen = segments[1] === 'manager-only';//check if user is on manager-only screen

    if (!session && (!inAuthGroup || isManagerScreen))
      router.replace('/auth/login');

    if (session && !isManagerOrAdmin && !isManagerScreen)
      router.replace('/auth/manager-only');
    
    if (session && isManagerOrAdmin && inAuthGroup)
      router.replace('/(tabs)/dashboard');

  }, [session, segments, isLoading, isManagerOrAdmin]);

  async function signOut() {
    await supabase.auth.signOut();
    setSession(null); 
    setIsManagerOrAdmin(false);
  }

  //spinner
  if (isLoading) {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: '#020617',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <ActivityIndicator size="large" color="#0ea5e9" />
      </View>
    );
  }

  const authValue = { session, isManagerOrAdmin, profile, logoUrl, signOut };

  return (
    <AuthContext.Provider value={authValue}>
      <SafeAreaProvider>
        <StatusBar style="light" backgroundColor="#f3f4f6" />
        
        <Stack screenOptions={{
          header: () => <TopBar />,
          contentStyle: { backgroundColor: '#f3f4f6' }
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
    </AuthContext.Provider>
  );
}
