import React from 'react';
import { View } from 'react-native';
import { Hstack, Text } from './primitive';

const DAYS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

export function SectionHeader({ date, summary }) {
  return (
    <Hstack
      invert
      style={{
        width: '100%',
        padding: 12,
        alignItems: 'center',
        justifyContent: 'space-between',
      }}
    >
      <View invert style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Text invert style={{ fontSize: 20 }}>{date.substring(0, 2)}</Text>
        <Text
          invert
          style={{
            fontSize: 16,
            paddingHorizontal: 8,
            marginHorizontal: 6,
            backgroundColor: '#333',
            borderRadius: 12,
            color: '#ffffff',
          }}
        >
          {DAYS[
            new Date(
              Number(date.substring(6, 10)),
              Number(date.substring(3, 5) - 1),
              Number(date.substring(0, 2)),
            ).getDay()
          ].substring(0, 3)}
        </Text>
      </View>
      <Text invert style={{ fontSize: 20 }}>₹{summary.expenses}</Text>
    </Hstack>
  );
}
