import React from 'react';
import { View } from 'react-native';
import { Hstack, Text } from './primitive';
import { useThemeColor } from '@/hooks/useThemeColor';

const DAYS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

export function SectionHeader({ date, summary }) {
  const colors = useThemeColor();
  return (
    <Hstack
      style={{
        width: '100%',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 6,
      }}
    >
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Text>{date.substring(0, 2)}</Text>
        <Text style={{ marginLeft: 4 }}>
          {DAYS[
            new Date(
              Number(date.substring(6, 10)),
              Number(date.substring(3, 5) - 1),
              Number(date.substring(0, 2)),
            ).getDay()
          ].substring(0, 3)}
        </Text>
      </View>
      <Text>₹{summary.expenses}</Text>
    </Hstack>
  );
}
