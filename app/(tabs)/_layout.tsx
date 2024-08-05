import React from 'react';
import { View } from 'react-native';
import { Tabs } from 'expo-router';
import { Feather } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { useThemeColor } from '@/hooks/useThemeColor';
import { Fonts } from '@/constants/Fonts';

export default function TabLayout() {
  const colors = useThemeColor();
  return (
    <Tabs
      screenOptions={{
        tabBarStyle: {
          height: 64,
          padding: 6,
          backgroundColor: colors.background,
        },
        tabBarActiveTintColor: colors.tint,
        headerShown: false,
        tabBarLabelStyle: {
          fontSize: 14,
          fontFamily: Fonts.body.regular,
          marginBottom: 2,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ focused, color, size }) => {
            return (
              <View>
                <Feather name="home" size={size} color={color} />
              </View>
            );
          },
        }}
      />
      <Tabs.Screen
        name="category"
        options={{
          title: 'Category',
          tabBarIcon: ({ focused, color, size }) => {
            return (
              <View>
                <MaterialIcons name="category" size={size} color={color} />
              </View>
            );
          },
        }}
      />
    </Tabs>
  );
}
