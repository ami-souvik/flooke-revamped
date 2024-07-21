import React from 'react';
import { Text, View } from 'react-native';

const DAYS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

export function SectionHeader({ date, summary }) {
  return (
    <View
      style={{
        width: '100%',
        padding: 12,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#fff',
      }}
    >
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Text style={{ fontSize: 20, fontFamily: 'mukta-reg' }}>{date.substring(0, 2)}</Text>
        <Text
          style={{
            fontSize: 16,
            fontFamily: 'mukta-reg',
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
      <Text style={{ fontSize: 20, fontFamily: 'mukta-reg' }}>₹{summary.expenses}</Text>
    </View>
  );
}
