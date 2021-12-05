import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const CardTip = props => {
  const { title, description } = props;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.description}>{description}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    backgroundColor: '#f5f5f5',
    borderRadius: 25,
    overflow: 'hidden',
    marginVertical: 10,
    padding: 20,
    width: 350,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  description: {
    color: '#585858',
  },
});

export default CardTip;
