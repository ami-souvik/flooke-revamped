import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { router } from 'expo-router';
import { DBRecord } from '@/database/schemas/record';

export function RecordLineItem({ item }: { item: DBRecord }) {
  const onPress = () => {
    router.push({ pathname: '/entry', params: item });
  };
  return (
    <Pressable onPress={onPress} style={styles.container}>
      <View style={{ flex: 1 }}>
        <View style={styles.unconfirmedFlagCase}>
          {!item.confirmed && <Text style={styles.unconfirmedFlag}>unconfirmed</Text>}
        </View>
        <View style={styles.contentCase}>
          <Text style={{ flex: 1, padding: 12, fontFamily: 'mukta-reg' }}>{item.account}</Text>
          <Text style={{ flex: 1.5, flexDirection: 'row', padding: 12, fontFamily: 'mukta-reg' }}>
            <Text>{item.category}</Text>
          </Text>
          <Text style={{ flex: 1, padding: 12, fontFamily: 'mukta-reg', textAlign: 'right' }}>₹{item.amount}</Text>
        </View>
      </View>
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
  contentCase: {
    flexDirection: 'row',
  },
  unconfirmedFlagCase: {
    marginTop: 2,
    marginLeft: 8,
    alignItems: 'flex-start',
  },
  unconfirmedFlag: {
    paddingVertical: 2,
    paddingHorizontal: 8,
    borderRadius: 4,
    backgroundColor: '#ffcccc',
  },
});
