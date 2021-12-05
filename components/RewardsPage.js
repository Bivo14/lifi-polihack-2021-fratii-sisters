import React, { useEffect, useState } from 'react';
import { fetchRewards } from '../services/reward-services/RewardServiceHandler';
import { updateUser } from '../services/user-services/UserServiceHandler';
import { useSelector } from 'react-redux';
import {
  Image,
  FlatList,
  Text,
  StyleSheet,
  View,
  TouchableOpacity,
  ImageBackground,
  Dimensions,
} from 'react-native';

import forest_image from '../images/forest2.png';

var width = Dimensions.get('window').width; //full width
var height = Dimensions.get('window').height; //full height

const imageData = require('../assets/imageData.json');

const Item = ({ reward, user, buyItem }) => (
  <View style={styles.containerItem}>
    <Image
      style={{ flex: 1, width: 80, height: 80, resizeMode: 'contain' }}
      source={{ uri: imageData[reward.img] }}
    />
    <View style={{ flex: 1 }}>
      <Text style={{ fontWeight: 'bold' }}>{reward.name}</Text>
      <Text style={{ color: '#585858' }}>{reward.description}</Text>
      <Text style={{ color: '#585858' }}>Price: {reward.points}</Text>
    </View>

    <TouchableOpacity
      style={styles.btnContainer}
      onPress={() => buyItem(reward)}
    >
      <Text style={styles.btn}>Buy</Text>
    </TouchableOpacity>
  </View>
);
const RewardsPage = () => {
  const user = useSelector(state => state.auth.user);
  const [rewards, setRewards] = useState([]);
  const renderItem = ({ item }) => (
    <Item reward={item} user={user} buyItem={buyItem} />
  );

  useEffect(async () => {
    setRewards(await fetchRewards());
    console.log(rewards);
  }, []);

  const buyItem = reward => {
    if (user.score < reward.points) return;
    user.score -= reward.points;
    updateUser(user);
    setRewards(rewards.filter(rew => rew.name !== reward.name));
  };

  return (
    <ImageBackground
      source={forest_image}
      resizeMode="cover"
      style={imageStyle}
      blurRadius={1}
    >
      <Text style={{ marginTop: 50, fontSize: 18, textAlign: 'center' }}>
        Reward Points: {user.score}
      </Text>

      <FlatList
        data={rewards}
        renderItem={renderItem}
        keyExtractor={item => item.key}
      />
    </ImageBackground>
  );
};
const styles = StyleSheet.create({
  containerItem: {
    marginTop: 50,
    flexDirection: 'row',
    backgroundColor: '#f5f5f5',
    padding: 10,
    borderRadius: 25,
  },
  btnContainer: {
    alignSelf: 'center',
    padding: 10,
    margin: 5,
    backgroundColor: '#0074CC',
    borderRadius: 25,
  },
  btn: {
    color: 'white',
  },
  imageStyle: {
    paddingHorizontal: 25,
    paddingTop: '10%',
    width: width,
    height: height + 100,
    flex: 1,
  },
});

const imageStyle = StyleSheet.compose(styles.imageStyle);

export default RewardsPage;
