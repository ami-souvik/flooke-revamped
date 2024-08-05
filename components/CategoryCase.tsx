import React from 'react';
import { Button, FlatList, Pressable, StyleSheet, View } from 'react-native';
import { router } from 'expo-router';
import { Category } from '@/database/schemas/category';
import { Text } from './primitive';

const COLUMNS = 3;

export default function CategoryCase({
  items,
  onSelect,
  onClose,
}: {
  items: Category[];
  onSelect: (v: Category) => void;
  onClose: () => void;
}) {
  return (
    <View style={styles.container}>
      <Button title="Add" onPress={() => router.push('/category')} />
      <FlatList
        data={items}
        numColumns={COLUMNS}
        renderItem={({ item }) => (
          <Pressable
            key={item.value}
            style={styles.item}
            onPress={() => {
              onSelect(item.value);
              onClose();
            }}
          >
            <Text>{item.value}</Text>
          </Pressable>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: '100%',
    width: '100%',
    marginHorizontal: 'auto',
  },
  item: {
    width: `${100 / COLUMNS}%`,
    padding: 16,
    flexDirection: 'row',
    borderWidth: 0.5,
    borderColor: '#aaa',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
