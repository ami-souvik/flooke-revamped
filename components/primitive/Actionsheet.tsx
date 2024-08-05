import React from 'react';
import { Actionsheet as NativeSheet } from 'native-base';
import { useThemeColor } from '@/hooks/useThemeColor';

export function Actionsheet({ children, isOpen, onClose, height }) {
  const colors = useThemeColor();
  return (
    <NativeSheet isOpen={isOpen} onClose={onClose}>
      <NativeSheet.Content style={{ height, backgroundColor: colors.background }}>{children}</NativeSheet.Content>
    </NativeSheet>
  );
}
