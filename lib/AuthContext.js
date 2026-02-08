import React, { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from './supabase';

export const AuthContext = createContext({
  session: null,
  isManagerOrAdmin: false,
  profile: null,
  logoUrl: null,
  brandName: null,
  loading: true,
  signOut: async () => {},
});

export const useAuth = () => useContext(AuthContext);

export function AuthProvider({ children }) {
  const [session, setSession] = useState(null);
  const [isManagerOrAdmin, setIsManagerOrAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState(null);
  const [logoUrl, setLogoUrl] = useState(null);
  const [brandName, setBrandName] = useState(null);

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

        const { data: contentData } = await supabase
          .from('site_content')
          .select('key, value')
          .in('key', ['nav_brand_logo', 'nav_brand_name']);

        if (contentData) {
          const logoItem = contentData.find(item => item.key === 'nav_brand_logo');
          const nameItem = contentData.find(item => item.key === 'nav_brand_name');

          if (logoItem?.value) setLogoUrl(logoItem.value);
          if (nameItem?.value) setBrandName(nameItem.value);
        }

      } catch (error) {
        console.error('Init error:', error);
      } finally {
        setLoading(false);
      }
    }

    init();

    //listener if session change
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

  async function signOut() {
    await supabase.auth.signOut();
    setSession(null);
    setIsManagerOrAdmin(false);
  }

  const authValue = { session, isManagerOrAdmin, profile, logoUrl, brandName, loading, signOut };

  return <AuthContext.Provider value={authValue}>{children}</AuthContext.Provider>;
}