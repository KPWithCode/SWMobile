import { ScrollView, Text, View, Image } from 'react-native';
import { useFonts } from 'expo-font'
import React, { useEffect } from 'react'
import { SplashScreen, Redirect, router } from 'expo-router'
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import CustomButton from '../components/customButton'
import { images } from'../constants'
import 'react-native-url-polyfill/auto'
import { useGlobalContext } from '../context/GlobalProvider';

SplashScreen.preventAutoHideAsync();
export default function App() {
    const {isLoading, isLoggedIn} = useGlobalContext

    if (!isLoading && isLoggedIn) {
      return <Redirect href={'/home'} />
    }
  const [fontsLoaded, error] = useFonts({
    "Poppins-Black": require('../assets/fonts/Poppins-Black.ttf'),
    "Poppins-Bold": require("../assets/fonts/Poppins-Bold.ttf"),
    "Poppins-ExtraBold": require("../assets/fonts/Poppins-ExtraBold.ttf"),
    "Poppins-ExtraLight": require("../assets/fonts/Poppins-ExtraLight.ttf"),
    "Poppins-Light": require("../assets/fonts/Poppins-Light.ttf"),
    "Poppins-Medium": require("../assets/fonts/Poppins-Medium.ttf"),
    "Poppins-Regular": require("../assets/fonts/Poppins-Regular.ttf"),
    "Poppins-SemiBold": require("../assets/fonts/Poppins-SemiBold.ttf"),
    "Poppins-Thin": require("../assets/fonts/Poppins-Thin.ttf"),
  })
useEffect(() => {
  if (error) throw error;
  
  if (fontsLoaded) {
    SplashScreen.hideAsync();
  }
},[fontsLoaded, error])

if (!fontsLoaded && !error) {
  return null
}

  return (
      <SafeAreaView className="bg-primary h-full">
        <ScrollView contentContainerStyle={{height: '100%'}}>
          <View className="w-full justify-center items-center px-4 min-h-[70vh]">
          <Image 
          source={images.logo}
          className="w-[130px] h-[84px] justify-cente"
          resizeMode="contain"
          />
          <Image 
          source={images.cards}
          className="max-w-[380px] h-[300px] w-full h-[300px] "
          resizeMode="contain"
          />

          <View className="relative mt-5">
            <Text className="text-3xl text-white font-pbold text-center">The Weather Never Felt So {" "}
          
            {/* Get Swept Away By Our Seductive Weather */}
            {/* Weather with a Flirty Twist */}
            <Text className="text-secondary-200 font-pblack">Irresistable</Text>
            </Text>
            <Image 
              source={images.path}
              className="w-[136px] h-[15px] absolute -bottom-1 left-32 "
              resizeMode='contain'
            />
          </View>
          <CustomButton 
          title="Continue with Email"
          handlePress={() =>{router.push('/sign-in')}}
          containerStyles="w-full mt-7"
          />
          </View>
        </ScrollView>
        <StatusBar backgroundColor='#161622' style='dark' />
      </SafeAreaView>
  );
}
