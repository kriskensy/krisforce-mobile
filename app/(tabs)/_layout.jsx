import { Tabs } from 'expo-router';
import { LayoutDashboard, Layers, Menu as MenuIcon } from 'lucide-react-native';
import { Colors } from '../../constants/Colors'

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
            backgroundColor: Colors.background,
            borderTopColor: Colors.border,
            height: 90,
            paddingBottom: 30
        },
        tabBarActiveTintColor: Colors.icon.active,
        tabBarInactiveTintColor: Colors.icon.default,
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