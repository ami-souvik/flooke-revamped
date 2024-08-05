import React, { Pressable } from 'react-native';
import { changeMonth, monthYear } from '@/helpers/datetime';
import { useSQlite } from '@/contexts/DBProvider';
import { Hstack, Text } from '@/components/primitive';
import { useThemeColor } from '@/hooks/useThemeColor';

export default function MonthStrip({ month }: { month: Date }) {
  const colors = useThemeColor();
  const { prevRange, nextRange } = useSQlite();
  return (
    <Hstack style={{ alignItems: 'center', padding: 6 }}>
      <Pressable onPress={prevRange}>
        <Text>{monthYear(changeMonth(month, -1))}</Text>
      </Pressable>
      <Text
        style={{
          paddingHorizontal: 12,
          color: colors.mindaro,
        }}
      >
        {monthYear(month)}
      </Text>
      <Pressable onPress={nextRange}>
        <Text>{monthYear(changeMonth(month, 1))}</Text>
      </Pressable>
    </Hstack>
  );
}
