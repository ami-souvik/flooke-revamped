import RootWrapper from '@/components/RootWrapper';
import { Stack } from 'expo-router';

export default function RootLayout() {
  return (
    <RootWrapper>
      <Stack>
        <Stack.Screen name="index" />
        <Stack.Screen name="entry" options={{ animation: 'fade' }} />
        <Stack.Screen name="scanner" options={{ animation: 'fade' }} />
      </Stack>
    </RootWrapper>
  );
}
