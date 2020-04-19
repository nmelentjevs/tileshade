import React, { useContext } from 'react';
import {
  View,
  TouchableOpacity,
  StyleSheet,
  Linking,
  AsyncStorage,
  Alert,
  Platform,
} from 'react-native';
import { Morph, Text } from '../common';
import { Context as ColorContext } from '../../context/ColorContext';
import { Context as ThemeContext } from '../../context/ThemeContext';
import { Context as AdsContext } from '../../context/AdsContext';
import RNIap from 'react-native-iap';

const Restore = ({ setLoading }) => {
  const {
    state: {
      colors: {
        heading,
        buttonTopShadow,
        buttonBottomShadow,
        buttonBackground,
        buttonBorder,
        buttonText,
      },
    },
  } = useContext(ColorContext);

  const { setTheme } = useContext(ThemeContext);
  const { turnOffAds } = useContext(AdsContext);

  const handleRestore = async () => {
    setLoading(true);
    const getPurchases = async () => {
      let themes = [];
      try {
        RNIap.getPurchaseHistory().then((history) => {
          themes = history.map((item) => {
            return item.productId.split('_')[0];
          });
        });
      } catch (err) {
        console.warn(err); // standardized err.code and err.message available
        Alert.alert(err.message);
      }

      return {
        adBlock: await AsyncStorage.getItem('ads'),
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
          ].map((x, i) =>
            themes.includes(x)
              ? AsyncStorage.getItem(x) === null
                ? AsyncStorage.setItem(x, 'purchased') && 'purchased'
                : AsyncStorage.setItem(x, 'active') && 'active'
              : false
          )
        ),
      };
    };
    // MOCK

    getPurchases()
      .then((history) => {
        setLoading(false);
        console.log('History', history);
        // TURN OFF ADS IF AD BLOCK
        if (history.adBlock === 'hide') {
          turnOffAds();
        }
        // CHANGE THEMES
        setTheme(history.themes);
      })
      .catch(console.log);
  };

  return (
    <>
      <Text h3 center bold color={heading} style={{ marginBottom: 10 }}>
        Restore purchases
      </Text>
      <TouchableOpacity
        activeOpacity={Platform.OS === 'ios' ? 0.6 : 0.95}
        onPress={() => handleRestore()}
        style={styles.view}
      >
        <Morph
          shadows={{
            topShadow: buttonTopShadow,
            bottomShadow: buttonBottomShadow,
          }}
          background={buttonBackground}
          border={buttonBorder}
          style={{
            width: 125,
            height: 40,
          }}
        >
          <Text center semibold color={buttonText} style={styles.text}>
            Restore
          </Text>
        </Morph>
      </TouchableOpacity>
    </>
  );
};

const styles = StyleSheet.create({
  view: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    letterSpacing: 2,
    fontFamily: 'overlock',
    fontFamily: 'baloo',
    textTransform: 'uppercase',
  },
});

export default Restore;
