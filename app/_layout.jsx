import React from 'react'
import { Layout, Stack } from 'expo-router'
import GlobalProvider from '../context/GlobalProvider'
export const RootLayout = () => {
  
  return (
    <GlobalProvider>
      <Layout>
      <Stack >
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="(auth)" options={{ headerShown: false }} />
        <Stack.Screen name="(tabs)" options={{headerShown: false }} />
        {/* <Stack.Screen name="/search/[query]" options={{ headerShown: false }} /> */}
      </Stack>
      </Layout>
    </GlobalProvider>
  )
}

