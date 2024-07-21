import React from 'react';
import { Tabs } from 'expo-router';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Feather } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';

export default function TabLayout() {
  const colorScheme = useColorScheme();
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ focused, color, size }) => {
            return <Feather name="home" size={size} color={color} />;
          },
        }}
      />
      <Tabs.Screen
        name="category"
        options={{
          headerShown: false,
          title: 'Category',
          tabBarIcon: ({ focused, color, size }) => {
            return <MaterialIcons name="category" size={size} color={color} />;
          },
        }}
      />
    </Tabs>
  );
}
