import React, { useState } from 'react';
import ExpenseEntry from '@/components/ExpenseEntry';
import { Header } from '@/components/Header';
import { SafeAreaView } from '@/components/primitive';

export default function Entry() {
  const [value, setValue] = useState('expense');
  return (
    <SafeAreaView
      style={{
        flex: 1,
        paddingHorizontal: 12,
      }}
    >
      <Header
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
        value={value}
        setValue={setValue}
      />
      <ExpenseEntry />
    </SafeAreaView>
  );
}
