import React, { useEffect, useState } from 'react';
import {
  Image,
  ImageBackground,
  Text,
  StyleSheet,
  View,
  TouchableOpacity,
  Button,
  Dimensions,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { fetchRewards } from '../services/reward-services/RewardServiceHandler';
import forest_image from '../images/forest2.png';

var width = Dimensions.get('window').width; //full width
var height = Dimensions.get('window').height; //full height
const imageData = require('../assets/imageData.json');

const Item = ({ reward }) => (
  <View>
    <Image source={{ uri: imageData[reward.img], width: 180, height: 180 }} />
    <View>
      <Text>{reward.name}</Text>
      <Text>{reward.description}</Text>
      <Text>{reward.price}</Text>
    </View>
    <Button title="Buy" />
  </View>
);
const TreePage = () => {
  const [apple, setApple] = useState(0);
  const [trippy, setTrippy] = useState(0);
  const [sunglasses, setSunglasses] = useState(0);
  const [chiuaua, setChiuaua] = useState(0);

  return (
    <ImageBackground
      source={forest_image}
      resizeMode="cover"
      style={styles.imageStyle}
      blurRadius={1}
    >
      <View
        style={{
          resizeMode: 'contain',
          height: Dimensions.get('window').height * 0.82,
          width: Dimensions.get('window').width,
          borderColor: 'red',
        }}
      >
        <Image
          style={{
            resizeMode: 'contain',
            position: 'absolute',
            height: Dimensions.get('window').height * 0.9,
            width: Dimensions.get('window').width,
          }}
          source={require('../assets/tree.png')}
        />
        <Image
          style={{
            opacity: trippy,
            resizeMode: 'contain',
            position: 'absolute',
            height: Dimensions.get('window').height * 0.9,
            width: Dimensions.get('window').width,
          }}
          source={require('../assets/trippy.png')}
        />
        <Image
          style={{
            opacity: sunglasses,
            resizeMode: 'contain',
            position: 'absolute',
            height: Dimensions.get('window').height * 0.9,
            width: Dimensions.get('window').width,
          }}
          source={require('../assets/sunglasses.png')}
        />
        <Image
          style={{
            opacity: chiuaua,
            resizeMode: 'contain',
            position: 'absolute',
            height: Dimensions.get('window').height * 0.9,
            width: Dimensions.get('window').width,
          }}
          source={require('../assets/chiuaua.png')}
        />
        <Image
          style={{
            opacity: apple,
            resizeMode: 'contain',
            position: 'absolute',
            height: Dimensions.get('window').height * 0.9,
            width: Dimensions.get('window').width,
          }}
          source={require('../assets/apples.png')}
        />
      </View>
      <View
        style={{
          flexDirection: 'row',
          resizeMode: 'contain',
          height: Dimensions.get('window').height * 0.25,
          width: Dimensions.get('window').width,
          backgroundColor: 'rgba(245, 245, 245, 0.35)',
        }}
      >
        <View>
          <TouchableOpacity
            style={styles.icon}
            onPress={() => setTrippy(trippy ? 0 : 1)}
          >
            <Ionicons name="add-circle-outline" size={35} />
          </TouchableOpacity>
          <Image
            style={{
              flex: 1,
              resizeMode: 'contain',
              height: Dimensions.get('window').height * 0.5,
              width: Dimensions.get('window').width * 0.25,
              marginBottom: 70,
            }}
            source={require('../assets/icon_trippy.png')}
          />
        </View>
        <View>
          <TouchableOpacity
            style={styles.icon}
            onPress={() => setSunglasses(sunglasses ? 0 : 1)}
          >
            <Ionicons name="add-circle-outline" size={35} />
          </TouchableOpacity>
          <Image
            style={{
              flex: 1,
              resizeMode: 'contain',
              height: Dimensions.get('window').height * 0.15,
              width: Dimensions.get('window').width * 0.25,
              marginBottom: 70,
            }}
            source={require('../assets/icon_sunglasses.png')}
          />
        </View>
        <View>
          <TouchableOpacity
            style={styles.icon}
            onPress={() => setChiuaua(chiuaua ? 0 : 1)}
          >
            <Ionicons name="add-circle-outline" size={35} />
          </TouchableOpacity>
          <Image
            style={{
              flex: 1,
              resizeMode: 'contain',
              height: Dimensions.get('window').height * 0.15,
              width: Dimensions.get('window').width * 0.25,
              marginBottom: 70,
            }}
            source={require('../assets/icon_chiuaua.png')}
          />
        </View>
        <View>
          <TouchableOpacity
            style={styles.icon}
            onPress={() => setApple(apple ? 0 : 1)}
          >
            <Ionicons name="add-circle-outline" size={35} />
          </TouchableOpacity>
          <Image
            style={{
              flex: 1,
              resizeMode: 'contain',
              height: Dimensions.get('window').height * 0.15,
              width: Dimensions.get('window').width * 0.25,
              marginBottom: 70,
            }}
            source={require('../assets/icon_apple.png')}
          />
        </View>
      </View>
    </ImageBackground>
  );
};
const styles = StyleSheet.create({
  icon: {
    alignSelf: 'center',
  },
  imageStyle: {
    alignItems: 'center',
    justifyContent: 'center',
    width: width,
    height: height + 100,
    flex: 1,
    justifyContent: 'center',
  },
});

export default TreePage;
