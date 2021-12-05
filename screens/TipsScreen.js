import React from 'react';
import { View, StyleSheet } from 'react-native';

import ViewTipsList from '../components/ViewTips';

const TipsScreen = () => {
  return (
    <View style={styles.container}>
      <ViewTipsList />
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

export default TipsScreen;
