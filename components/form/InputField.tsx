import React from 'react';
import { Control, Controller } from 'react-hook-form';
import { TextInput } from 'react-native-paper';

export default function InputField({
  control,
  name,
  label,
  placeholder,
  ...props
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
        <TextInput
          label={label}
          placeholder={placeholder}
          onBlur={onBlur}
          onChangeText={onChange}
          value={value}
          style={{
            fontSize: 20,
            fontFamily: 'mukta-reg',
          }}
          contentStyle={{
            fontFamily: 'mukta-reg',
          }}
          keyboardType="number-pad"
          {...props}
        />
      )}
      name={name}
    />
  );
}
