/**
 * Learn more about light and dark modes:
 * https://docs.expo.dev/guides/color-schemes/
 */

import { useColorScheme } from 'react-native';

import { Colors, type Colors as ColorsType } from '@/constants/Colors';

export function useThemeColor(): ColorsType {
  const theme = useColorScheme() ?? 'light';
  return Colors[theme];
}
