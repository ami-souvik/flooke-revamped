import React from 'react';
import { Text, TextInput, View } from 'react-native';
import { Dialog, IconButton, Surface, useTheme } from 'react-native-paper';
import { useForm } from 'react-hook-form';
import SelectField from './form/SelectField';
import { categories } from '@/mock/categories';
import InputFieldBase from './form/InputFieldBase';
import { Record } from '@/database/schemas/record';

export interface UPIInfo {
  name: string;
  upiid: string;
}

export default function ExpenseEntryQRDialog({
  data,
  onClose,
  onSubmit,
}: {
  data: UPIInfo | null;
  onClose: () => void;
  onSubmit: (v: Record) => void;
}) {
  const theme = useTheme();
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
  return (
    <Dialog visible={!!data} onDismiss={onClose} style={{ backgroundColor: 'white' }}>
      <Dialog.Content>
        <View style={{ paddingVertical: 12, alignItems: 'center' }}>
          <Text style={{ fontSize: 24, fontFamily: 'mukta-reg' }}>{data?.name}</Text>
          <Text style={{ fontFamily: 'mukta-reg' }}>UPI id: {data?.upiid}</Text>
          <View style={{ position: 'relative', flexDirection: 'row', alignItems: 'center' }}>
            <Text style={{ position: 'absolute', left: -36, fontSize: 32 }}>₹</Text>
            <View
              style={{
                height: 80,
                width: 120,
                marginTop: 12,
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: '#eee',
                borderRadius: 12,
                overflow: 'hidden',
              }}
            >
              <InputFieldBase
                autoFocus
                control={control}
                name="amount"
                label="Amount"
                keyboardType="numeric"
                fontSize={48}
                style={{
                  textAlign: 'center',
                }}
              />
            </View>
          </View>
          <TextInput />
          <View style={{ height: 12 }} />
          <SelectField control={control} name="category" label="Category" items={categories} />
        </View>
      </Dialog.Content>
      <Dialog.Actions>
        <Surface elevation={4} style={{ borderRadius: 12, backgroundColor: theme.colors.primary }}>
          <IconButton icon="plus" iconColor="white" onPress={handleSubmit(onSubmit)} />
        </Surface>
      </Dialog.Actions>
    </Dialog>
  );
}
