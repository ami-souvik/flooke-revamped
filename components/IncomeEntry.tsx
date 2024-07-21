import React from 'react';
import { View } from 'react-native';
import { useForm } from 'react-hook-form';
import { router } from 'expo-router';
import { Button } from 'native-base';
import DateTimeInput from './form/DateTimeInput';
import InputField from './form/InputField';
import SelectField from './form/SelectField';
import { categories } from '@/mock/categories';
import { accounts } from '@/mock/accounts';
import { useSQlite } from '@/contexts/DBProvider';

export default function IncomeEntry() {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      date: new Date(),
      amount: 0,
      category: '',
      account: 'accounts',
    },
  });
  const { saveRecord } = useSQlite();
  const onSubmit = (data) => {
    saveRecord(data);
    router.back();
  };
  return (
    <View style={{ paddingVertical: 12 }}>
      <DateTimeInput control={control} name="date" dateLabel="Date" timeLabel="Time" />
      <View style={{ height: 12 }} />
      <InputField autoFocus control={control} name="amount" label="Amount" keyboardType="numeric" />
      <View style={{ height: 12 }} />
      <SelectField control={control} name="category" label="Category" items={categories} />
      <View style={{ height: 12 }} />
      <SelectField control={control} name="account" label="Account" items={accounts} />
      <View style={{ height: 12 }} />
      <Button onPress={handleSubmit(onSubmit)}>Add</Button>
      <View style={{ height: 12 }} />
      <Button variant="outline" onPress={handleSubmit(onSubmit)}>
        Continue
      </Button>
    </View>
  );
}
