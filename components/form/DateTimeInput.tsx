import React from 'react';
import { View } from 'react-native';
import { Control, Controller } from 'react-hook-form';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useDisclose } from '@/hooks/useDisclose';
import Field from './Field';
import { parsetimestamp, formatdate, formattime } from '@/helpers/datetime';

export default function DateTimeInput({
  control,
  name,
  dateLabel,
  timeLabel,
}: {
  control: Control<any>;
  name: string;
  dateLabel: string;
  timeLabel: string;
}) {
  const { isOpen: dateIsOpen, onOpen: dateOnOpen, onClose: dateOnClose } = useDisclose();
  const { isOpen: timeIsOpen, onOpen: timeOnOpen, onClose: timeOnClose } = useDisclose();
  return (
    <Controller
      control={control}
      rules={{
        required: true,
      }}
      render={({ field: { onChange, onBlur, value } }) => (
        <View style={{ flexDirection: 'row' }}>
          <Field label={dateLabel} value={formatdate(value)} focused={dateIsOpen} onPress={dateOnOpen} />
          {dateIsOpen && (
            <DateTimePicker
              value={new Date()}
              onChange={(e) => {
                console.log(e);
                if (e.type == 'set') {
                  onChange(parsetimestamp(e.nativeEvent.timestamp, 'date', value));
                }
                dateOnClose();
              }}
            />
          )}
          <Field label={timeLabel} value={formattime(value)} focused={timeIsOpen} onPress={timeOnOpen} />
          {timeIsOpen && (
            <DateTimePicker
              mode="time"
              value={new Date()}
              onChange={(e) => {
                console.log(e);
                if (e.type == 'set') {
                  onChange(parsetimestamp(e.nativeEvent.timestamp, 'time', value));
                }
                timeOnClose();
              }}
            />
          )}
        </View>
      )}
      name={name}
    />
  );
}
