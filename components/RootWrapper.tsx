import React, { useEffect } from 'react';
import { useFonts } from 'expo-font';
import { SplashScreen } from 'expo-router';
import { NativeBaseProvider, Box } from 'native-base';
import { MD3LightTheme as DefaultTheme, PaperProvider, configureFonts } from 'react-native-paper';
import { Provider as StoreProvider } from 'react-redux';
import store from '@/store';

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    surfaceVariant: '#fff',
  },
};

export default function RootWrapper({ children }: { children: any }) {
  const [loaded, error] = useFonts({
    'mukta-reg': require('@/assets/fonts/Mukta-Regular.ttf'),
  });
  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);
  return (
    <StoreProvider store={store}>
      <PaperProvider theme={theme}>
        <NativeBaseProvider>{children}</NativeBaseProvider>
      </PaperProvider>
    </StoreProvider>
  );
}
