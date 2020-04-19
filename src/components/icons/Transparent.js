import React, { useContext } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { Morph } from '../common';
import { Context as ColorContext } from '../../context/ColorContext';
import { navigate } from '../../navigationRef';
const { width } = Dimensions.get('window');

const Transparent = () => {
  const {
    state: {
      colors: { background, border, topShadow, bottomShadow, icon },
    },
  } = useContext(ColorContext);

  return (
    <View
      shadows={{ topShadow, bottomShadow }}
      border={border}
      background={background}
      style={{
        width: width < 1000 ? 50 : 75,
        height: width < 1000 ? 50 : 75,
        borderRadius: 50,
        backgroundColor: 'transparent',
      }}
    ></View>
  );
};

const styles = StyleSheet.create({});

export default Transparent;
