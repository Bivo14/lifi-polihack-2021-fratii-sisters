import React, { useState } from 'react';
import { StyleSheet, Dimensions, Text, View, Share } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { updateHabit } from '../../services/habit-services/HabitService';
import { updateUser } from '../../services/user-services/UserServiceHandler';
import { habitInc } from '../../store/actions';

import { useDispatch } from 'react-redux';

var width = Dimensions.get('window').width; //full width

const Habit = ({ habit, user }) => {
  const [set, reset] = useState(true);
  const [newHeight, setNewHeight] = useState(120);
  const [descriptionHidden, setDescriptionHidden] = useState(false);
  const [showLike, setShowLike] = useState(true);

  const dispatch = useDispatch();

  const getNotificationsIcon = () => {
    if (habit.notifications === true)
      return (
        <Ionicons
          name="alert-circle"
          size={25}
          onPress={() => changeNotificationsForHabit()}
          style={styles.icon}
        />
      );
    else
      return (
        <Ionicons
          name="alert-circle-outline"
          size={25}
          onPress={() => changeNotificationsForHabit()}
          style={styles.icon}
        />
      );
  };

  const changeNotificationsForHabit = () => {
    habit.notifications = !habit.notifications;
    updateHabit(habit);
    reset(!set);
  };

  const doHabit = () => {
    habit.rating++;
    user.score++;
    updateHabit(habit);
    updateUser(user);
    setShowLike(!showLike);
    reset(!set);
    dispatch(habitInc());
  };

  const changeHeight = () => {
    setNewHeight(430 - newHeight);
    setDescriptionHidden(!descriptionHidden);
  };

  const showDescription = () => {
    if (descriptionHidden) {
      return (
        <Text style={styles.textStyle} onPress={() => changeHeight()}>
          {habit.description}
        </Text>
      );
    }
  };

  const openShareScreen = async () => {
    try {
      const result = await Share.share({
        message: `Hey! My score on ${habit.title} is ${habit.rating}`,
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      alert(error.message);
    }
  };

  const showLikeButton = () => {
    if (showLike) {
      return (
        <Ionicons
          name="thumbs-up-outline"
          size={25}
          onPress={() => doHabit()}
          style={styles.icon}
        />
      );
    }
  };

  const styleFlex =
    descriptionHidden === true ? { flexDirection: 'column' } : '';
  return (
    <View
      style={{
        ...styles.viewStyle,
        height: newHeight,
        ...styleFlex,
      }}
    >
      <Text style={styles.textStyle} onPress={() => changeHeight()}>
        {habit.title}
      </Text>
      {showDescription()}
      <View style={{ flexDirection: 'row' }}>
        <Text style={styles.ratingStyle} onPress={() => changeHeight()}>
          {habit.rating}
        </Text>
        {showLikeButton()}
        {getNotificationsIcon()}
        <Ionicons
          name="share-social-outline"
          size={25}
          style={styles.icon}
          onPress={() => openShareScreen()}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  viewStyle: {
    marginTop: 30,
    backgroundColor: 'rgba(50, 200, 160, 0.7)',
    flex: 1,
    flexDirection: 'column',
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  textStyle: {
    color: 'white',
    margin: 7.5,
    fontSize: 24,
    alignContent: 'center',
    opacity: 1,
    textAlign: 'center',
  },
  ratingStyle: {
    margin: 7.5,
    fontSize: 24,
    alignContent: 'center',
    color: '#105657',
    opacity: 1,
  },
  icon: {
    margin: 7.5,
    color: 'white',
    opacity: 1,
  },
});

export default Habit;
