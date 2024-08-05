import React from 'react';
import { StyleSheet, View as NativeView, ViewProps } from 'react-native';
import { useThemeColor } from '@/hooks/useThemeColor';

export function Hstack({ children, invert, ...props }: ViewProps) {
  const colors = useThemeColor();
  const styles = makeStyles(invert ? colors.invert : colors);
  const { style } = props;
  delete props['style'];
  return (
    <NativeView style={[styles.nativeview, style]} {...props}>
      {children}
    </NativeView>
  );
}

const makeStyles = (colors: any) =>
  StyleSheet.create({
    nativeview: {
      flexDirection: 'row',
    },
  });
