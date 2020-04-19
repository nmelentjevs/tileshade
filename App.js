import React, { useState, useEffect, useContext, useCallback } from 'react';
import { setNavigator } from './src/navigationRef';
import { Provider as ColorProvider } from './src/context/ColorContext';
import { Provider as TimeProvider } from './src/context/TimeContext';
import { Provider as SoundProvider } from './src/context/SoundContext';
import { Provider as ThemeProvider } from './src/context/ThemeContext';
import { Provider as AdsProvider } from './src/context/AdsContext';
import Navigation from './src/navigation';
// import { AppLoading } from 'expo';
import * as SplashScreen from 'expo-splash-screen';
import { Asset } from 'expo-asset';
import * as Font from 'expo-font';
import { View, StyleSheet } from 'react-native';

const images = [];

export default () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    SplashScreen.preventAutoHideAsync()
      .then((result) =>
        console.log(`SplashScreen.preventAutoHideAsync() succeeded: ${result}`)
      )
      .catch(console.warn);
    handleResourcesAsync();
  }, []);

  const handleResourcesAsync = async () => {
    // we're caching all the images
    // for better performance on the app
    await Font.loadAsync({
      monoton: require('./assets/fonts/Monoton-Regular.ttf'),
      overlock: require('./assets/fonts/OverlockSC-Regular.ttf'),
      poiret: require('./assets/fonts/PoiretOne-Regular.ttf'),
      comforta: require('./assets/fonts/Comfortaa-VariableFont_wght.ttf'),
      baloo: require('./assets/fonts/BalooThambi2-Regular.ttf'),
    });

    const cacheImages = images.map((image) => {
      return Asset.fromModule(image).downloadAsync();
    });

    Promise.all(cacheImages)
      .then(async () => {
        setLoading(false);
        await SplashScreen.hideAsync();
      })
      .catch(() => console.log(1));
  };

  if (loading) {
    return null;
  }

  return (
    <AdsProvider>
      <ThemeProvider>
        <SoundProvider>
          <ColorProvider>
            <TimeProvider>
              <Navigation
                ref={(navigator) => {
                  setNavigator(navigator);
                }}
              />
            </TimeProvider>
          </ColorProvider>
        </SoundProvider>
      </ThemeProvider>
    </AdsProvider>
  );
};
