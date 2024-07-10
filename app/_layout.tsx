import RootWrapper from '@/components/RootWrapper';
import { Stack } from 'expo-router';

export default function RootLayout() {
  return (
    <RootWrapper>
      <Stack>
        <Stack.Screen name="index" />
        <Stack.Screen name="entry" />
      </Stack>
    </RootWrapper>
  );
}
