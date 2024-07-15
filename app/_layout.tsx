import React from 'react';
import { Stack } from 'expo-router';
import RootWrapper from '@/components/RootWrapper';

export default function RootLayout() {
  return (
    <RootWrapper>
      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }}/>
        <Stack.Screen name="entry" options={{ animation: 'fade' }} />
        <Stack.Screen name="scanner" options={{ animation: 'fade' }} />
      </Stack>
    </RootWrapper>
  );
}
