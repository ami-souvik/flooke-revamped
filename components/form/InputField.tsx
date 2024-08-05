import React from 'react';
import { Controller } from 'react-hook-form';
import { TextInput, View } from 'react-native';
import { InputFieldProps } from '../types/form';
import { Text } from '../primitive';
import { useThemeColor } from '@/hooks/useThemeColor';
import { Fonts } from '@/constants/Fonts';

export default function InputField({ control, name, label, placeholder, fontSize = 20, ...props }: InputFieldProps) {
  const colors = useThemeColor();
  return (
    <Controller
      control={control}
      rules={{
        required: true,
      }}
      render={({ field: { onChange, onBlur, value } }) => {
        return (
          <View
            style={{
              paddingVertical: 6,
              paddingHorizontal: 12,
              backgroundColor: colors.foreground,
              borderBottomWidth: 1,
            }}
          >
            <Text style={{ fontSize: 12 }}>{label}</Text>
            <TextInput
              value={String(value)}
              onChangeText={onChange}
              onBlur={onBlur}
              {...props}
              style={{
                fontSize,
                fontFamily: Fonts.body.regular,
                color: colors.text,
              }}
            />
          </View>
        );
      }}
      name={name}
    />
  );
}
