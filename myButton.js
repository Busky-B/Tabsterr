import { RedditCircleFilled } from '@ant-design/icons';
import React, { useEffect } from 'react';
import { Text, View, StyleSheet, Pressable, Animated } from 'react-native';
import { TouchableOpacity } from 'react-native-web';
import { useState } from 'react/cjs/react.development';

// refactored example from docs.expo.dev
export default function MyButton(props) {
  const { onPress, title = 'Button' } = props;
  const btnScale = new Animated.Value(1);
//   const [btnColor, setBtnColor] = useState(new Animated.Value(0))
  const btnColor = new Animated.Value(0.1)
  const onPressIn = () => {
      console.log("Entered onPressIn")
      Animated.spring(btnScale, { toValue: 1.1, useNativeDriver: true,})
        .start();
      Animated.spring(btnColor, { toValue:0.7, useNativeDriver: true})
        .start() 
  };
  const onPressOut = () => {
      Animated.spring(btnScale, {
          toValue: 1, useNativeDriver:true
      }).start()

  }
  const aniScaleTarget = {
      transform: [{scale: btnScale}]
  }
//   const colorInterpolation = btnColor.interpolate({
//     inputRange: [0, 1],
//     outputRange: ["rgb(255,255,255)" , "rgb(0,0,0)"]
//   });
  const aniColorTarget = {
      opacity: btnColor 
  }

  useEffect(() => onPressIn)
  return (

    <Animated.View style={[styles.buttonContainer, aniScaleTarget]} onPressIn>
    <Pressable style={styles.button} onPress={onPress} onPressIn={onPressIn} onPressOut={onPressOut}>
        <Text style={styles.text}>{title}</Text>
    </Pressable>
      </Animated.View>
  );
}

export function MyButtonSmall(props) {
  const { onPress, title = 'Button' } = props;
  const btnScale = new Animated.Value(1);
//   const [btnColor, setBtnColor] = useState(new Animated.Value(0))
  const btnColor = new Animated.Value(0.1)
  const onPressIn = () => {
      console.log("Entered onPressIn")
      Animated.spring(btnScale, { toValue: 1.1, useNativeDriver: true,})
        .start();
      Animated.spring(btnColor, { toValue:0.7, useNativeDriver: true})
        .start() 
  };
  const onPressOut = () => {
      Animated.spring(btnScale, {
          toValue: 1, useNativeDriver:true
      }).start()

  }
  const aniScaleTarget = {
      transform: [{scale: btnScale}]
  }
//   const colorInterpolation = btnColor.interpolate({
//     inputRange: [0, 1],
//     outputRange: ["rgb(255,255,255)" , "rgb(0,0,0)"]
//   });
  const aniColorTarget = {
      opacity: btnColor 
  }

  useEffect(() => onPressIn)
  return (

    <Animated.View style={[styles.buttonContainerSmall, aniScaleTarget]} onPressIn>
    <Pressable style={styles.buttonSmall} onPress={onPress} onPressIn={onPressIn} onPressOut={onPressOut}>
        <Text style={styles.textSmall}>{title}</Text>
    </Pressable>
      </Animated.View>
  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    // // alignItems: 'center',
    // // justifyContent: 'center',
    // backgroundColor: '#d9e3de',
    // backgroundColor: '#526059fa',
    backgroundColor: 'transparent',
    borderRadius: 10,
    // opacity: 1,
    elevation: 3,
    borderColor: '#395244',
    borderWidth: 2,
    // padding: 10,
    
    
  },

  buttonContainerSmall: {
    width:75,
    alignSelf:'center',
    marginTop: 5,
    // alignItems: 'center',
    // // justifyContent: 'center',
    // backgroundColor: '#d9e3de',
    // backgroundColor: '#526059fa',
    // backgroundColor: 'transparent',
    borderRadius: 10,
    // opacity: 1,
    elevation: 3,
    borderColor: '#395244',
    borderWidth: 2,
    // padding: 10,
    
    
  },
  button: {
    backgroundColor:'#52605999',
    alignSelf: 'center',
    width: '100%',
    // // flex:1 ,
    // // alignItems: 'center',
    // // justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 32,
    // backgroundColor: 'red',
    // borderRadius: 4,
    // // elevation: 3, // Somehow messes with the overall look
    // // opacity: 0.9,
    // backgroundColor: '#d9e3de',
    // margin: 10,
    // // backgroundColor: 'black',
    // padding: 0,
  },
  buttonSmall: {
    backgroundColor:'#52605999',
    alignSelf: 'center',
    width: '100%',
    // // flex:1 ,
    // // alignItems: 'center',
    // // justifyContent: 'center',
    paddingVertical: 8,
    paddingHorizontal: 12,
    // backgroundColor: 'red',
    // borderRadius: 4,
    // // elevation: 3, // Somehow messes with the overall look
    // // opacity: 0.9,
    // backgroundColor: '#d9e3de',
    // margin: 10,
    // // backgroundColor: 'black',
    // padding: 0,
  },
  text: {
    fontSize: 24,
    // // lineHeight: 21,
    fontWeight: 'bold',
    // letterSpacing: 0.25,
    color: '#ddd',

  },

  textSmall: {
    fontSize: 12,
    // // lineHeight: 21,
    fontWeight: 'bold',
    // letterSpacing: 0.25,
    color: '#ddd',

  },
});
