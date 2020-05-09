import React, { useState, useEffect, useContext, useRef } from 'react';
import {
  StyleSheet,
  AsyncStorage,
  Dimensions,
  Alert,
  ActivityIndicator,
} from 'react-native';

import { sizes } from '../theme';

import { Context as ColorContext } from '../context/ColorContext';
import { Context as TimeContext } from '../context/TimeContext';
import { Context as ThemeContext } from '../context/ThemeContext';
import { Context as AdsContext } from '../context/AdsContext';

import MenuButtons from '../components/welcome/buttons/MenuButtons';
import BottomButtons from '../components/welcome/buttons/BottomButtons';
import NicknameInput from '../components/welcome/NicknameInput';

import { Block, Text } from '../components/common';

import Colored from '../hooks/withColor';

const { width } = Dimensions.get('window');

import RNIap from 'react-native-iap';

import admob, {
  MaxAdContentRating,
  TestIds,
  BannerAd,
} from '@react-native-firebase/admob';
import FirstTime from '../components/welcome/FirstTime';

const adUnitId = __DEV__
  ? TestIds.BANNER
  : Platform.OS === 'android'
  ? 'ca-app-pub-7883363543420979/3365349301'
  : 'ca-app-pub-7883363543420979/4343905979';

const WelcomeScreen = ({ navigation: { addListener } }) => {
  const {
    state: {
      colors: { background, heading },
    },
    resetLevel,
  } = useContext(ColorContext);

  const { resetTime, startTime } = useContext(TimeContext);
  const { setTheme } = useContext(ThemeContext);
  const {
    state: { showAds },
    turnOffAds,
  } = useContext(AdsContext);
  console.log('SHOW ADS', showAds);

  useEffect(() => {
    const firstTime = async () => {
      const first = await AsyncStorage.getItem('first');
      if (!first) {
      }
    };

    firstTime();

    const didFocus = addListener('didFocus', () => {
      // GAME
      resetTime();
      resetLevel();
    });

    // ADMOB
    admob()
      .setRequestConfiguration({
        // Update all future requests suitable for parental guidance
        maxAdContentRating: MaxAdContentRating.PG,

        // Indicates that you want your content treated as child-directed for purposes of COPPA.
        tagForChildDirectedTreatment: true,

        // Indicates that you want the ad request to be handled in a
        // manner suitable for users under the age of consent.
        tagForUnderAgeOfConsent: true,
      })
      .then(() => {
        console.log('Ad Mod Connected');
        // Request config successfully set!
      })
      .catch(() => console.log('Ad Mod Failed'));

    // GET PAST IAP, SET THEMES
    const getPurchases = async () => {
      const result = await RNIap.initConnection();
      console.log('In-app purchases connected ::', result);
      const themes = (await RNIap.getPurchaseHistory()).map((item) => {
        return item.productId.split('_')[0];
      });

      return {
        adBlock: themes.includes('remove')
          ? 'hide'
          : await AsyncStorage.getItem('ads'),
        themes: await Promise.all(
          [
            'orchide',
            'leaf',
            'arctic',
            'premium',
            'neon',
            'stylish',
            'mystery',
            'shadow',
            'woodoo',
          ].map(async (x, i) =>
            themes.includes(x)
              ? AsyncStorage.getItem(x) === null
                ? AsyncStorage.setItem(x, 'purchased') && 'purchased'
                : AsyncStorage.setItem(x, 'active') && 'active'
              : false
          )
        ),
      };
    };

    // GET PURCHASES
    getPurchases()
      .then((purchases) => {
        // console.log('Purchases', purchases);
        // TURN OFF ADS IF AD BLOCK
        if (purchases.adBlock === 'hide') {
          turnOffAds();
        }
        // CHANGE THEMES
        setTheme(purchases.themes);
      })
      .catch(console.log);

    return () => {
      didFocus.remove();
    };
  }, []);

  return (
    <Block style={{ backgroundColor: background, position: 'relative' }}>
      <Block center bottom flex={0.3}>
        <Text h1 center bold color={heading}>
          Tileshade
        </Text>

        <Text h3 color={heading} style={{ marginTop: sizes.padding / 2 }}>
          See colors. Play colors.
        </Text>
      </Block>
      <Block
        middle
        flex={0.7}
        margin={[0, width > 1000 ? sizes.padding * 8 : sizes.padding * 2]}
      >
        <Colored>
          <NicknameInput />
        </Colored>
        <Colored>
          <MenuButtons startTime={startTime} />
        </Colored>
        <Colored>
          <BottomButtons />
        </Colored>
      </Block>
      {/* <Colored>
        <FirstTime welcomeShow={welcomeShow} setWelcomeShow={setWelcomeShow} />
      </Colored> */}
      {showAds ? <BannerAd unitId={adUnitId} size="SMART_BANNER" /> : null}
    </Block>
  );
};

WelcomeScreen.defaultProps = {};

WelcomeScreen.navigationOptions = {
  header: null,
};

const styles = StyleSheet.create({});

export default WelcomeScreen;
