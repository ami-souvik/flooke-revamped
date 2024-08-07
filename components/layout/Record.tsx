import React from 'react';
import { StyleSheet, View, ViewStyle } from 'react-native';
import { useThemeColor } from '@/hooks/useThemeColor';
import { Text } from '../primitive';
import { type Colors } from '@/constants/Colors';

export default function Record({ caseStyle, values }: { caseStyle?: ViewStyle; values: (string | number)[] }) {
  const styles = makeStyles(useThemeColor());
  return (
    <View style={[styles.case, caseStyle]}>
      {values.map((item) => (
        <View style={styles.item}>
          <Text>{item}</Text>
        </View>
      ))}
    </View>
  );
}

const makeStyles = (colors: Colors) =>
  StyleSheet.create({
    case: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      // borderWidth: 1,
      // borderColor: colors.licorice,
    },
    item: {
      width: '33%',
      padding: 12,
    },
  });
