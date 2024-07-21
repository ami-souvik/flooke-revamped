import React from 'react';
import { StyleSheet, View } from 'react-native';
import { IconButton, Surface } from 'react-native-paper';
import SegmentedButtonsBase from './form/base/SegmentedButtonsBase';
import { router } from 'expo-router';

export function Header({ buttons, value, setValue }) {
  return (
    <View style={styles.buttonContainer}>
      <Surface elevation={1} style={{ flex: 1, borderRadius: 24 }}>
        <SegmentedButtonsBase value={value} onValueChange={setValue} buttons={buttons} />
      </Surface>
      <IconButton icon="close" size={24} onPress={() => router.back()} style={styles.closeButton} />
    </View>
  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    flexDirection: 'row',
  },
  closeButton: {
    margin: 0,
    marginLeft: 6,
    backgroundColor: 'white',
  },
});
