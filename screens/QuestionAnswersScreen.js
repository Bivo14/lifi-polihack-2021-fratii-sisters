import React from 'react';
import { View, StyleSheet } from 'react-native';
import QuestionCard from '../components/QuestionCard';

const QuestionAnswersScreen = () => {
  return (
    <View style={styles.container}>
      <QuestionCard />
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
export default QuestionAnswersScreen;
