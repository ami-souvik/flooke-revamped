import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

export default function SegmentedButtonsBase({
  value,
  buttons,
  onValueChange,
}: {
  value: string;
  buttons: { value: string; label: string }[];
  onValueChange: (v: string) => void;
}) {
  return (
    <View style={styles.container}>
      {buttons.map((item) => (
        <Pressable
          onPress={() => onValueChange(item.value)}
          style={[styles.button, item.value === value && { backgroundColor: '#dddddd' }]}
        >
          <Text style={styles.buttonText}>{item.label}</Text>
        </Pressable>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#ffffff',
    borderRadius: 20,
    overflow: 'hidden',
  },
  button: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    fontFamily: 'mukta-reg',
  },
});
