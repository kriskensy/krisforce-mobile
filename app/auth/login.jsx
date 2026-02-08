import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ActivityIndicator, Alert, Platform, ScrollView, KeyboardAvoidingView } from 'react-native';
import { supabase } from '../../lib/supabase';
import { Eye, EyeOff } from 'lucide-react-native';
import { useAuth } from '../../lib/AuthContext';
import { Colors } from '../../constants/Colors'

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
      style={{ flex: 1, backgroundColor: Colors.background }}
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
      <Text style={{ color: Colors.text.primary, fontSize: 24, fontWeight: '700', marginBottom: 24, }} >
        {brandName || 'KrisForce'} Manager
      </Text>

      <TextInput
        placeholder="Email"
        placeholderTextColor={Colors.text.subtle}
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
        style={{
          width: '100%',
          borderRadius: 8,
          borderWidth: 1,
          borderColor: Colors.border,
          paddingHorizontal: 12,
          paddingVertical: 10,
          color: Colors.text.secondary,
          marginBottom: 12,
          backgroundColor: Colors.background,
        }}
      />

      <View 
        style={{
            width: '100%',
            flexDirection: 'row',
            alignItems: 'center',
            borderRadius: 8,
            borderWidth: 1,
            borderColor: Colors.border,
            backgroundColor: Colors.background,
            marginBottom: 16,
        }}
      >
        <TextInput
          placeholder="Password"
          placeholderTextColor={Colors.text.subtle}
          value={password}
          onChangeText={setPassword}
          secureTextEntry={!showPassword} 
          style={{
            flex: 1,
            paddingHorizontal: 12,
            paddingVertical: 10,
            color: Colors.text.secondary,
          }}
        />
        
        <TouchableOpacity 
          onPress={() => setShowPassword(!showPassword)}
          style={{ padding: 10 }}
        >
          {showPassword ? (
            <EyeOff size={20} color={Colors.text.subtle} />
          ) : (
            <Eye size={20} color={Colors.text.subtle} />
          )}
        </TouchableOpacity>
      </View>

        <TouchableOpacity
          onPress={handleLogin}
          disabled={loading}
          style={{
            width: '100%',
            borderRadius: 8,
            backgroundColor: loading ? Colors.status.info : Colors.primary,
            paddingVertical: 12,
            alignItems: 'center',
          }}
        >
          {loading ? (
            <ActivityIndicator color={Colors.status.info} />
          ) : (
            <Text style={{ color: Colors.text.secondary, fontWeight: '600' }}>Log in</Text>
          )}
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}