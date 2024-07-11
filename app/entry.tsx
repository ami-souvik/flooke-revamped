import React, { useState } from 'react';
import { View } from 'react-native';
import { SegmentedButtons, Surface } from 'react-native-paper';
import ExpenseEntry from '@/components/ExpenseEntry';

export default function Entry() {
  const [value, setValue] = useState('expense');
  return (
    <View
      style={{
        flex: 1,
        margin: 12,
      }}
    >
      <Surface elevation={1} style={{ borderRadius: 24 }}>
        <SegmentedButtons
          value={value}
          onValueChange={setValue}
          buttons={[
            {
              value: 'income',
              label: 'Income',
            },
            {
              value: 'expense',
              label: 'Expense',
            },
            { value: 'transfer', label: 'Transfer' },
          ]}
          style={{
            borderRadius: 24,
            backgroundColor: '#FFFFFF',
          }}
          theme={{
            colors: {
              onSecondaryContainer: '#FFFFFF',
              secondaryContainer: '#896A67',

              onSurface: 'gray',
              outline: 'transparent',
            },
          }}
        />
      </Surface>
      <ExpenseEntry />
    </View>
  );
}
