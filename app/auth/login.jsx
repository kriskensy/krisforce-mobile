import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ActivityIndicator, Alert, Platform, ScrollView, KeyboardAvoidingView } from 'react-native';
import { supabase } from '../../lib/supabase';
import { Eye, EyeOff } from 'lucide-react-native';
import { useAuth } from '../../lib/AuthContext';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const { brandName } = useAuth();

  async function handleLogin() {
    if (!email || !password) {
      Alert.alert('Error', 'Please enter email and password.');
      return;
    }
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    setLoading(false);

    if (error) {
      Alert.alert('Login failed', error.message);
    }
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}//ios can't handle displaying keyboard correct
      style={{ flex: 1, backgroundColor: '#020617' }}
    >
      <ScrollView
        contentContainerStyle={{ 
            flexGrow: 1, 
            alignItems: 'center', 
            justifyContent: 'center', 
            paddingHorizontal: 24,
            paddingBottom: 40
        }}
        keyboardShouldPersistTaps="handled" //button click even if keyboard is open
      >
      <Text style={{ color: '#f9fafb', fontSize: 24, fontWeight: '700', marginBottom: 24, }} >
        {brandName || 'KrisForce'} Manager
      </Text>

      <TextInput
        placeholder="Email"
        placeholderTextColor="#6b7280"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
        style={{
          width: '100%',
          borderRadius: 8,
          borderWidth: 1,
          borderColor: '#1f2937',
          paddingHorizontal: 12,
          paddingVertical: 10,
          color: '#f9fafb',
          marginBottom: 12,
          backgroundColor: '#020617',
        }}
      />

      <View 
        style={{
            width: '100%',
            flexDirection: 'row',
            alignItems: 'center',
            borderRadius: 8,
            borderWidth: 1,
            borderColor: '#1f2937',
            backgroundColor: '#020617',
            marginBottom: 16,
        }}
      >
        <TextInput
          placeholder="Password"
          placeholderTextColor="#6b7280"
          value={password}
          onChangeText={setPassword}
          secureTextEntry={!showPassword} 
          style={{
            flex: 1,
            paddingHorizontal: 12,
            paddingVertical: 10,
            color: '#f9fafb',
          }}
        />
        
        <TouchableOpacity 
          onPress={() => setShowPassword(!showPassword)}
          style={{ padding: 10 }}
        >
          {showPassword ? (
            <EyeOff size={20} color="#6b7280" />
          ) : (
            <Eye size={20} color="#6b7280" />
          )}
        </TouchableOpacity>
      </View>

        <TouchableOpacity
          onPress={handleLogin}
          disabled={loading}
          style={{
            width: '100%',
            borderRadius: 8,
            backgroundColor: loading ? '#0ea5e9aa' : '#0ea5e9',
            paddingVertical: 12,
            alignItems: 'center',
          }}
        >
          {loading ? (
            <ActivityIndicator color="#f9fafb" />
          ) : (
            <Text style={{ color: '#f9fafb', fontWeight: '600' }}>Log in</Text>
          )}
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}