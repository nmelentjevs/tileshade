import React, { useContext } from 'react';
import { Image, Easing, Animated, Platform } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import {} from '@expo/vector-icons';

import {
  GameScreen,
  WelcomeScreen,
  GameOverScreen,
  HighScoreScreen,
  ShopScreen,
} from '../screens';

let CollapseExpand = (index, position) => {
  const inputRange = [index - 1, index, index + 1];
  const opacity = position.interpolate({
    inputRange,
    outputRange: [0, 1, 1],
  });

  const scaleY = position.interpolate({
    inputRange,
    outputRange: [1.025, 1, 1],
  });

  return {
    opacity,
    transform: [{ scaleY }],
  };
};

let Fade = (index, position) => {
  const inputRange = [index - 1, index, index + 1];
  const opacity = position.interpolate({
    inputRange,
    outputRange: [0, 1, 1],
  });

  const scaleY = position.interpolate({
    inputRange,
    outputRange: [1, 1, 1],
  });

  return {
    opacity,
    transform: [{ scaleY }],
  };
};

const TransitionConfiguration = () => {
  // if (Platform.OS === 'ios') {
  return {
    transitionSpec: {
      duration: 500,
      // easing: Easing.out(Easing.poly(2)),
      timing: Animated.timing,
      useNativeDriver: true,
    },
    screenInterpolator: (sceneProps) => {
      const { layout, position, scene } = sceneProps;
      const width = layout.initWidth;
      const { index, route } = scene;
      const params = route.params || {}; // <- That's new
      const transition = params.transition || 'default'; // <- That's new
      return {
        default: CollapseExpand(index, position),
        fade: Fade(index, position),
      }[transition];
    },
  };
  // } else {
  //   return {};
  // }
};

const defaultConfig = {
  transitionConfig: TransitionConfiguration,
  defaultNavigationOptions: {
    header: null,
  },
};

const gameFlow = createStackNavigator(
  {
    Game: GameScreen,
    GameOver: GameOverScreen,
  },
  {
    initialRouteName: 'Game',
    ...defaultConfig,
  }
);

const screens = createStackNavigator(
  {
    Welcome: WelcomeScreen,
    gameFlow,
    HighScores: HighScoreScreen,
    Shop: ShopScreen,
  },
  {
    initialRouteName: 'Welcome',
    ...defaultConfig,
  }
);

export default createAppContainer(screens);
