import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ActivityIndicator, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { supabase } from '../../lib/supabase';
import { useRouter } from 'expo-router';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  const router = useRouter();

  async function signInWithEmail() {
    setLoading(true);
    setError(null);
    
    try {
      const { error: authError } = await supabase.auth.signInWithPassword({
        email: email,
        password: password,
      });

      if (authError) {
        setError("Invalid email or password");
      }
    } catch (err) {
      setError("An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  }

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'} 
      className="flex-1 bg-white"
    >
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View className="flex-1 justify-center px-6 py-12">
          
          {/* Header */}
          <View className="mb-10">
            <Text className="text-3xl font-bold text-slate-900 tracking-tight">
              KrisForce Mobile
            </Text>
            <Text className="text-slate-500 text-lg mt-2">
              Manager Portal
            </Text>
          </View>

          {/* Form */}
          <View className="space-y-4">
            <View>
              <Text className="text-sm font-medium text-slate-700 mb-2 ml-1">
                Email Address
              </Text>
              <TextInput
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-4 text-slate-900"
                placeholder="manager@krisforce.com"
                value={email}
                onChangeText={setEmail}
                autoCapitalize="none"
                keyboardType="email-address"
                placeholderTextColor="#94a3b8"
              />
            </View>

            <View className="mt-4">
              <Text className="text-sm font-medium text-slate-700 mb-2 ml-1">
                Password
              </Text>
              <TextInput
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-4 text-slate-900"
                placeholder="••••••••"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
                placeholderTextColor="#94a3b8"
              />
            </View>

            {error && (
              <View className="bg-red-50 border border-red-100 p-3 rounded-lg mt-4">
                <Text className="text-red-600 text-sm text-center font-medium">
                  {error}
                </Text>
              </View>
            )}

            <TouchableOpacity
              onPress={signInWithEmail}
              disabled={loading}
              activeOpacity={0.8}
              className={`w-full rounded-xl py-4 mt-8 flex-row justify-center items-center ${
                loading ? 'bg-slate-400' : 'bg-slate-900'
              }`}
            >
              {loading ? (
                <ActivityIndicator color="white" />
              ) : (
                <Text className="text-white font-semibold text-lg">Log In</Text>
              )}
            </TouchableOpacity>
          </View>

          {/* Footer */}
          <View className="mt-12">
            <Text className="text-center text-slate-400 text-sm">
              Authorized personnel only.
            </Text>
          </View>

        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}