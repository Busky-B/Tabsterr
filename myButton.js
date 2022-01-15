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
    backgroundColor: 'transparent',
    borderRadius: 10,
    elevation: 3,
    borderColor: '#395244',
    borderWidth: 2,
  },

  buttonContainerSmall: {
    width:75,
    alignSelf:'center',
    marginTop: 5,
    borderRadius: 10,
    elevation: 3,
    borderColor: '#395244',
    borderWidth: 2,
  },
  button: {
    backgroundColor:'#395244', 
    alignSelf: 'center',
    width: '100%',
    paddingVertical: 12,
    paddingHorizontal: 32,
    elevation: 3, // Somehow messes with the overall look
  },
  buttonSmall: {
    backgroundColor:'#52605999',
    alignSelf: 'center',
    width: '100%',
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ddd',
    textAlign: 'center',
  },

  textSmall: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#ddd',
  },
});
