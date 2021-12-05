import React, { useEffect, useState } from 'react';
import GestureRecognizer, {
  swipeDirections,
} from 'react-native-swipe-gestures';
import {
  View,
  StyleSheet,
  ImageBackground,
  Dimensions,
  Text,
} from 'react-native';
import forest_image from '../images/forest2.png';
import { fetchTips } from '../services/tips-service/TipsServiceHandler';
import CardTip from './CardTip';

var width = Dimensions.get('window').width;
var height = Dimensions.get('window').height;

let index = 0;

const ViewTipsList = () => {
  const [tipsList, setTipsList] = useState([]);
  const [cardTitle, setCardTitle] = useState('');
  const [cardDescription, setCardDescription] = useState('');

  const caca = async () => {
    const response = await fetchTips();
    console.log(response);
    setTipsList(response);
    setCardTitle(response[0].title);
    setCardDescription(response[0].description);
  };
  useEffect(() => {
    caca();
  }, []);

  const onSwipe = (newGestureName, gestureState) => {
    const { SWIPE_UP, SWIPE_DOWN } = swipeDirections;
    switch (newGestureName) {
      case SWIPE_UP:
        if (index === tipsList.length - 1) break;
        index++;
        setCardTitle(tipsList[index].title);
        setCardDescription(tipsList[index].description);
        break;
      case SWIPE_DOWN:
        if (index === 0) break;
        index--;
        setCardTitle(tipsList[index].title);
        setCardDescription(tipsList[index].description);
        break;
      default:
        break;
    }
  };

  const displayTips = () => {
    const config = {
      velocityThreshold: 0.3,
      directionalOffsetThreshold: 80,
    };
    return (
      <View style={styles.container}>
        <ImageBackground
          source={forest_image}
          resizeMode="cover"
          style={imageStyle}
          blurRadius={1}
        >
          <GestureRecognizer
            onSwipe={(direction, state) => onSwipe(direction, state)}
            config={config}
            style={{ flex: 1 }}
          >
            <CardTip title={cardTitle} description={cardDescription} />
          </GestureRecognizer>
        </ImageBackground>
      </View>
    );
  };

  return displayTips();
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 2,
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

const imageStyle = StyleSheet.compose(styles.imageStyle);

export default ViewTipsList;
