import React, { useState } from 'react';
import { Pressable, View } from 'react-native';
import { Text, useTheme } from 'react-native-paper';

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
  const theme = useTheme();
  return (
    <Pressable
      onPress={onPress}
      style={{
        flex: 1,
        paddingVertical: 6,
        paddingHorizontal: 12,
        backgroundColor: theme.colors.surfaceVariant,
        borderBottomWidth: focused ? 2 : 1,
      }}
    >
      <Text
        style={{
          fontSize: 12,
          fontFamily: 'mukta-reg',
          color: theme.colors.primary,
        }}
      >
        {label}
      </Text>
      <Text
        style={{
          fontSize: 20,
          fontFamily: 'mukta-reg',
        }}
      >
        {value}
      </Text>
    </Pressable>
  );
}
