import React, { useEffect, useState, createContext, useContext } from 'react';
import { ActivityIndicator, View } from 'react-native';
import { Stack, useRouter } from 'expo-router';
import { supabase } from '../lib/supabase';

const AuthContext = createContext(null);

export function useAuth() {
  return useContext(AuthContext);
}

export default function RootLayout() {
  const [session, setSession] = useState(null);
  const [isManager, setIsManager] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [profile, setProfile] = useState(null);
  const [logoUrl, setLogoUrl] = useState(null);

  const router = useRouter();

  useEffect(() => {
    async function init() {
      try {
        const { data, error } = await supabase.auth.getSession();
        if (!error) {
          const currentSession = data?.session ?? null;
          setSession(currentSession);
          if (currentSession?.user?.id) {
            await loadUserData(currentSession.user.id);
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
        console.error('RootLayout init error', error);
      } finally {
        setIsLoading(false);
      }
    }

    async function loadUserData(userId) {
      const { data: userRow } = await supabase
        .from('users')
        .select('id, email, role_id')
        .eq('id', userId)
        .single();

      if (!userRow) {
        setIsManager(false);
        return;
      }

      const { data: roleRow } = await supabase
        .from('roles')
        .select('code, name')
        .eq('id', userRow.role_id)
        .single();

      setIsManager(roleRow?.code === 'manager');

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
        firstName: profileRow?.first_name,
        lastName: profileRow?.last_name,
      });
    }

    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, newSession) => {
    setSession(newSession);
    
    if (newSession?.user) {
      await loadUserData(newSession.user.id);
      if (event === 'SIGNED_IN') {
        router.replace('/dashboard');
      }
    } else {
      setIsManager(false);
      setProfile(null);
      router.replace('/auth/login');
    }
  });

    init();

    return () => subscription.unsubscribe();
  }, []);

  async function signOut() {
  try {
    await supabase.auth.signOut();
    setSession(null);
    setIsManager(false);
    setProfile(null);
    
    router.replace('/auth/login'); 
  } catch (error) {
    console.error("Login error:", error);
  }
}

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

  const authValue = { session, isManager, profile, logoUrl, signOut };

  if (!session) {
    return (
      <AuthContext.Provider value={authValue}>
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="auth/login" />
        </Stack>
      </AuthContext.Provider>
    );
  }

  if (!isManager) {
    return (
      <AuthContext.Provider value={authValue}>
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="auth/manager-only" />
        </Stack>
      </AuthContext.Provider>
    );
  }

  return (
  <AuthContext.Provider value={authValue}>
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="auth" options={{ headerShown: false }} />
      <Stack.Screen name="protected" options={{ headerShown: false }} />
    </Stack>
  </AuthContext.Provider>
);
}