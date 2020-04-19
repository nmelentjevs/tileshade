import React, { useContext } from 'react';
import {
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Linking,
  Platform,
} from 'react-native';
import { Block, Morph } from '../../common';
import { Ionicons, AntDesign, MaterialIcons } from '@expo/vector-icons';
import { navigate } from '../../../navigationRef';
import { Context as SoundContext } from '../../../context/SoundContext';
const { width } = Dimensions.get('window');

const BottomButtons = ({
  colors: {
    buttonTopShadow,
    buttonBottomShadow,
    buttonBackground,
    buttonBorder,
    icon,
  },
}) => {
  const {
    state: { sound },
    toggleSound,
  } = useContext(SoundContext);
  return (
    <Block flex={0.1} center middle row padding={[10, 10]} margin={[20, 0]}>
      {[
        {
          icon: (
            <Ionicons
              name="ios-podium"
              size={width < 1000 ? 20 : 25}
              color={icon.hex()}
            />
          ),
          press: () => navigate('HighScores'),
        },
        {
          icon: (
            <MaterialIcons
              name="local-grocery-store"
              size={width < 1000 ? 20 : 25}
              color={icon.hex()}
            />
          ),
          press: () => navigate('Shop'),
        },
        {
          icon: (
            <AntDesign
              name="star"
              size={width < 1000 ? 20 : 25}
              color={icon.hex()}
            />
          ),
          press: () => Linking.openURL('https://apps.apple.com/app/1507448277'),
        },
        {
          icon: sound ? (
            <Ionicons
              name="md-volume-high"
              size={width < 1000 ? 20 : 25}
              color={icon.hex()}
            />
          ) : (
            <Ionicons
              name="md-volume-off"
              size={width < 1000 ? 20 : 25}
              color={icon.hex()}
            />
          ),
          press: toggleSound,
        },
      ].map((el, index) => (
        <TouchableOpacity
          key={index}
          activeOpacity={Platform.OS === 'ios' ? 0.6 : 0.95}
          onPress={el.press}
        >
          <Morph
            shadows={{
              topShadow: buttonTopShadow,
              bottomShadow: buttonBottomShadow,
            }}
            background={buttonBackground}
            border={buttonBorder}
            height={width < 1000 ? 50 : 65}
            width={width < 1000 ? 50 : 65}
            style={styles.morph}
          >
            {el.icon}
          </Morph>
        </TouchableOpacity>
      ))}
    </Block>
  );
};

const styles = StyleSheet.create({
  morph: { margin: 5, marginRight: 10 },
});

export default BottomButtons;
