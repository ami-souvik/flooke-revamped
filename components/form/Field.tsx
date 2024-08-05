import React, { useState } from 'react';
import { Pressable } from 'react-native';
import { useThemeColor } from '@/hooks/useThemeColor';
import { Text } from '../primitive';

export default function Field({
  label,
  value,
  focused,
  onPress,
}: {
  label: string;
  value: string;
  focused: boolean;
  onPress: () => void;
}) {
  const colors = useThemeColor();
  return (
    <Pressable
      onPress={onPress}
      style={{
        flex: 1,
        paddingVertical: 6,
        paddingHorizontal: 12,
        backgroundColor: colors.foreground,
        borderBottomWidth: focused ? 2 : 1,
      }}
    >
      <Text
        style={{
          fontSize: 12,
        }}
      >
        {label}
      </Text>
      <Text
        style={{
          fontSize: 20,
        }}
      >
        {value}
      </Text>
    </Pressable>
  );
}
