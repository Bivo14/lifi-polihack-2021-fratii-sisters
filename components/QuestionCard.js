import forest_image from "../images/forest2.png";
import { StyleSheet, View, Dimensions, ImageBackground } from "react-native";
import React, { useState } from "react";
import QuestionAnswersList from "./QuestionAnswersList";
import { useDispatch } from "react-redux";
import { answerProcessing } from "../store/actions";

var width = Dimensions.get("window").width; //full width
var height = Dimensions.get("window").height; //full height

const questions = [
  {
    question:
      "How often do you incorrectly dispose worn out batteries and ink cartridges?",
    answers: [
      { id: 1, value: "Never" },
      { id: 2, value: "Sometimes" },
      { id: 3, value: "Often" },
      { id: 4, value: "Always" },
    ],
    hasBeenBefore: true,
  },
  {
    question:
      "Do you usually leave your electronic devices (TV, Phone, Tablet etc.) running when you are not using them?",
    answers: [
      { id: 1, value: "No, I close them everytime I do not use them." },
      { id: 2, value: "I, sometimes, forget to turn them off." },
      { id: 3, value: "Yes, I leave them running all the time." },
    ],
    hasBeenBefore: false,
  },
  {
    question: "Do you overshop? (buy more things than you actually need)",
    answers: [
      {
        id: 1,
        value: "Yes. You never know when you need them!",
      },
      {
        id: 2,
        value: "Sometimes when I forget to do a shopping list.",
      },
      { id: 3, value: "Never. I always buy exactly what I need." },
    ],
    hasBeenBefore: false,
  },
  {
    question: "Do you always drive to your workplace?",
    answers: [
      { id: 1, value: "Yes! My car is my best friend." },
      { id: 2, value: "Sometimes if I am in a hurry." },
      { id: 3, value: "I usually use the public transportation." },
      { id: 4, value: "No! Never, I prefer walking." },
    ],
    hasBeenBefore: false,
  },
  {
    question: "Do you usually forget to turn off the lights or water?",
    answers: [
      {
        id: 1,
        value: "Yes. I always forget some lights on when I go downtown.",
      },
      { id: 2, value: "Sometimes, if I am really sleepy." },
      { id: 3, value: "Never! I always double check them before I go out." },
    ],
    hasBeenBefore: false,
  },
];

function getRandomInt(max) {
  const index = Math.floor(Math.random() * max);

  return index;
}

const QuestionCard = () => {
  const [question, setQuestion] = useState(questions[0]);

  const dispatch = useDispatch();

  const generateNewQuestion = index => {
    let newIndex = getRandomInt(index);
    if (questions[newIndex].hasBeenBefore === false) {
      questions[newIndex].hasBeenBefore = true;
      setQuestion(questions[newIndex]);
    } else if (
      questions.find(question => question.hasBeenBefore === false) !== undefined
    ) {
      generateNewQuestion(5);
    } else {
      dispatch(answerProcessing());
    }
  };

  return (
    <View>
      <ImageBackground
        source={forest_image}
        style={imageStyle}
        resizeMode='cover'
        blurRadius={1}
      >
        <QuestionAnswersList
          createQuestion={generateNewQuestion}
          questionTitle={question.question}
          answersList={question.answers}
        />
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  imageStyle: {
    alignItems: "center",
    justifyContent: "center",
    width: width,
    height: height + 100,
    flex: 1,
    justifyContent: "center",
  },
});

const imageStyle = StyleSheet.compose(styles.imageStyle);

export default QuestionCard;
