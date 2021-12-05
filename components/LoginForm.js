import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Dimensions,
  ImageBackground,
  Image,
} from "react-native";
import { Form, FormItem } from "react-native-form-component";
import { loginUser } from "../services/user-services/AuthServiceHandler";
import { useDispatch } from "react-redux";
import { login } from "../store/actions";

import forest_image from "../images/forest2.png";
import our_amazing_logo from "../images/logo.png";

var width = Dimensions.get("window").width; //full width
var height = Dimensions.get("window").height; //full height

const LoginForm = () => {
  const [user, setCurrentUser] = useState({
    username: "",
    password: "",
  });

  const dispatch = useDispatch();

  const handleFieldChange = (key, input) => {
    setCurrentUser({ ...user, [key]: input });
  };

  const onSubmitForm = async () => {
    const userToLog = await loginUser(user);
    dispatch(login(userToLog));
  };

  return (
    <View>
      <ImageBackground
        source={forest_image}
        resizeMode='cover'
        style={imageStyle}
        blurRadius={1}
      >
        <Image resizeMode='contain' source={our_amazing_logo} style={styles.logoStyle} />
        <Form
          onButtonPress={onSubmitForm}
          buttonStyle={{
            backgroundColor: "#EDEAC2",
            shadowColor: "#000",
            shadowOpacity: 0.25,
          }}
          buttonTextStyle={{ color: "#105657" }}
          buttonText='Login'
        >
          <FormItem
            placeholder='Username'
            isRequired
            value={user.username}
            name='username'
            onChangeText={text => handleFieldChange("username", text)}
            style={inputStyle}
          />
          <FormItem
            placeholder='Password'
            isRequired
            value={user.password}
            name='password'
            onChangeText={text => handleFieldChange("password", text)}
            secureTextEntry={true}
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
    paddingTop: "20%",
    alignItems: "center",
    justifyContent: "center",
    width: width,
    height: height + 100,
    flex: 1,
    justifyContent: "center",
  },
  logoStyle: {
    marginBottom: 50,
    width: "50%",
    height: "40%",
    
  },
});

const inputStyle = StyleSheet.compose(styles.inputStyle);
const imageStyle = StyleSheet.compose(styles.imageStyle);

export default LoginForm;
