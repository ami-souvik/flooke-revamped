import React, { useState } from 'react';
import { View } from 'react-native';
import { Surface } from 'react-native-paper';
import ExpenseEntry from '@/components/ExpenseEntry';
import SegmentedButtonsBase from '@/components/form/base/SegmentedButtonsBase';

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
        <SegmentedButtonsBase
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
        />
      </Surface>
      <ExpenseEntry />
    </View>
  );
}
