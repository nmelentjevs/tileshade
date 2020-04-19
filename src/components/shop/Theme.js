import React, { useState, useEffect, useContext } from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Dimensions,
  AsyncStorage,
  Platform,
} from 'react-native';
import { Morph, Text } from '../common';
import Check from '../icons/Check';
import Lock from '../icons/Lock';
import { Context as ThemeContext } from '../../context/ThemeContext';

const { width, height } = Dimensions.get('window');

// const themes = {
//   woodoo: ['#698F3F', '#804E49', '#60A561', '#4A7C59', '#789FCC', '#CAA87D'],
//   shadow: ['#698F3F', '#804E49', '#60A561', '#4A7C59', '#789FCC', '#CAA87D'],
//   arctic: ['#698F3F', '#804E49', '#60A561', '#4A7C59', '#789FCC', '#CAA87D'],
//   stylish: ['#B56470', '#CCAADD', '#D1D1D4', '#976ED7', '#579ABE', '#03C03C'],
//   mystery: ['#F39A27', '#8C00FC', '#8EC6C5', '#6983AA', '#F4B9B2', '#DE6B48'],
//   premium: ['#DB995A', '#E1CA96', '#ACA885', '#918B76', '#434A42', '#4A7C59'],
// };

const themes = {
  stylish: ['#75ABBC', '#CCAADD', '#D1D1D4', '#976ED7', '#8C00FC', '#DAD2BC'],
  mystery: ['#A99985', '#EDAF97', '#C49792', '#A755C2', '#F4B9B2', '#DE6B48'],
  neon: ['#F39A27', '#994636', '#03C03C', '#F25F5C', '#59C9A5', '#6622CC'],
  leaf: ['#4A7C59', '#436436', '#60A561', '#698F3F', '#ACA885', '#99C2A2'],
  premium: ['#FE938C', '#DB995A', '#E1CA96', '#ACA885', '#CCA43B', '#434A42'],
  woodoo: ['#70C1B3', '#B9E3C6', '#B07C9E', '#D2A1B8', '#B59194', '#AD91A3'],
  orchide: ['#DB504A', '#B56470', '#8B575C', '#C98986', '#F4B9B2', '#F6BDD1'],
  shadow: ['#F46036', '#FFDFD3', '#CAA87D', '#804E49', '#FAD1AF', '#AFC9CF'],
  arctic: ['#23B5D3', '#579ABE', '#8EC6C5', '#6983AA', '#789FCC', '#56A3A6'],
};

const Theme = ({
  theme: { name, active, purchased },
  colors: {
    buttonTopShadow,
    buttonBackground,
    buttonBorder,
    buttonBottomShadow,
    heading,
  },
  setLoading,
  requestPurchase,
}) => {
  const [isActive, setActive] = useState(null);
  const [isPurchased, setPurchased] = useState(null);

  const {
    state: { names },
    activateTheme,
    disableTheme,
  } = useContext(ThemeContext);

  useEffect(() => {
    setActive(active);
    setPurchased(purchased);
  }, [names]);

  const handlePurchase = async () => {
    if (isPurchased && !isActive) {
      console.log('Turning on');
      await AsyncStorage.setItem(name, 'active');
      setActive(true);
      activateTheme(name);
    } else {
      if (isActive) {
        console.log('Turning off');
        await AsyncStorage.setItem(name, 'purchased');
        setPurchased(true);
        setActive(false);
        disableTheme(name);
      } else {
        setLoading(true);
        // IF PAYMENT SUCCESS
        console.log('Purchasing');
        requestPurchase(`${name}_theme_colours`);
        // // MOCK
        // // MOCK
        // await AsyncStorage.setItem(name, 'active');
        // setTimeout(() => {
        //   activateTheme(name);
        //   setLoading(false);
        // }, 500);
        // // MOCK
        // // MOCK
      }
    }
  };

  return (
    <TouchableOpacity
      activeOpacity={Platform.OS === 'ios' ? 0.7 : 0.95}
      onPress={() => handlePurchase()}
    >
      <Morph
        shadows={{
          topShadow: buttonTopShadow,
          bottomShadow: buttonBottomShadow,
        }}
        border={buttonBorder}
        background={buttonBackground}
        style={{
          // paddingHorizontal: 15,
          paddingVertical: 5,
          margin: 7.5,
          width: width > 414 ? width / 2.5 : width / 2.75,
          position: 'relative',
          marginTop: 10,
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        {isActive ? (
          <View style={{ position: 'absolute', top: -7.5, right: -7.5 }}>
            <Check />
          </View>
        ) : !isPurchased ? (
          <View style={{ position: 'absolute', top: -7.5, right: -7.5 }}>
            <Lock />
          </View>
        ) : null}
        <Text
          h5
          bold
          color={heading.darken(0.25)}
          style={{
            marginBottom: 10,
            textTransform: 'uppercase',
            fontSize: 13,
          }}
        >
          {name}
        </Text>
        <FlatList
          contentContainerStyle={{
            justifyContent: 'center',
            alignItems: 'center',
            alignSelf: 'center',
            justifySelf: 'center',
            paddingBottom: 2.5,
          }}
          numColumns={3}
          data={themes[name]}
          renderItem={({ item }) => (
            <View
              style={{
                backgroundColor: item,
                width: 30,
                height: 30,
                borderRadius: 3,
                marginHorizontal: 2.5,
                marginBottom: 5,
              }}
            />
          )}
          keyExtractor={(item, i) => i.toString()}
          listKey={(item, i) => i.toString()}
        />
      </Morph>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({});

export default Theme;
