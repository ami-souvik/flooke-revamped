import React from 'react';
import { Control, Controller } from 'react-hook-form';
import { TextInput } from 'react-native-paper';

export default function InputField({
  control,
  name,
  label,
  placeholder,
}: {
  control: Control<any>;
  name: string;
  label?: string;
  placeholder?: string;
}) {
  return (
    <Controller
      control={control}
      rules={{
        required: true,
      }}
      render={({ field: { onChange, onBlur, value } }) => (
        <TextInput label={label} placeholder={placeholder} onBlur={onBlur} onChangeText={onChange} value={value} />
      )}
      name={name}
    />
  );
}
