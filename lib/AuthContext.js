import React, { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from './supabase';
import { contentData } from './data/content';
import { authData } from './data/auth';

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
        //get session
        const { data } = await authData.getSession();
        
        if (data?.session) {
          setSession(data.session);
          if (data.session.user) {

             const userProfile = await authData.getUserProfile(data.session.user.id);
             if (userProfile) {
                setProfile(userProfile);
                setIsManagerOrAdmin(userProfile.isManagerOrAdmin);
             }
          }
        }

        //get brand info
        const { logoUrl: logo, brandName: brand } = await contentData.getBrandInfo();
        if (logo) setLogoUrl(logo);
        if (brand) setBrandName(brand);

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
        const userProfile = await authData.getUserProfile(newSession.user.id);
        if (userProfile) {
            setProfile(userProfile);
            setIsManagerOrAdmin(userProfile.isManagerOrAdmin);
        } 
      } else {
        setIsManagerOrAdmin(false);
        setProfile(null);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  async function signOut() {
    await supabase.auth.signOut();
    setSession(null);
    setIsManagerOrAdmin(false);
  }

  const authValue = { session, isManagerOrAdmin, profile, logoUrl, brandName, loading, signOut };

  return <AuthContext.Provider value={authValue}>{children}</AuthContext.Provider>;
}