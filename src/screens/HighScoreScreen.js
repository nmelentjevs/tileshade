import React, { useState, useEffect, useContext } from 'react';
import { StyleSheet, Dimensions, SafeAreaView, Platform } from 'react-native';

import { Context as ColorContext } from '../context/ColorContext';

import { sizes } from '../theme';

import zeit from '../api/zeit';

import Back from '../components/icons/Back';
import Highscores from '../components/highscore/Highscores';
import ModeSwitch from '../components/highscore/ModeSwitch';
import Transparent from '../components/icons/Transparent';

import { Block, Text, Loading } from '../components/common';

const { width, height } = Dimensions.get('window');

const HighScoreScreen = ({ navigation: { navigate } }) => {
  const {
    state: {
      colors: { background, buttonText, heading },
    },
  } = useContext(ColorContext);

  const [mode, setMode] = useState('easy');
  const [scores, setScores] = useState(null);

  useEffect(() => {
    zeit
      .get('/scores?sort=!score&select=score,mode,nickname&limit=1000000')
      .then((res) => {
        setScores(res.data.data);
      });
  }, []);

  return (
    <SafeAreaView
      style={{
        ...styles.droidSafeArea,
        backgroundColor: background,
      }}
    >
      <Block flex={0.15} padding={[10, 0]}>
        <Block style={styles.navbar}>
          <Back />
          <Text h1 center bold color={heading}>
            Best eyes
          </Text>
          <Transparent />
        </Block>
      </Block>
      <ModeSwitch setMode={setMode} />
      {!scores ? (
        <Loading transparent />
      ) : (
        <Block
          middle
          margin={[0, width > 1000 ? sizes.padding * 8 : sizes.padding * 2]}
          flex={0.75}
        >
          <Highscores scores={scores} mode={mode} />
        </Block>
      )}
    </SafeAreaView>
  );
};

HighScoreScreen.navigationOptions = {
  transition: 'fade',
};

const styles = StyleSheet.create({
  droidSafeArea: {
    flex: 1,
    paddingTop: Platform.OS === 'android' ? (height > 667 ? 50 : 25) : 0,
  },
  navbar: {
    flex: 1,
    flexDirection: 'row',
    width,
    paddingHorizontal: 20,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});

export default HighScoreScreen;
