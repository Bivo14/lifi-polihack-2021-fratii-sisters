import React, { useState } from 'react';
import { StyleSheet, View, Dimensions, ImageBackground } from 'react-native';
import { addUsers } from '../services/user-services/UserServiceHandler';
import { Form, FormItem } from 'react-native-form-component';
import { useDispatch } from 'react-redux';
import { register } from '../store/actions';

import forest_image from '../images/forest2.png';

var width = Dimensions.get('window').width; //full width
var height = Dimensions.get('window').height; //full height

const RegisterForm = () => {
  const [user, setNewUser] = useState({
    email: '',
    password: '',
  });

  const dispatch = useDispatch();

  const handleFieldChange = (key, input) => {
    setNewUser({ ...user, [key]: input });
  };
  const onSubmitForm = async () => {
    const userAdded = await addUsers(user);
    dispatch(register(userAdded));
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
        >
          <FormItem
            placeholder="Username"
            isRequired
            value={user.username}
            name="username"
            onChangeText={text => handleFieldChange('username', text)}
            style={inputStyle}
          />

          <FormItem
            placeholder="First name"
            isRequired
            value={user.firstName}
            name="firstName"
            onChangeText={text => handleFieldChange('firstName', text)}
            style={inputStyle}
          />

          <FormItem
            placeholder="Last name"
            isRequired
            value={user.lastName}
            name="lastName"
            onChangeText={text => handleFieldChange('lastName', text)}
            style={inputStyle}
          />

          <FormItem
            placeholder="Email"
            isRequired
            value={user.email}
            name="email"
            onChangeText={text => handleFieldChange('email', text)}
            style={inputStyle}
          />

          <FormItem
            placeholder="Password"
            isRequired
            value={user.password}
            name="password"
            onChangeText={text => handleFieldChange('password', text)}
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
    paddingTop: '60%',
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

export default RegisterForm;
