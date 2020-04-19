import React, { useContext } from 'react';
import {
  StyleSheet,
  View,
  SafeAreaView,
  Dimensions,
  Platform,
} from 'react-native';

import { Context as ColorContext } from '../context/ColorContext';

import { sizes } from '../theme';

import Time from '../components/game/Time';
import { Block } from '../components/common';
import Field from '../components/game/Field';
import Back from '../components/icons/Back';
import Level from '../components/icons/Level';

const { width, height } = Dimensions.get('window');

const GameScreen = ({ navigation: { getParam, addListener } }) => {
  const mode = getParam('mode');

  const {
    state: {
      colors: { background },
    },
  } = useContext(ColorContext);

  return (
    <SafeAreaView
      style={{
        ...styles.droidSafeArea,
        backgroundColor: background,
      }}
    >
      <Block style={styles.tiles} padding={[10, 0]}>
        <Block style={styles.navbar}>
          <Back />
          <Time />
          <Level />
        </Block>
      </Block>
      <View style={styles.fields}>
        <Field mode={mode} />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  droidSafeArea: {
    flex: 1,
    paddingTop: Platform.OS === 'android' ? (height > 667 ? 35 : 25) : 0,
  },
  navbar: {
    flex: 1,
    flexDirection: 'row',
    width,
    paddingHorizontal: 20,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  tiles: {
    flex: 1,
    alignItems: 'center',
  },
  fields: {
    flex: 7,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default GameScreen;
