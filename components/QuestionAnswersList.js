import React from 'react';
import { FlatList, View, Text, StyleSheet } from 'react-native';
import { Card } from 'react-native-shadow-cards';
import { TouchableOpacity } from 'react-native';

const QuestionAnswersList = props => {
  return (
    <View style={styles.flatListStyle}>
      <Text style={styles.questionStyle}>{props.questionTitle}</Text>
      <FlatList
        style={styles.flatListStyleNew}
        data={props.answersList}
        renderItem={item => {
          return (
            <TouchableOpacity
              onPress={() => {
                props.createQuestion(5);
              }}
            >
              <Card style={styles.cardStyle}>
                <Text>{item.item.value}</Text>
              </Card>
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  flatListStyleNew: {
    marginTop: -100,
    paddingVertical: 20,
  },
  flatListStyle: {
    top: '35%',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  questionStyle: {
    top: -150,
    paddingHorizontal: 5,
    textAlign: 'center',
    fontSize: 36,
    color: '#105657',
  },
  cardStyle: {
    padding: 25,
    margin: 15,
    opacity: 0.8,
  },
});

export default QuestionAnswersList;
