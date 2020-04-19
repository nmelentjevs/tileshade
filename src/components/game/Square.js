import React, { useContext } from 'react';
import { StyleSheet, TouchableOpacity, Platform } from 'react-native';
import { Morph } from '../common';
import { navigate } from '../../navigationRef';
import { Audio } from 'expo-av';
import { Context as TimeContext } from '../../context/TimeContext';
import { Context as ThemeContext } from '../../context/ThemeContext';

const Square = ({
  width,
  isSpecial,
  mode,
  background,
  border,
  topShadow,
  bottomShadow,
  special,
  level,
  changeColor,
  sound,
}) => {
  const soundObject = new Audio.Sound();
  const { stopTime, addTime } = useContext(TimeContext);

  const {
    state: { theme },
  } = useContext(ThemeContext);

  const nextLevel = async () => {
    if (sound) {
      try {
        await soundObject.loadAsync(require('../../../assets/sounds/tile.m4a'));
        await soundObject.playAsync();
        // Your sound is playing!
      } catch (error) {
        console.log(error);
      }
    }

    changeColor({ color: background, level, theme });
    addTime();
  };

  const endGame = () => {
    stopTime();
    navigate('GameOver', { level, mode });
  };

  return (
    <TouchableOpacity
      activeOpacity={Platform.OS === 'ios' ? 0.6 : 0.95}
      onPress={isSpecial ? nextLevel : endGame}
    >
      <Morph
        shadows={{ topShadow, bottomShadow }}
        border={border}
        background={background}
        style={{
          ...styles.square,
          width,
          height: width,
          backgroundColor: isSpecial ? special : background,
        }}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  square: {
    margin: 5,
  },
});

export default Square;
