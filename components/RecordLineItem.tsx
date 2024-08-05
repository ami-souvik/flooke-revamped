import React from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { router } from 'expo-router';
import { DBRecord } from '@/database/schemas/record';
import { Hstack, Text, Vstack } from './primitive';
import { useThemeColor } from '@/hooks/useThemeColor';

export function RecordLineItem({ item }: { item: DBRecord }) {
  const colors = useThemeColor();
  const onPress = () => {
    router.push({ pathname: '/entry', params: item });
  };
  return (
    <Pressable onPress={onPress} style={styles.container}>
      <View style={{ width: 1, backgroundColor: colors.mindaro }} />
      <Vstack style={{ flex: 1, backgroundColor: colors.background }}>
        {!item.confirmed && <Text style={styles.unconfirmedFlag}>unconfirmed</Text>}
        <Hstack style={{ alignItems: 'center', padding: 6 }}>
          <Text style={{ flex: 1.5 }}>{item.category}</Text>
          <Text style={{ flex: 1 }}>{item.account}</Text>
          <Text style={{ flex: 1, textAlign: 'right' }}>₹{item.amount}</Text>
        </Hstack>
      </Vstack>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flexDirection: 'row',
    paddingHorizontal: 6,
  },
  unconfirmedFlag: {
    paddingVertical: 2,
    paddingHorizontal: 8,
    borderRadius: 4,
    backgroundColor: '#ffcccc',
  },
});
