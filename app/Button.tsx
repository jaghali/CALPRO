import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

const Button = () => (
  <View>
    <Text style={styles.buttonText}>Press me</Text>
  </View>
);

const styles = StyleSheet.create({
  buttonText: {
    color: 'white',
  },
});

export default Button;