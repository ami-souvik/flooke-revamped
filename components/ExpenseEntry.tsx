import React, { useEffect, useState } from 'react';
import { Alert, StyleSheet, View } from 'react-native';
import { useForm } from 'react-hook-form';
import { router, useLocalSearchParams } from 'expo-router';
import DateTimeInput from './form/DateTimeInput';
import InputField from './form/InputField';
import SelectField from './form/SelectField';
import { accounts } from '@/mock/accounts';
import { useSQlite } from '@/contexts/DBProvider';
import { DBRecord, Record } from '@/database/schemas/record';
import { DBCategory } from '@/database/schemas/category';
import { IconButton } from 'react-native-paper';
import { Button } from '@/components/primitive';

export default function ExpenseEntry() {
  const params = useLocalSearchParams<DBRecord>();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      date: params.date ? new Date(params.date) : new Date(),
      amount: params.amount ? Number(params.amount) : 0,
      category: params.category ? params.category : '',
      account: params.account ? params.account : '',
    },
  });
  const { saveRecord, deleteRecord, findCategory } = useSQlite();
  const [categories, setCategories] = useState<DBCategory[]>([]);
  const onDelete = () => {
    if (!params?.id) return;
    Alert.alert('Delete Record', 'Are you sure about deleting this record?', [
      {
        text: 'Cancel',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      {
        text: 'OK',
        onPress: () => {
          deleteRecord(params.id);
          router.back();
        },
      },
    ]);
  };
  useEffect(() => {
    findCategory().then((data) => setCategories(data));
  }, []);
  const onSubmit = (data: Record) => {
    data.confirmed = true;
    if (params.id) data.id = params.id;
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
      <View style={styles.buttonContainer}>
        <Button style={{ flex: 1 }} onPress={handleSubmit(onSubmit)}>
          {params.id ? 'Save' : 'Add'}
        </Button>
        <Button style={{ flex: 1 }} variant="outlined" onPress={handleSubmit(onSubmit)}>
          Continue
        </Button>
        {params?.id && <IconButton icon="delete" onPress={onDelete} />}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    flexDirection: 'row',
  },
  addButton: {
    flex: 1,
  },
  continueButton: {
    flex: 1,
  },
});
