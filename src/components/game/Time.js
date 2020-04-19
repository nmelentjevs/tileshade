import React, { useEffect, useContext, useCallback } from 'react';
import { Text, StyleSheet, Dimensions } from 'react-native';
import { Context as TimeContext } from '../../context/TimeContext';
import { Context as ColorContext } from '../../context/ColorContext';
import { Morph } from '../common';
import { navigate } from '../../navigationRef';
import useTime from '../../hooks/useTime';

const { width } = Dimensions.get('window');

const Time = ({ colors }) => {
  const {
    state: { time, moving },
    subtractTime,
    startTime,
    stopTime,
  } = useContext(TimeContext);

  const {
    state: {
      colors: { topShadow, bottomShadow, border, background },
    },
  } = useContext(ColorContext);

  useEffect(() => {
    startTime();
  }, []);

  const callback = useCallback(() => {
    if (time > 0) {
      subtractTime();
    } else {
      stopTime();
      navigate('GameOver');
    }
  }, [time, moving]);
  useTime(moving, callback);

  return (
    <Morph
      shadows={{
        topShadow,
        bottomShadow,
      }}
      border={border}
      background={background}
      style={{
        width: width < 1000 ? 60 : 100,
        height: width < 1000 ? 60 : 100,
        borderRadius: 50,
        backgroundColor: background,
      }}
    >
      <Text
        style={{
          color: background.lighten(0.9).hex(),
          fontSize: width < 1000 ? 22 : 30,
          fontFamily: 'poiret',
        }}
      >
        {' '}
        {time}{' '}
      </Text>
    </Morph>
  );
};

const styles = StyleSheet.create({});

export default Time;
