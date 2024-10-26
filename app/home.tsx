import { useNavigation } from 'expo-router';
import React, { useLayoutEffect } from 'react';
import { SafeAreaView, Text, View } from 'react-native';

const Home = () => {
    const navigation = useNavigation();
useLayoutEffect(() => navigation.setOptions({
headerShown:false,
}))
  return (
    <SafeAreaView>
     <Text>asdsad</Text>
     {/* Header*/}
     <View>
      
     </View>
    </SafeAreaView>
  );
};

export default Home;