import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from '@react-navigation/stack';
import React from "react";
import { TailwindProvider } from "tailwindcss-react-native";
import products from "./products";

const Stack = createStackNavigator();

export default function App(){
  return (
    <NavigationContainer independent>
    <TailwindProvider>
    <Stack.Navigator>
      {/* <Stack.Screen name="Home" component={home} /> */}
      <Stack.Screen name="Products" component={products} />

      
    </Stack.Navigator>
    </TailwindProvider>
    </NavigationContainer>
  )
}
