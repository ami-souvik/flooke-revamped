import { type Control } from 'react-hook-form';

export type InputFieldProps = {
  control: Control<any>;
  name: string;
  label?: string;
  placeholder?: string;
  fontSize?: number;
};
export type EmojiPickerProps = {
  control: Control<any>;
  name: string;
  label?: string;
  placeholder?: string;
  fontSize?: number;
};
