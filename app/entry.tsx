import React, { useState } from 'react';
import { router } from 'expo-router';
import { IconButton, Surface } from 'react-native-paper';
import ExpenseEntry from '@/components/ExpenseEntry';
import SegmentedButtonsBase from '@/components/form/base/SegmentedButtonsBase';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StyleSheet, View } from 'react-native';
import { Header } from '@/components/Header';

export default function Entry() {
  const [value, setValue] = useState('expense');
  return (
    <SafeAreaView
      style={{
        flex: 1,
        margin: 12,
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
