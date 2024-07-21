import React, { Text, View } from 'react-native';
import { changeMonth, monthYear } from '@/helpers/datetime';

export default function MonthStrip({ month }: { month: Date }) {
  return (
    <View style={{ height: 40, flexDirection: 'row', alignItems: 'center', marginBottom: 6 }}>
      <Text
        style={{
          width: 80,
          fontSize: 16,
          textAlign: 'center',
          fontFamily: 'mukta-reg',
        }}
      >
        {monthYear(changeMonth(month, -1))}
      </Text>
      <View
        style={{
          width: 100,
          height: 40,
          justifyContent: 'center',
          backgroundColor: '#333333',
          borderRadius: 20,
        }}
      >
        <Text
          style={{
            fontSize: 18,
            textAlign: 'center',
            fontFamily: 'mukta-reg',
            color: '#ffffff',
          }}
        >
          {monthYear(month)}
        </Text>
      </View>
      <Text
        style={{
          width: 80,
          fontSize: 16,
          textAlign: 'center',
          fontFamily: 'mukta-reg',
        }}
      >
        {monthYear(changeMonth(month, 1))}
      </Text>
    </View>
  );
}
