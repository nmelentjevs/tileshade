import React, { useContext } from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import Block from './Block';
import { BarIndicator } from 'react-native-indicators';
import { Context as ColorContext } from '../../context/ColorContext';
const { width, height } = Dimensions.get('window');

const Loading = ({ transparent }) => {
  const {
    state: {
      colors: { background, heading },
    },
  } = useContext(ColorContext);
  return (
    <Block
      center
      middle
      style={{
        justifyContext: 'center',
        alignItems: 'center',
        top: 0,
        left: 0,
        position: 'absolute',
        width,
        height,
        backgroundColor: background,
        zIndex: 100,
        opacity: transparent ? 0.75 : 1,
      }}
    >
      <BarIndicator
        size={30}
        color={heading.darken(0.5).hex()}
        count={5}
        style={{ opacity: 1 }}
      />
    </Block>
  );
};

const styles = StyleSheet.create({});

export default Loading;
