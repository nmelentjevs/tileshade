import React, { useContext } from 'react';
import { TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { Morph } from '../common';
import { Context as ColorContext } from '../../context/ColorContext';
import { Ionicons } from '@expo/vector-icons';
import { navigate } from '../../navigationRef';
const { width } = Dimensions.get('window');

const Highscore = () => {
  const {
    state: {
      colors: { background, border, topShadow, bottomShadow, icon },
    },
  } = useContext(ColorContext);

  return (
    <TouchableOpacity
      activeOpacity={0.6}
      onPress={() => navigate('HighScores')}
    >
      <Morph
        shadows={{ topShadow, bottomShadow }}
        border={border}
        background={background}
        style={{
          width: width < 1000 ? 50 : 75,
          height: width < 1000 ? 50 : 75,
          borderRadius: 50,
        }}
      >
        <Ionicons name="ios-podium" size={20} color={icon.hex()} />
      </Morph>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({});

export default Highscore;
