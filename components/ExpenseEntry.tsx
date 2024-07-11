import React from 'react';
import { View } from 'react-native';
import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import { Button } from 'native-base';
import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';
import DateTimeInput from './form/DateTimeInput';
import InputField from './form/InputField';
import SelectField from './form/SelectField';
import { categories } from '@/dummy/categories';
import { accounts } from '@/dummy/accounts';
import { addRecord } from '@/store/slice/dataSlice';

export default function ExpenseEntry() {
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
  const dispatch = useDispatch();
  const onSubmit = (data) => {
    dispatch(
      addRecord({
        id: uuidv4(),
        date: data.date.toString(),
        amount: data.amount,
        category: data.category,
        account: data.account,
      }),
    );
  };
  return (
    <View style={{ paddingVertical: 12 }}>
      <DateTimeInput control={control} name="date" label="Date" />
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
