import React from 'react';
import { Stack } from 'expo-router';
import RootWrapper from '@/components/RootWrapper';

export default function RootLayout() {
  return (
    <RootWrapper>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="entry" options={{ headerShown: false, animation: 'fade' }} />
      </Stack>
    </RootWrapper>
  );
}
