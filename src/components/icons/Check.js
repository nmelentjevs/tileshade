import React, { useContext } from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import { Morph } from '../common';
import { Context as ColorContext } from '../../context/ColorContext';
import { Feather } from '@expo/vector-icons';

const Check = ({ size = 25 }) => {
  const {
    state: {
      colors: { background, border, topShadow, bottomShadow, buttonBackground },
    },
  } = useContext(ColorContext);

  return (
    <TouchableOpacity activeOpacity={0.6}>
      <Morph
        shadows={{ topShadow: 'transparent', bottomShadow: 'transparent' }}
        border={border}
        background={buttonBackground.darken(0.2)}
        style={{
          width: size,
          height: size,
          borderRadius: 50,
        }}
      >
        <Feather name="check" size={15} color={background.lighten(0.5).hex()} />
      </Morph>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({});

export default Check;
