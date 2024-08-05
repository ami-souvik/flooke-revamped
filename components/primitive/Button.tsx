import React from 'react';
import { Text } from './Text';
import { Pressable, StyleSheet } from 'react-native';
import { useThemeColor } from '@/hooks/useThemeColor';

export function Button({ variant = 'default', onPress, children, ...props }: { variant: string; children: string }) {
  const colors = useThemeColor();
  const styles = makeStyles(colors, variant);
  const { style } = props;
  delete props['style'];
  console.log(children);

  return (
    <Pressable style={[styles.buttoncase, style]} onPress={onPress} {...props}>
      <Text>{children}</Text>
    </Pressable>
  );
}

const makeStyles = (colors: any, variant: 'outlined' | 'default') =>
  StyleSheet.create({
    buttoncase: {
      width: '100%',
      textAlign: 'center',
      justifyContent: 'center',
      alignItems: 'center',
      paddingVertical: 12,
      backgroundColor: variant === 'default' ? colors.charcoal : 'transparent',
      borderWidth: variant === 'default' ? 0 : 1,
      borderColor: variant === 'default' ? 'transparent' : colors.charcoal,
    },
  });
