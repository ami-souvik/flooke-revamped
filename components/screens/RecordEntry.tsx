import React, { useState } from 'react';
import { Header } from '@/components/Header';
import { SafeAreaView } from '@/components/primitive';
import ExpenseEntry from '@/components/entry/ExpenseEntry';
import IncomeEntry from '../IncomeEntry';

export default function RecordEntry() {
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
      {/* <IncomeEntry /> */}
    </SafeAreaView>
  );
}
