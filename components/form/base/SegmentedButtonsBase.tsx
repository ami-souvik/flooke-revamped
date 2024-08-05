import React from 'react';
import { Text } from '@/components/primitive';
import { Pressable, StyleSheet, View } from 'react-native';
import { useThemeColor } from '@/hooks/useThemeColor';

export default function SegmentedButtonsBase({
  value,
  buttons,
  onValueChange,
}: {
  value: string;
  buttons: { value: string; label: string }[];
  onValueChange: (v: string) => void;
}) {
  const colors = useThemeColor();
  return (
    <View style={styles.container}>
      {buttons.map((item) => (
        <Pressable
          onPress={() => onValueChange(item.value)}
          style={[styles.button, { backgroundColor: item.value === value ? colors.foreground : colors.background }]}
        >
          <Text>{item.label}</Text>
        </Pressable>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    overflow: 'hidden',
  },
  button: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#444',
  },
});
