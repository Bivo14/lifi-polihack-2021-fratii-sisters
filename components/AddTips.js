import React, { useState } from "react";
import { StyleSheet, View, Dimensions, ImageBackground, } from "react-native";
import { addTips } from "../services/tips-service/TipsServiceHandler";

import { Form, FormItem } from 'react-native-form-component';

import forest_image from '../images/forest2.png';

var width = Dimensions.get('window').width; //full width
var height = Dimensions.get('window').height; //full height

const NewTipsForm = () => {
  const [tip, setNewTip] = useState({
    title: "",
    description: "",
  });
  const handleFieldChange = (key, input) => {
    setNewTip({ ...tip, [key]: input });
  };
  const onSubmitForm = () => {
    addTips(tip);
    console.log(tip);
  };
  return (
    <View>
      <ImageBackground
        source={forest_image}
        resizeMode="cover"
        style={imageStyle}
        blurRadius={1}
      >
      <Form
          onButtonPress={onSubmitForm}
          buttonStyle={{
            backgroundColor: '#EDEAC2',
            shadowColor: '#000',
            shadowOpacity: 0.25,
          }}
          buttonTextStyle={{ color: '#105657' }}
          buttonText="Add tip!"
        >
        <FormItem
          placeholder='Title'
          onChangeText={text => handleFieldChange("title", text)}
          value={tip.title}
          name='title'
          style={inputStyle}
        />
        <FormItem
          placeholder='Description'
          onChangeText={text => handleFieldChange("description", text)}
          value={tip.description}
          name='description'
          style={inputStyle}
        />
      </Form>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  inputStyle: {
    borderRadius: 25,
    width: 225,
    opacity: 0.9,
  },

  imageStyle: {
    paddingTop: '80%',
    alignItems: 'center',
    justifyContent: 'center',
    width: width,
    height: height + 100,
    flex: 1,
    justifyContent: 'center',
  },
});

const inputStyle = StyleSheet.compose(styles.inputStyle);
const imageStyle = StyleSheet.compose(styles.imageStyle);


export default NewTipsForm;
