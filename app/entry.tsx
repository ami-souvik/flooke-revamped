import React from 'react';
import { View } from 'react-native';
import { Button, Text } from 'react-native-paper';
import { useForm } from 'react-hook-form';
import InputField from '@/components/form/InputField';

export default function Entry() {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      amount: '',
    },
  });
  const onSubmit = (data) => console.log(data);
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        marginHorizontal: 'auto',
      }}
    >
      <Text variant="bodyLarge">{new Date().toString()}</Text>
      <InputField control={control} name="amount" label="Amount" />
      <Button onPress={handleSubmit(onSubmit)}>Click Me!</Button>
    </View>
  );
}
