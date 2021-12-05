import React, { useEffect } from "react";
import {
  ActivityIndicator,
  StyleSheet,
  View,
  ImageBackground,
  Dimensions,
  Image,
} from "react-native";
import forest_image from "../images/forest2.png";
import our_amazing_logo from "../images/logo.png";
import { useDispatch } from "react-redux";
import { answerProcessingDone } from "../store/actions";

var width = Dimensions.get("window").width; //full width
var height = Dimensions.get("window").height; //full height

const SpinnerThingy = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    const timerId = setTimeout(() => {
      dispatch(answerProcessingDone());
    }, 2500);

    return () => {
      clearTimeout(timerId);
    };
  }, []);
  return (
    <View style={[styles.container, styles.horizontal]}>
      <ImageBackground
        source={forest_image}
        resizeMode='cover'
        style={styles.imageStyle}
        blurRadius={1}
      >
        <Image  resizeMode='contain' source={our_amazing_logo} style={styles.logoStyle} />
        <View style={{ position: "absolute", top: "50%", left: "50%" }}>
          <ActivityIndicator size='large' color='blue' />
        </View>
      </ImageBackground>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  horizontal: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  imageStyle: {
    marginBottom: 50,
    alignItems: "center",
    justifyContent: "center",
    width: width,
    height: height + 100,
    flex: 1,
    justifyContent: "center",
  },
  logoStyle: {
    marginBottom: 450,
    width: "30%",
    height: "30%",
  },
});

export default SpinnerThingy;
