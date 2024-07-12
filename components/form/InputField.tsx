import React from 'react';
import { Control, Controller } from 'react-hook-form';
import { Text, TextInput, View } from 'react-native';
import { useTheme } from 'react-native-paper';

export default function InputField({
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
        <View
          style={{
            paddingVertical: 6,
            paddingHorizontal: 12,
            backgroundColor: theme.colors.surfaceVariant,
            borderBottomWidth: 1,
          }}
        >
          <Text
            style={{
              fontSize: 12,
              fontFamily: 'mukta-reg',
              color: theme.colors.primary,
            }}
          >
            {label}
          </Text>
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
        </View>
      )}
      name={name}
    />
  );
}
