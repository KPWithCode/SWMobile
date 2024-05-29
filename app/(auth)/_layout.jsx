import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import {Stack, Screen} from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import GlobalProvider from '../../context/GlobalProvider'

export const AuthLayout = () => {
  return (
    <GlobalProvider>
    <View>
      <Stack className="bg-primary">
      <Screen
      name="sign-in"
      options={{
        headerShown: false
      }}
      />
    <Screen
          name="sign-up"
          options={{
            headerShown: false
          }}
          />

      </Stack>
          <StatusBar 
          backgroundColor='#161622'
          style="dark"/>
    </View>
     </GlobalProvider>
  )
}

