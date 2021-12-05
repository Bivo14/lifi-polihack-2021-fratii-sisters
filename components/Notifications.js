import React from 'react';
import { useEffect, useState, useRef } from 'react';
import { useSelector } from 'react-redux';
import { View } from 'react-native';
import * as Notifications from 'expo-notifications';
import Constants from 'expo-constants';
import { fetchActiveHabitsForUsers } from '../services/habit-services/HabitService';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

const NotificationsService = () => {
  const user = useSelector(state => state.auth.user);
  const [expoPushToken, setExpoPushToken] = useState('');
  const [notification, setNotification] = useState(false);
  const notificationListener = useRef();
  const responseListener = useRef();

  useEffect(() => {
    setInterval(async () => {
      if (user) {
        await schedulePushNotification(user).catch(err => console.log(err));
      }
    }, 15000);
  }, [user]);

  useEffect(() => {
    registerForPushNotificationsAsync().then(token => setExpoPushToken(token));

    notificationListener.current =
      Notifications.addNotificationReceivedListener(notification => {
        setNotification(notification);
      });

    responseListener.current =
      Notifications.addNotificationResponseReceivedListener(response => {
        console.log(response);
      });

    return () => {
      Notifications.removeNotificationSubscription(
        notificationListener.current
      );
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);

  return <View></View>;
};

async function schedulePushNotification(user) {
  let activeHabits = await fetchActiveHabitsForUsers(user);
  const activeHabit =
    activeHabits[Math.floor(Math.random() * activeHabits.length)];
  await Notifications.scheduleNotificationAsync({
    content: {
      title: activeHabit.title,
      body: activeHabit.description,
      data: { data: 'goes here' },
    },
    trigger: { seconds: 2 },
  });
}

async function registerForPushNotificationsAsync() {
  let token;
  if (Constants.isDevice) {
    const { status: existingStatus } =
      await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== 'granted') {
      alert('Failed to get push token for push notification!');
      return;
    }
    token = (await Notifications.getExpoPushTokenAsync()).data;
    console.log(token);
  } else {
    alert('Must use physical device for Push Notifications');
  }

  if (Platform.OS === 'android') {
    Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C',
    });
  }

  return token;
}

export default NotificationsService;
