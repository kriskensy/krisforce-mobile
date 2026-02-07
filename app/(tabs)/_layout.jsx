import { Tabs } from 'expo-router';
import { View, Text, Image } from 'react-native';
import { useAuth } from '../_layout';
import { LayoutDashboard, Layers, Menu as MenuIcon } from 'lucide-react-native';

function GlobalHeader() {
  const { profile } = useAuth();
  return (
    <View className="bg-[#020617] pt-14 pb-4 px-6 border-b border-slate-800 flex-row items-center justify-between">
      <View className="flex-row items-center">
        <View className="w-10 h-10 bg-sky-500 rounded-xl items-center justify-center mr-3">
          <Text className="text-white font-bold">{profile?.firstName?.[0]}{profile?.lastName?.[0]}</Text>
        </View>
        <View>
          <Text className="text-slate-400 text-[10px] uppercase font-bold tracking-widest">Manager</Text>
          <Text className="text-white font-bold text-base">{profile?.firstName} {profile?.lastName}</Text>
        </View>
      </View>
    </View>
  );
}

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        header: () => <GlobalHeader />,
        tabBarStyle: { 
            backgroundColor: '#020617', 
            borderTopColor: '#1e293b',
            height: 90,
            paddingBottom: 30
        },
        tabBarActiveTintColor: '#38bdf8',
        tabBarInactiveTintColor: '#64748b',
      }}
    >
      <Tabs.Screen
        name="dashboard"
        options={{
          title: 'Dashboard',
          tabBarIcon: ({ color }) => <LayoutDashboard size={24} color={color} />,
        }}
      />
      <Tabs.Screen
        name="categories"
        options={{
          title: 'Categories',
          tabBarIcon: ({ color }) => <Layers size={24} color={color} />,
        }}
      />
      <Tabs.Screen
        name="menu"
        options={{
          title: 'Menu',
          tabBarIcon: ({ color }) => <MenuIcon size={24} color={color} />,
        }}
      />
    </Tabs>
  );
}