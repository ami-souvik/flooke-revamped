import React from 'react';
import { View } from 'react-native';
import { Control, Controller } from 'react-hook-form';
import { Actionsheet } from 'native-base';
import { useDisclose } from '@/hooks/useDisclose';
import Field from './Field';
import CategoryCase, { CategoryItem } from '../CategoryCase';

export default function SelectField({
  control,
  name,
  label,
  items,
}: {
  control: Control<any>;
  name: string;
  label: string;
  items: CategoryItem[];
}) {
  const { isOpen, onOpen, onClose } = useDisclose();
  return (
    <Controller
      control={control}
      rules={{
        required: true,
      }}
      render={({ field: { onChange, onBlur, value } }) => (
        <View style={{ flexDirection: 'row' }}>
          <Field
            label={label}
            value={`${value.emojicode ? String.fromCodePoint(parseInt(value.emojicode, 16)) : ''} ${value.value}`}
            focused={isOpen}
            onPress={onOpen}
          />
          <Actionsheet isOpen={isOpen} onClose={onClose}>
            <Actionsheet.Content style={{ height: 400 }}>
              <CategoryCase items={items} onSelect={onChange} onClose={onClose} />
            </Actionsheet.Content>
          </Actionsheet>
        </View>
      )}
      name={name}
    />
  );
}
