import React from 'react';
import { Text as NativeText, StyleSheet, TextProps } from 'react-native';
import { useThemeColor } from '@/hooks/useThemeColor';
import { Fonts } from '@/constants/Fonts';

export function Text({ children, invert, ...props }: TextProps) {
  const { style } = props;
  const colors = useThemeColor();
  const styles = makeStyles(invert ? colors.invert : colors, style);
  delete props['style'];
  return (
    <NativeText style={styles.nativetext} {...props}>
      {children}
    </NativeText>
  );
}

const makeStyles = (colors, initStyle) =>
  StyleSheet.create({
    nativetext: {
      fontFamily: Fonts.body.regular,
      fontSize: 16,
      color: colors.text,
      ...initStyle,
    },
  });
