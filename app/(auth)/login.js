import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ActivityIndicator, KeyboardAvoidingView, Platform, ScrollView, SafeAreaView } from 'react-native';
import { supabase } from '../../lib/supabase';
import { Mail, Lock, ShieldCheck } from 'lucide-react-native';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  async function signInWithEmail() {
    setLoading(true);
    setError(null);
    try {
      const { error: authError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (authError) setError("Invalid credentials. Please try again.");
    } catch (error) {
      setError("A connection error occurred.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <SafeAreaView className="flex-1 bg-white">
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'} 
        className="flex-1"
      >
        <ScrollView contentContainerStyle={{ flexGrow: 1 }} bounces={false}>
          <View className="flex-1 justify-center px-8 py-12">
            
            <View className="items-center mb-12">
              <View className="w-16 h-16 bg-slate-900 rounded-2xl items-center justify-center mb-4 shadow-sm">
                <ShieldCheck size={32} color="white" strokeWidth={2.5} />
              </View>
              <Text className="text-3xl font-bold text-slate-900 tracking-tight">
                KrisForce
              </Text>
              <Text className="text-slate-500 font-medium mt-1">
                Management Portal
              </Text>
            </View>

            {/* login: email */}
            <View className="mb-5">
              <Text className="text-sm font-semibold text-slate-700 mb-2 ml-1">
                Email Address
              </Text>
              <View className="flex-row items-center bg-slate-50 border border-slate-200 rounded-xl px-4 py-3.5">
                <Mail size={20} color="#64748b" strokeWidth={2} />
                <TextInput
                  className="flex-1 ml-3 text-slate-900 text-base"
                  placeholder="name@company.com"
                  placeholderTextColor="#94a3b8"
                  value={email}
                  onChangeText={setEmail}
                  autoCapitalize="none"
                  keyboardType="email-address"
                />
              </View>
            </View>

            {/* login: pw */}
            <View className="mb-8">
              <Text className="text-sm font-semibold text-slate-700 mb-2 ml-1">
                Password
              </Text>
              <View className="flex-row items-center bg-slate-50 border border-slate-200 rounded-xl px-4 py-3.5">
                <Lock size={20} color="#64748b" strokeWidth={2} />
                <TextInput
                  className="flex-1 ml-3 text-slate-900 text-base"
                  placeholder="••••••••"
                  placeholderTextColor="#94a3b8"
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry
                />
              </View>
            </View>

            {/* if error? */}
            {error && (
              <View className="bg-red-50 border border-red-100 p-4 rounded-xl mb-6">
                <Text className="text-red-600 text-sm font-medium text-center">
                  {error}
                </Text>
              </View>
            )}

            {/* button */}
            <TouchableOpacity
              onPress={signInWithEmail}
              disabled={loading}
              activeOpacity={0.9}
              className={`w-full rounded-xl py-4 flex-row justify-center items-center shadow-sm ${
                loading ? 'bg-slate-700' : 'bg-slate-900'
              }`}
            >
              {loading ? (
                <ActivityIndicator color="white" />
              ) : (
                <Text className="text-white font-bold text-lg">Sign In</Text>
              )}
            </TouchableOpacity>

            <Text className="text-center text-slate-400 text-xs mt-10 tracking-widest uppercase">
              Secure Manager Access
            </Text>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}