import React, { useContext } from 'react';
import { TouchableOpacity, StyleSheet, Linking } from 'react-native';
import { Morph } from '../common';
import { Context as ColorContext } from '../../context/ColorContext';
import { AntDesign } from '@expo/vector-icons';

const Star = () => {
  const {
    state: {
      colors: { background, border, topShadow, bottomShadow },
    },
  } = useContext(ColorContext);

  const rateGame = () => {
    console.log('rate game');
  };

  return (
    <TouchableOpacity activeOpacity={0.6} onPress={rateGame}>
      <Morph
        shadows={{ topShadow, bottomShadow }}
        border={border}
        background={background}
        style={{
          width: 50,
          height: 50,
          borderRadius: 50,
        }}
      >
        <AntDesign
          name="star"
          size={20}
          color={background.lighten(0.5).hex()}
        />
      </Morph>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({});

export default Star;
