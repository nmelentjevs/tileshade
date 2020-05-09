import React, { useEffect } from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  AsyncStorage,
  Platform,
} from 'react-native';
import { Text, Morph } from '../common';
import Check from '../icons/Check';
import Lock from '../icons/Lock';
import { FlatList } from 'react-native-gesture-handler';
import { MaterialCommunityIcons, FontAwesome } from '@expo/vector-icons';

const Addons = ({
  colors: {
    background,
    heading,
    topShadow,
    bottomShadow,
    border,
    buttonTopShadow,
    buttonBackground,
    buttonBorder,
    buttonBottomShadow,
    buttonText,
  },
  requestPurchase,
  setLoading,
  turnOffAds,
  showAds,
}) => {
  useEffect(() => {
    console.log(showAds);
  }, [showAds]);

  const handleNoAdsPurchase = async () => {
    if (showAds) {
      setLoading(true);
      console.log('Remove Ads');
      requestPurchase('remove_ads');
    }
  };

  const handleSupport = async (item) => {
    setLoading(true);
    console.log(`Support with ${item}`);
    requestPurchase(item);
  };

  const renderSupportItem = (item) => {
    return (
      <TouchableOpacity
        activeOpacity={Platform.OS === 'ios' ? 0.6 : 0.95}
        onPress={() => handleSupport(item.name)}
      >
        <Morph
          shadows={{
            topShadow: buttonTopShadow,
            bottomShadow: buttonBottomShadow,
          }}
          border={border}
          background={buttonBackground}
          style={{
            width: 50,
            height: 50,
            borderRadius: 15,
            margin: 5,
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          {item.icon}
        </Morph>
      </TouchableOpacity>
    );
  };

  const supportItems = [
    {
      icon: (
        <MaterialCommunityIcons
          name="cookie"
          size={25}
          color={background.lighten(0.5).hex()}
        />
      ),
      name: 'support_cookie',
    },
    {
      icon: (
        <FontAwesome
          name="coffee"
          size={23}
          color={background.lighten(0.5).hex()}
        />
      ),
      name: 'support_coffee',
    },
    {
      icon: (
        <FontAwesome
          name="diamond"
          size={20}
          color={background.lighten(0.5).hex()}
        />
      ),
      name: 'support_diamond',
    },
  ];

  return (
    <View>
      <Text h3 left bold color={heading} style={{ marginBottom: 10 }}>
        Improve experience
      </Text>
      <TouchableOpacity
        activeOpacity={Platform.OS === 'ios' ? 0.6 : 0.95}
        onPress={() => handleNoAdsPurchase()}
        style={{
          width: 125,
          height: 40,
          marginBottom: 30,
        }}
      >
        <Morph
          shadows={{
            topShadow: buttonTopShadow,
            bottomShadow: buttonBottomShadow,
          }}
          border={buttonBorder}
          background={buttonBackground}
          style={{
            width: 125,
            height: 40,
          }}
        >
          {!showAds ? (
            <View style={{ position: 'absolute', top: -7.5, right: -10 }}>
              <Check size={23} />
            </View>
          ) : (
            <View style={{ position: 'absolute', top: -7.5, right: -10 }}>
              <Lock size={23} />
            </View>
          )}
          <Text h5 bold color={buttonText} style={styles.text}>
            Remove ads
          </Text>
        </Morph>
      </TouchableOpacity>
      <Text h3 left bold color={heading} style={{ marginBottom: 10 }}>
        Support developer
      </Text>
      <FlatList
        horizontal
        data={supportItems}
        renderItem={({ item }) => renderSupportItem(item)}
        keyExtractor={(item) => item.name}
        contentContainerStyle={{ marginLeft: -5 }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  text: {
    letterSpacing: 2,
    fontFamily: 'overlock',
    fontFamily: 'baloo',
    textTransform: 'uppercase',
  },
});

export default Addons;
