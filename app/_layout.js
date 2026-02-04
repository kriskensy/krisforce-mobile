import { useEffect, useState } from 'react';
import { Slot, useRouter, useSegments } from 'expo-router';
import { View, ActivityIndicator } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { supabase } from '../lib/supabase';

export default function RootLayout() {
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isManager, setIsManager] = useState(false);
  
  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    //get session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      if (session) {
        checkUserRole(session.user.id);
      } else {
        setLoading(false);
      }
    });

    const { data: authListener } = supabase.auth.onAuthStateChange(async (event, session) => {
      setSession(session);
      if (session)
        await checkUserRole(session.user.id);

      if (!session) {
        setIsManager(false);
        setLoading(false);
      }
    });

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  const checkUserRole = async (userId) => {
    try {
      const { data, error } = await supabase
        .from('users')
        .select(`role_id, roles!inner ( code )`)
        .eq('id', userId)
        .single();

      if (data && data.roles.code === 'manager') {
        setIsManager(true);
      } else {
        setIsManager(false);
        await supabase.auth.signOut();
      }
    } catch (err) {
      console.error("Role verification error:", err);
    } finally {
      setLoading(false);
    }
  };

  //auth guard
  useEffect(() => {
    if (loading) return;

    const inAuthGroup = segments[0] === '(auth)';

    if (!session && !inAuthGroup)
      router.replace('/(auth)/login');

    if (session && !isManager && !inAuthGroup) {
      alert("Access restricted to Managers only.");
      supabase.auth.signOut();
      router.replace('/(auth)/login');
    }
    if (session && isManager && inAuthGroup)
      router.replace('/(tabs)/dashboard');

  }, [session, loading, isManager, segments]);

  if (loading) {
    return (
      <View className="flex-1 justify-center items-center bg-white">
        <ActivityIndicator size="large" color="#0f172a" />
      </View>
    );
  }

  return (
    <SafeAreaProvider>
      <View className="flex-1 bg-white">
        <StatusBar style="dark" />
        <Slot />
      </View>
    </SafeAreaProvider>
  );
}