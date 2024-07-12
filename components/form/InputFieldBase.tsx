import React from 'react';
import { Control, Controller } from 'react-hook-form';
import { TextInput } from 'react-native';
import { useTheme } from 'react-native-paper';

export default function InputFieldBase({
  control,
  name,
  label,
  placeholder,
  fontSize = 20,
  ...props
}: {
  control: Control<any>;
  name: string;
  label?: string;
  placeholder?: string;
  fontSize: number;
}) {
  const theme = useTheme();
  return (
    <Controller
      control={control}
      rules={{
        required: true,
      }}
      render={({ field: { onChange, onBlur, value } }) => (
        <TextInput
          value={value}
          onChangeText={onChange}
          onBlur={onBlur}
          {...props}
          style={{
            fontSize,
            fontFamily: 'mukta-reg',
          }}
        />
      )}
      name={name}
    />
  );
}
