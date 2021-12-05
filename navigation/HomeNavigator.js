import React from 'react';
import { StyleSheet } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { Ionicons } from '@expo/vector-icons';
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';

//* screens
import RegisterScreen from '../screens/RegisterScreen';
import LoginScreen from '../screens/LoginScreen';

const tabScreenConfig = {
  Login: {
    screen: LoginScreen,
    navigationOptions: {
      tabBarIcon: tabInfo => {
        return <Ionicons name="log-in-outline" size={25} style={styles.icon} />;
      },
    },
  },
  Register: {
    screen: RegisterScreen,
    navigationOptions: {
      tabBarIcon: tabInfo => {
        return (
          <Ionicons name="person-add-outline" size={25} style={styles.icon} />
        );
      },
    },
  },
};

const HomeNavigator = createMaterialBottomTabNavigator(tabScreenConfig, {
  activeTintColor: 'white',
  shifting: true,
  barStyle: {
    backgroundColor: 'rgba(22, 22, 22, 0.1)',
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    elevation: 0,
  },
});

const styles = StyleSheet.create({
  icon: {
    color: 'white',
  },
});

export default createAppContainer(HomeNavigator);
