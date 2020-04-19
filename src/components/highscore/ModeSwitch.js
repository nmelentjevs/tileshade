import React, { useContext } from 'react';
import { StyleSheet, Animated, Dimensions } from 'react-native';
import { JellyFish, Cat, Eagle } from '../icons';
import { TrippleToggle, Block } from '../common';
import { Context as ColorContext } from '../../context/ColorContext';

const AnimatedJelly = Animated.createAnimatedComponent(JellyFish);
const AnimatedCat = Animated.createAnimatedComponent(Cat);
const AnimatedEagle = Animated.createAnimatedComponent(Eagle);

const ModeSwitch = ({ setMode }) => {
  const {
    state: {
      colors: { buttonBottomShadow, buttonBackground, buttonText },
    },
  } = useContext(ColorContext);

  return (
    <Block center bottom flex={0.075}>
      <TrippleToggle
        onLeftState={() => {
          setMode('easy');
        }}
        onMiddleState={() => {
          setMode('medium');
        }}
        onRightState={() => {
          setMode('hard');
        }}
        AnimatedJelly={AnimatedJelly}
        AnimatedCat={AnimatedCat}
        AnimatedEagle={AnimatedEagle}
        middleStateIconName={'instagram'}
        floatingPointerStyle={{
          ...styles.floatingPointerStyle,
          backgroundColor: buttonBackground,
          shadowColor: buttonBottomShadow,
        }}
        primaryColor={buttonText.hex()}
        secondaryColor={buttonText.hex()}
        itemContainer={{
          ...styles.itemContainer,
          shadowColor: buttonBottomShadow.hex(),
        }}
        itemsContainer={{
          flexDirection: 'row',
          paddingTop: 15,
          paddingBottom: 15,
          width: 185,
        }}
      />
    </Block>
  );
};

const styles = StyleSheet.create({
  floatingPointerStyle: {
    position: 'absolute',
    height: 55,
    width: 55,
    borderRadius: 40,
    elevation: 7,
    marginLeft: 2,
    marginRight: 0,
    marginTop: 17,
    shadowOffset: {
      width: -1,
      height: -1,
    },
    shadowOpacity: 0.7,
    shadowRadius: 3,
    // shadowColor: '#FBFFFF',
    elevation: 5,
  },
  itemContainer: {
    backgroundColor: 'transparent',
    height: 60,
    width: 60,
    alignItems: 'center',
    justifyContent: 'center',
    shadowOffset: {
      width: 3,
      height: 3,
    },
    shadowOpacity: 0.7,
    shadowRadius: 3,
    elevation: 5,
  },
});

export default ModeSwitch;
