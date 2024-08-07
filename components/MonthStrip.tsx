import React, { Pressable, StyleSheet, View } from 'react-native';
import { changeMonth, monthYear } from '@/helpers/datetime';
import { useSQlite } from '@/contexts/DBProvider';
import { Hstack, Text } from '@/components/primitive';
import { useThemeColor } from '@/hooks/useThemeColor';

function Case({ active, children }: { active?: boolean; children: string }) {
  const colors = useThemeColor();
  return (
    <View
      style={{
        padding: 8,
        borderRadius: 12,
        backgroundColor: active ? colors.charcoal : 'transparent',
      }}
    >
      <Text style={{ lineHeight: 18 }}>{children}</Text>
    </View>
  );
}

export default function MonthStrip({ month }: { month: Date }) {
  const colors = useThemeColor();
  const { prevRange, nextRange } = useSQlite();
  return (
    <Hstack
      style={{
        justifyContent: 'space-evenly',
        padding: 2,
        margin: 6,
        borderWidth: 1,
        borderRadius: 12,
        backgroundColor: colors.licorice,
      }}
    >
      <Pressable onPress={prevRange}>
        <Case>{monthYear(changeMonth(month, -1))}</Case>
      </Pressable>
      <Case active>{monthYear(month)}</Case>
      <Pressable onPress={nextRange}>
        <Case>{monthYear(changeMonth(month, 1))}</Case>
      </Pressable>
    </Hstack>
  );
}
