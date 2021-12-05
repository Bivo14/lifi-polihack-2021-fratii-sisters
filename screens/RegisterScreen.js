import React from 'react';
import { View, StyleSheet } from 'react-native';

import RegisterFrom from '../components/RegisterForm';

const RegisterScreen = () => {
  return (
    <View style={styles.container}>
      <RegisterFrom />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default RegisterScreen;
