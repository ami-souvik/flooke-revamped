import React from 'react';
import { View } from 'react-native';
import { Control, Controller } from 'react-hook-form';
import { useDisclose } from 'native-base';
import DateTimePicker from '@react-native-community/datetimepicker';
import Field from './Field';
import { parsetimestamp, formatdate } from '@/helpers/datetime';

export default function DateTimeInput({
  control,
  name,
  label,
}: {
  control: Control<any>;
  name: string;
  label: string;
}) {
  const { isOpen, onOpen, onClose } = useDisclose();
  return (
    <Controller
      control={control}
      rules={{
        required: true,
      }}
      render={({ field: { onChange, onBlur, value } }) => (
        <View>
          <Field label={label} value={formatdate(value)} focused={isOpen} onPress={onOpen} />
          {isOpen && (
            <DateTimePicker
              value={new Date()}
              onChange={(e) => {
                console.log(e);
                if (e.type == 'set') {
                  onChange(parsetimestamp(e.nativeEvent.timestamp));
                }
                onClose();
              }}
            />
          )}
        </View>
      )}
      name={name}
    />
  );
}
