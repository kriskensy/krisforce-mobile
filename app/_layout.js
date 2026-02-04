import { useEffect, useState } from 'react';
import { Slot, useRouter, useSegments } from 'expo-router';
import { View, ActivityIndicator } from 'react-native';
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
      if (session) checkUserRole(session.user.id);
      if (!session) setLoading(false);
    });

    const { data: authListener } = supabase.auth.onAuthStateChange(async (event, session) => {
      setSession(session);
      if (session) await checkUserRole(session.user.id);
      if (!session) {
        setIsManager(false);
        setLoading(false);
      }
    });

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  //check if manager
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
    } catch (error) {
      console.error("Error veryfication role:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (loading) return;

    const inAuthGroup = segments[0] === '(auth)';

    if (!session && !inAuthGroup)
      router.replace('/(auth)/login');

    if (session && !isManager && !inAuthGroup)
      alert("Access only for Managers.");
      supabase.auth.signOut();
      router.replace('/(auth)/login');

    if (session && isManager && inAuthGroup)
      router.replace('/(tabs)/dashboard');

  }, [session, loading, isManager, segments]);

  if (loading) {
    return (
      <View className="flex-1 justify-center items-center bg-white">
        <ActivityIndicator size="large" color="#000" />
      </View>
    );
  }

  return <Slot />;
}