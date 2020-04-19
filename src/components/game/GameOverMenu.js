import React, { useContext } from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Platform,
} from 'react-native';
import { Morph } from '../common';
import { Context as ColorContext } from '../../context/ColorContext';
import { Context as TimeContext } from '../../context/TimeContext';
import { navigate } from '../../navigationRef';

const GameOverMenu = () => {
  const {
    state: {
      colors: {
        buttonTopShadow,
        buttonBottomShadow,
        buttonBackground,
        buttonText,
        buttonBorder,
      },
    },
    resetLevel,
  } = useContext(ColorContext);
  const { startTime } = useContext(TimeContext);

  const restartGame = () => {
    navigate('Game');
    resetLevel();
    startTime();
  };

  const renderButtons = () => {
    return [
      { text: 'RE-SEE', press: restartGame },
      { text: 'MENU', press: () => navigate('Welcome') },
    ].map((el, index) => (
      <TouchableOpacity
        key={index}
        onPress={el.press}
        activeOpacity={Platform.OS === 'ios' ? 0.6 : 0.95}
      >
        <Morph
          shadows={{
            topShadow: buttonTopShadow,
            bottomShadow: buttonBottomShadow,
          }}
          background={buttonBackground}
          border={buttonBorder}
          height={50}
          style={{
            margin: 5,
            marginRight: 10,
          }}
        >
          <Text
            style={{
              ...styles.textStyle,
              color: buttonText,
            }}
          >
            {el.text}
          </Text>
        </Morph>
      </TouchableOpacity>
    ));
  };

  return <View style={styles.centeredView}>{renderButtons()}</View>;
};

const styles = StyleSheet.create({
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
    letterSpacing: 5,
    fontFamily: 'overlock',
    textTransform: 'uppercase',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});

export default GameOverMenu;
