import React, { useState, useEffect, useContext } from 'react';
import { View, StyleSheet, AsyncStorage, Platform } from 'react-native';

import { Context as ColorContext } from '../context/ColorContext';
import { Context as TimeContext } from '../context/TimeContext';
import { Context as AdsContext } from '../context/AdsContext';

import { sizes } from '../theme';

import zeit from '../api/zeit';

import GameOverMenu from '../components/game/GameOverMenu';
import { Block, Text, Loading } from '../components/common';

import { BarIndicator } from 'react-native-indicators';

import {
  InterstitialAd,
  AdEventType,
  TestIds,
} from '@react-native-firebase/admob';

const adUnitId = __DEV__
  ? TestIds.INTERSTITIAL
  : Platform.OS === 'android'
  ? 'ca-app-pub-7883363543420979/7471281121'
  : 'ca-app-pub-7883363543420979/1402279373';

const interstitial = InterstitialAd.createForAdRequest(adUnitId, {
  requestNonPersonalizedAdsOnly: true,
  keywords: ['fashion', 'clothing'],
});

const GameOverScreen = ({
  navigation: { navigate, addListener, getParam },
}) => {
  const {
    state: {
      colors: { background, heading },
      level,
    },
  } = useContext(ColorContext);
  const { resetTime } = useContext(TimeContext);
  const {
    state: { showAds },
  } = useContext(AdsContext);

  const [highscore, setHighScore] = useState(null);
  const [adLoading, setAdLoading] = useState(false);

  useEffect(() => {
    // ADMOB
    let eventListener;
    // ADMOB

    const didFocus = addListener('didFocus', async () => {
      resetTime();
      let games = parseInt(await AsyncStorage.getItem('games'));
      setAdLoading(true);
      if (games < 5) {
        setAdLoading(false);
        await AsyncStorage.setItem('games', (games + 1).toString());
      } else {
        if (showAds) {
          eventListener = interstitial.onAdEvent((type) => {
            if (type === AdEventType.LOADED) {
              setAdLoading(false);
              interstitial.show();
            }
            if (type === AdEventType.ERROR) {
              setAdLoading(false);
            }

            if (type === AdEventType.LEFT_APPLICATION) {
              setAdLoading(false);
            }
          });
          // Start loading the interstitial straight away
          interstitial.load();
          await AsyncStorage.setItem('games', '0');
        } else {
          setAdLoading(false);
          await AsyncStorage.setItem('games', (games + 1).toString());
        }
      }

      let nickname = await AsyncStorage.getItem('nickname');
      if (!nickname) {
        nickname = 'Anonymous';
      }

      const mode = getParam('mode');
      const highscore = await AsyncStorage.getItem(`${mode}highscore`);
      if (highscore) {
        if (level >= highscore) {
          setHighScore(level);
          await AsyncStorage.setItem(`${mode}highscore`, level.toString());
        } else {
          setHighScore(highscore);
        }
      } else {
        setHighScore('0');
        await AsyncStorage.setItem(`${mode}highscore`, level.toString());
      }

      zeit
        .post('/scores', {
          nickname,
          score: level,
          mode,
        })
        .catch((e) => {});
    });
    return () => {
      didFocus.remove();
    };
  }, []);

  return (
    <Block style={{ backgroundColor: background }}>
      {adLoading ? (
        <Loading />
      ) : (
        <>
          <Block center bottom flex={0.4}>
            <Text h1 center bold color={heading}>
              Game Over
            </Text>
            <Text h3 color={heading} style={{ marginTop: sizes.padding / 2 }}>
              Score: {level}
            </Text>
            <View
              style={{
                justifyContent: 'center',
                flexDirection: 'row',
                alignItems: 'center',
              }}
            >
              <Text h3 color={heading} style={{ marginTop: sizes.padding / 2 }}>
                Your highscore:
              </Text>
              <Text
                h3
                color={heading}
                style={{ marginTop: sizes.padding / 2, position: 'relative' }}
              >
                {highscore ? (
                  highscore
                ) : Platform.OS === 'android' ? (
                  <View
                    style={{
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}
                    height={1}
                    width={1}
                  >
                    <BarIndicator
                      style={{
                        position: 'absolute',
                        left: 2,
                      }}
                      size={10}
                      color={heading.hex()}
                      count={3}
                    />
                  </View>
                ) : (
                  <View
                    style={{
                      position: 'absolute',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}
                  >
                    <BarIndicator
                      style={{
                        position: 'absolute',
                        left: 2,
                      }}
                      size={10}
                      color={heading.hex()}
                      count={3}
                    />
                  </View>
                )}
              </Text>
            </View>
          </Block>
          <Block middle flex={0.6} margin={[0, sizes.padding * 2]}>
            <GameOverMenu />
          </Block>
        </>
      )}
    </Block>
  );
};

GameOverScreen.defaultProps = {};

GameOverScreen.navigationOptions = {
  header: null,
};

const styles = StyleSheet.create({});

export default GameOverScreen;
