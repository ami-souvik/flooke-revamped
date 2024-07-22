import React, { Pressable } from 'react-native';
import { changeMonth, monthYear } from '@/helpers/datetime';
import { useSQlite } from '@/contexts/DBProvider';
import { Hstack, Text } from '@/components/primitive';

export default function MonthStrip({ month }: { month: Date }) {
  const { prevRange, nextRange } = useSQlite();
  return (
    <Hstack style={{ height: 40, alignItems: 'center', marginBottom: 6 }}>
      <Pressable onPress={prevRange}>
        <Text
          style={{
            width: 80,
            textAlign: 'center',
          }}
        >
          {monthYear(changeMonth(month, -1))}
        </Text>
      </Pressable>
      <Hstack
        invert
        style={{
          width: 100,
          height: 40,
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: 20,
        }}
      >
        <Text
          invert
          style={{
            fontSize: 18,
            textAlign: 'center',
          }}
        >
          {monthYear(month)}
        </Text>
      </Hstack>
      <Pressable onPress={nextRange}>
        <Text
          style={{
            width: 80,
            textAlign: 'center',
          }}
        >
          {monthYear(changeMonth(month, 1))}
        </Text>
      </Pressable>
    </Hstack>
  );
}
