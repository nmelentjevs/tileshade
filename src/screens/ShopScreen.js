import React, { useState, useEffect, useContext } from 'react';
import {
  Dimensions,
  StyleSheet,
  SafeAreaView,
  Platform,
  Alert,
  AsyncStorage,
} from 'react-native';

import { Context as ColorContext } from '../context/ColorContext';
import { Context as ThemeContext } from '../context/ThemeContext';
import { Context as AdsContext } from '../context/AdsContext';

import Back from '../components/icons/Back';
import Transparent from '../components/icons/Transparent';
import ColorTheme from '../components/shop/ColorThemes';

import { Block, Text, Loading } from '../components/common';

import Colored from '../hooks/withColor';

const { width, height } = Dimensions.get('window');

import RNIap, {
  purchaseErrorListener,
  purchaseUpdatedListener,
  finishTransactionIOS,
  finishTransaction,
} from 'react-native-iap';

import Restore from '../components/shop/Restore';
import Addons from '../components/shop/Addons';

const items = Platform.select({
  ios: [
    'premium_theme_colours',
    'shadow_theme_colours',
    'woodoo_theme_colours',
    'stylish_theme_colours',
    'arctic_theme_colours',
    'mystery_theme_colours',
    'orchide_theme_colours',
    'leaf_theme_colours',
    'neon_theme_colours',
    'support_cookie',
    'support_coffee',
    'support_diamond',
    'remove_ads',
  ],
  android: [
    'premium_theme_colours',
    'shadow_theme_colours',
    'woodoo_theme_colours',
    'stylish_theme_colours',
    'arctic_theme_colours',
    'mystery_theme_colours',
    'orchide_theme_colours',
    'leaf_theme_colours',
    'neon_theme_colours',
    'support_cookie',
    'support_coffee',
    'support_diamond',
    'remove_ads',
  ],
});

const ShopScreen = ({ navigation: { addListener } }) => {
  const {
    state: {
      colors: { background, heading },
    },
  } = useContext(ColorContext);

  const [loading, setLoading] = useState(false);

  const {
    state: { names },
    activateTheme,
  } = useContext(ThemeContext);
  const {
    state: { showAds },
    turnOffAds,
  } = useContext(AdsContext);

  useEffect(() => {
    console.log('LOADING', loading);
    const didFocus = addListener('didFocus', () => {
      // APPLE PURCHASED SHOULD GO HERE
    });

    // SET IAP LISTENERS
    purchaseUpdateSubscription = purchaseUpdatedListener(async (purchase) => {
      const receipt = purchase.transactionReceipt;
      if (receipt) {
        try {
          if (Platform.OS === 'ios') {
            setLoading(false);
            // Handle themes purchase
            if (purchase.productId.includes('colours')) {
              let theme = purchase.productId.split('_')[0];
              await AsyncStorage.setItem(theme, 'active');
              console.log(2);
              activateTheme(theme);
            }
            // Handle turn off ads purchase
            if (purchase.productId.includes('ads')) {
              await AsyncStorage.setItem('ads', 'hide');
              console.log(3);
              turnOffAds();
            }

            // Finish transaction
            finishTransactionIOS(purchase.transactionId);
          } else if (Platform.OS === 'android') {
            setLoading(false);
            // If consumable (can be purchased again)
            consumePurchaseAndroid(purchase.purchaseToken);
            // If not consumable
            acknowledgePurchaseAndroid(purchase.purchaseToken);
          }
          finishTransaction(purchase);
        } catch (ackErr) {
          setLoading(false);
          console.warn('ackErr', ackErr);
        }
      }
    });

    purchaseErrorSubscription = purchaseErrorListener((error) => {
      setLoading(false);
      console.log('purchaseErrorListener', error);
      Alert.alert(
        'Purchase Error',
        'There was an error processing your purchase'
      );
    });

    getItems = async () => {
      try {
        await RNIap.initConnection();
        const products = await RNIap.getProducts(items);
        console.log('Products', products.length);
      } catch (err) {
        console.warn(err.code, err.message);
      }
    };
    getItems();

    return () => {
      didFocus.remove();
    };
  }, []);

  const requestPurchase = async (sku) => {
    try {
      await RNIap.requestPurchase(sku);
    } catch (err) {
      console.warn(err.code, err.message);
    }
  };

  return (
    <SafeAreaView
      style={{
        ...styles.droidSafeArea,
        backgroundColor: background,
      }}
    >
      {loading ? <Loading transparent /> : null}

      <Block style={{ backgroundColor: background }}>
        <Block flex={0.15} padding={[10, 0]}>
          <Block style={styles.navbar}>
            <Back />
            <Text h1 center bold color={heading}>
              Shop
            </Text>
            <Transparent />
          </Block>
        </Block>
        {names.length ? (
          <>
            <Block flex={height > 667 ? 0.25 : 0.3}>
              <Colored>
                <ColorTheme
                  requestPurchase={requestPurchase}
                  setLoading={setLoading}
                />
              </Colored>
            </Block>

            <Block
              flex={height > 667 ? 0.45 : 0.4}
              margin={[0, 25]}
              style={{ marginTop: Platform.OS === 'android' ? 40 : 0 }}
            >
              <Colored>
                <Addons
                  requestPurchase={requestPurchase}
                  setLoading={setLoading}
                  turnOffAds={turnOffAds}
                  showAds={showAds}
                />
              </Colored>
            </Block>

            <Block flex={0.15} margin={[0, 25]}>
              <Restore setLoading={setLoading} />
            </Block>
          </>
        ) : (
          <Loading transparent />
        )}
      </Block>
    </SafeAreaView>
  );
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

export default ShopScreen;
