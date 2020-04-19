import React from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Platform,
} from 'react-native';
import { Morph, Text } from '../../common';
import { JellyFish, Cat, Eagle } from '../../icons';
import { navigate } from '../../../navigationRef';
const { width } = Dimensions.get('window');

const MenuButtons = ({
  colors: {
    buttonTopShadow,
    buttonBottomShadow,
    buttonBackground,
    buttonText,
    buttonBorder,
    icon,
  },
  startTime,
}) => {
  const handleStart = (diff) => {
    navigate('Game', { mode: diff });
    startTime();
  };

  return [
    {
      diff: 'easy',
      text: 'Jelly',
      icon: <JellyFish size={35} fill={icon.hex()} style={styles.jelly} />,
      // icon: <Text>Ok</Text>,
    },
    {
      diff: 'medium',
      text: 'Cat',
      icon: <Cat size={35} fill={icon.hex()} style={styles.cat} />,
      // icon: <Text>Ok</Text>,
    },
    {
      diff: 'hard',
      text: 'Eagle',
      icon: <Eagle size={35} fill={icon.hex()} style={styles.eagle} />,
      // icon: <Text>Ok</Text>,
    },
  ].map((el) => (
    <TouchableOpacity
      key={el.diff}
      activeOpacity={Platform.OS === 'ios' ? 0.6 : 0.95}
      onPress={() => handleStart(el.diff)}
    >
      <Morph
        shadows={{
          topShadow: buttonTopShadow,
          bottomShadow: buttonBottomShadow,
        }}
        background={buttonBackground}
        border={buttonBorder}
        height={50}
        style={styles.morph}
      >
        <View style={styles.view}>
          {el.icon}
          <Text center semibold color={buttonText} style={styles.text}>
            {el.text}
          </Text>
        </View>
      </Morph>
    </TouchableOpacity>
  ));
};

const styles = StyleSheet.create({
  jelly: {
    position: 'absolute',
    left: width < 1000 ? '-34.5%' : '-32%',
    top: '-20%',
  },
  cat: {
    position: 'absolute',
    right: '-40%',
    top: '-20%',
  },
  eagle: {
    position: 'absolute',
    left: '-33%',
    top: '-20%',
  },
  morph: { marginBottom: 15 },
  view: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  text: {
    letterSpacing: 5,
    fontFamily: 'overlock',
    fontFamily: 'baloo',
    textTransform: 'uppercase',
  },
});

export default MenuButtons;
