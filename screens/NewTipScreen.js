import React from 'react';
import { View, StyleSheet} from 'react-native';

import NewTipsForm from '../components/AddTips';

const NewTipsScreen = () => {
  return (
    <View style={styles.container}>
      <NewTipsForm />
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

export default NewTipsScreen;
