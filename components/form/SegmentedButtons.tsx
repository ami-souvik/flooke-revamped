import React from "react";
import { Control, Controller } from "react-hook-form";
import SegmentedButtonsBase from "./base/SegmentedButtonsBase";

export default function SegmentedButtons({
  control,
  name,
  buttons,
}: {
  control: Control<any>;
  name: string;
  buttons: { value: string; label: string }[];
}) {
  return (
    <Controller
      control={control}
      rules={{
        required: true,
      }}
      render={({ field: { onChange, onBlur, value } }) => (
        <SegmentedButtonsBase
          value={value}
          buttons={buttons}
          onValueChange={onChange}
        />
      )}
      name={name}
    />
  )
}