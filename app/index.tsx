import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from '@react-navigation/stack';
import React from "react";
import { TailwindProvider } from "tailwindcss-react-native";
import Home from "./home";
import products from "./products";

const Stack = createStackNavigator();

export default function App(){
  return (
    <NavigationContainer independent>
    <TailwindProvider>
    <Stack.Navigator>
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="Products" component={products} />

      
    </Stack.Navigator>
    </TailwindProvider>
    </NavigationContainer>
  )
}
