import React, { useEffect, useState } from 'react';
import {
  FlatList,
  ImageBackground,
  StyleSheet,
  Dimensions,
} from 'react-native';
import Users from '../../entities/Users';
import { fetchHabitsForUsers } from '../../services/habit-services/HabitService';
import Habit from './Habit';
import forest_image from '../../images/forest2.png';
import { useSelector } from 'react-redux';
import NotificationsService from '../Notifications';

var width = Dimensions.get('window').width; //full width
var height = Dimensions.get('window').height; //full height

const HabitScreen = () => {
  const user = useSelector(state => state.auth.user);

  useEffect(() => {
    initializeHabits();
  }, []);

  const [habits, setHabits] = useState([]);

  const initializeHabits = async () => {
    let hab = await fetchHabitsForUsers(
      new Users(
        user.key,
        user.username,
        user.firstName,
        user.lastName,
        user.password,
        user.email
      )
    );
    setHabits(hab);
    if (hab.length === 0) {
      initializeHabits();
    }
  };

  const createHabitComponent = ({ item }) => <Habit habit={item} user={user} />;

  return (
    <ImageBackground
      source={forest_image}
      resizeMode="cover"
      style={styles.imageStyle}
      blurRadius={1}
    >
      <NotificationsService />
      <FlatList
        data={habits}
        renderItem={createHabitComponent}
        keyExtractor={item => item.title}
      />
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  imageStyle: {
    paddingHorizontal: 25,
    paddingVertical: '25%',
    alignItems: 'center',
    justifyContent: 'center',
    width: width,
    height: height + 100,
    flex: 1,
  },
});

export default HabitScreen;
