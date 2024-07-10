import { Provider as StoreProvider } from 'react-redux';
import { MD3LightTheme as DefaultTheme, PaperProvider } from 'react-native-paper';

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    //   primary: 'tomato',
    //   secondary: 'yellow',
  },
};

export default function RootWrapper({ children }) {
  return (
    // <StoreProvider>
    <PaperProvider theme={theme}>{children}</PaperProvider>
    // </StoreProvider>
  );
}
