import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { useAuth } from '../../lib/AuthContext';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Colors } from '../../constants/Colors'

export default function TopBar() {
  const { profile, logoUrl } = useAuth();
  const insets = useSafeAreaInsets();
  const router = useRouter();


  const fullName = profile ? `${profile.firstName ?? ''} ${profile.lastName ?? ''}`.trim() : '';
  const userRole = profile ? `${profile.roleName}` : '';

  return (
    <View
      style={{
        paddingTop: insets.top + 10,
        paddingBottom: 10,
        paddingHorizontal: 16,
        backgroundColor: Colors.background,
        borderBottomWidth: 1,
        borderBottomColor: Colors.border,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}
    >
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        {profile && (
          <View style={{ width: 40, height: 40, backgroundColor: Colors.primary, borderRadius: 12, alignItems: 'center', justifyContent: 'center', marginRight: 12 }}>
            <Text style={{ color: 'white', fontWeight: 'bold' }}>
              {profile?.firstName?.[0]}{profile?.lastName?.[0]}
            </Text>
          </View>
        )}
        <View>
          <Text style={{ color: Colors.text.muted, fontSize: 10, textTransform: 'uppercase', fontWeight: 'bold', letterSpacing: 1 }}>{userRole}</Text>
          <Text style={{ color: Colors.text.primary, fontSize: 16, fontWeight: 'bold' }}>
            {fullName}
          </Text>
        </View>
      </View>
      
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        {logoUrl && (
          <TouchableOpacity onPress={() => router.push('/(tabs)/dashboard')} activeOpacity={0.7}>
            <View style={{ width: 40, height: 40, borderRadius: 12, overflow: 'hidden'}}>
              <Image
                source={{ uri: logoUrl }}
                style={{ width: '100%', height: '100%', borderRadius: 12, resizeMode: 'contain', opacity: 0.8 }}
              />
            </View>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}