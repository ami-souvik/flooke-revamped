import React from 'react';
import { FlatList, Text, View } from 'react-native';
import { IconButton } from 'react-native-paper';
import { router } from 'expo-router';
import { useSelector } from 'react-redux';

export default function Index() {
  const records = useSelector((state) => state.data.records);
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
      }}
    >
      <FlatList
        data={Object.values(records)}
        renderItem={({ item }) => (
          <View
            style={{
              width: '100%',
              flexDirection: 'row',
              borderBottomWidth: 1,
              borderBottomColor: '#ddd',
              backgroundColor: '#fff',
            }}
          >
            <Text style={{ flex: 1, padding: 12 }}>{item.category}</Text>
            <Text style={{ flex: 2, padding: 12 }}>{item.account}</Text>
            <Text style={{ flex: 1, padding: 12, textAlign: 'right' }}>₹{item.amount}</Text>
          </View>
        )}
        keyExtractor={(item) => item.id}
      />
      <IconButton
        mode="contained"
        icon="plus"
        size={28}
        style={{ position: 'absolute', bottom: 80, right: 20 }}
        onPress={() => {
          router.push('/entry');
        }}
      />
      <IconButton
        mode="contained"
        icon="camera"
        size={28}
        style={{ position: 'absolute', bottom: 20, right: 20 }}
        onPress={() => {
          router.push('/scanner');
        }}
      />
    </View>
  );
}
