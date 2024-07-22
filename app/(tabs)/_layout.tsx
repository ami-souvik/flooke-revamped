import React from 'react';
import { View } from 'react-native';
import { Tabs } from 'expo-router';
import { Feather } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { useThemeColor } from '@/hooks/useThemeColor';

export default function TabLayout() {
  const colors = useThemeColor();
  return (
    <Tabs
      screenOptions={{
        tabBarStyle: {
          height: 58,
          padding: 4,
        },
        tabBarActiveTintColor: colors.tint,
        headerShown: false,
        tabBarLabelStyle: {
          fontSize: 14,
          fontFamily: 'mukta-reg',
          color: colors.charcoal,
          marginBottom: 2
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ focused, color, size }) => {
            return <View style={{
              paddingVertical: 4,
              paddingHorizontal: 12,
              borderRadius: 12,
              backgroundColor: focused ? colors.background : 'transparent' }}>
              <Feather name="home" size={size} color={color} />
            </View>;
          },
        }}
      />
      <Tabs.Screen
        name="category"
        options={{
          title: 'Category',
          tabBarIcon: ({ focused, color, size }) => {
            return <View style={{
              paddingVertical: 4,
              paddingHorizontal: 12,
              borderRadius: 12,
              backgroundColor: focused ? colors.background : 'transparent' }}>
              <MaterialIcons name="category" size={size} color={color} />
            </View>;
          },
        }}
      />
    </Tabs>
  );
}
