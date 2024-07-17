import React, { useRef } from 'react';
import { Alert, Animated, Text, View } from 'react-native';
import { IconButton } from 'react-native-paper';
import GestureRecognizer from './GestureRecognizer';
import { useSQlite } from '@/contexts/DBProvider';

export function RecordLineItem({ item }) {
  const slideAnim = useRef(new Animated.Value(-40)).current;
  const { deleteRecord } = useSQlite();
  const onDelete = () => {
    Alert.alert('Delete Record', 'Are you sure about deleting this record?', [
      {
        text: 'Cancel',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      { text: 'OK', onPress: () => deleteRecord(item) },
    ]);
  };
  return (
    <GestureRecognizer
      onSwipeLeft={() => {
        Animated.timing(slideAnim, {
          toValue: -40,
          duration: 150,
          useNativeDriver: false,
        }).start();
      }}
      onSwipeRight={() => {
        Animated.timing(slideAnim, {
          toValue: 0,
          duration: 150,
          useNativeDriver: false,
        }).start();
      }}
    >
      <View
        style={{
          width: '100%',
          flexDirection: 'row',
          borderBottomWidth: 1,
          borderBottomColor: '#ddd',
          backgroundColor: '#fff',
        }}
      >
        <Animated.View
          style={[
            {
              width: 40,
              alignItems: 'center',
              backgroundColor: '#ffaaaa',
              marginLeft: slideAnim,
            },
          ]}
        >
          <IconButton
            icon="delete"
            onPress={() => {
              onDelete();
              Animated.timing(slideAnim, {
                toValue: -40,
                duration: 250,
                useNativeDriver: false,
              }).start();
            }}
            size={18}
          />
        </Animated.View>
        <Text style={{ flex: 1, padding: 12, fontFamily: 'mukta-reg' }}>{item.category}</Text>
        <Text style={{ flex: 1.5, padding: 12, fontFamily: 'mukta-reg' }}>{item.account}</Text>
        <Text style={{ flex: 1, padding: 12, fontFamily: 'mukta-reg', textAlign: 'right' }}>₹{item.amount}</Text>
      </View>
    </GestureRecognizer>
  );
}
