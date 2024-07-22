import React from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { router } from 'expo-router';
import { DBRecord } from '@/database/schemas/record';
import { Hstack, Text, Vstack } from './primitive';

export function RecordLineItem({ item }: { item: DBRecord }) {
  const onPress = () => {
    router.push({ pathname: '/entry', params: item });
  };
  return (
    <Pressable onPress={onPress} style={styles.container}>
      <Vstack style={{ flex: 1 }}>
        <Hstack style={{
            marginTop: 2,
            marginLeft: 8,
            alignItems: 'flex-start',
          }}>
          {!item.confirmed && <Text style={styles.unconfirmedFlag}>unconfirmed</Text>}
        </Hstack>
        <Hstack>
          <Text style={{ flex: 1, padding: 12 }}>{item.account}</Text>
          <Text style={{ flex: 1.5, flexDirection: 'row', padding: 12 }}>
            <Text>{item.category}</Text>
          </Text>
          <Text style={{ flex: 1, padding: 12, textAlign: 'right' }}>₹{item.amount}</Text>
        </Hstack>
      </Vstack>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flexDirection: 'row',
    borderBottomColor: '#ddd',
    backgroundColor: '#fff',
  },
  unconfirmedFlag: {
    paddingVertical: 2,
    paddingHorizontal: 8,
    borderRadius: 4,
    backgroundColor: '#ffcccc',
  },
});
