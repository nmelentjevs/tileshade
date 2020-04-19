import React, { useContext } from 'react';
import {
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Platform,
} from 'react-native';
import { Morph } from '../common';
import { Context as ColorContext } from '../../context/ColorContext';
import { Context as TimeContext } from '../../context/TimeContext';
import { Ionicons } from '@expo/vector-icons';
import { navigate } from '../../navigationRef';
const { width } = Dimensions.get('window');

const Back = () => {
  const {
    state: {
      colors: { background, border, topShadow, bottomShadow },
    },
  } = useContext(ColorContext);
  const { stopTime } = useContext(TimeContext);

  const handleBack = () => {
    stopTime();
    navigate('Welcome', { shouldRefresh: true });
  };

  return (
    <TouchableOpacity
      activeOpacity={Platform.OS === 'ios' ? 0.6 : 0.95}
      onPress={handleBack}
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
        <Ionicons
          name="ios-arrow-back"
          size={20}
          color={background.lighten(0.7).hex()}
        />
      </Morph>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({});

export default Back;
