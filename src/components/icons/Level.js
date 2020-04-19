import React, { useContext } from 'react';
import { Morph } from '../common';
import { Text, StyleSheet, Dimensions } from 'react-native';
import { Context as ColorContext } from '../../context/ColorContext';
const { width } = Dimensions.get('window');

const Level = () => {
  const {
    state: {
      colors: { background, border, topShadow, bottomShadow },
      level,
    },
  } = useContext(ColorContext);
  return (
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
      <Text
        style={{
          ...styles.level,
          color: background.lighten(0.9).hex(),
        }}
      >
        {level}
      </Text>
    </Morph>
  );
};

const styles = StyleSheet.create({
  level: {
    color: 'white',
    fontSize: 25,
    fontFamily: 'poiret',
  },
});

export default Level;
