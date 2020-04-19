import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
const screen = Dimensions.get('window');

const Morph = ({
  children,
  width,
  height,
  style,
  background,
  border,
  shadows,
}) => {
  const styles = StyleSheet.create({
    inner: {
      backgroundColor: background,
      alignItems: 'center',
      justifyContent: 'center',
      // borderColor: '#e2ecfd',
      borderColor: border,
      borderWidth: 1,
      elevation: 3,
    },
    topShadow: {
      shadowOffset: {
        width: -1,
        height: -1,
      },
      shadowOpacity: 0.7,
      shadowRadius: 3,
      // shadowColor: '#FBFFFF',
      shadowColor: shadows.topShadow,
      elevation: 3,
    },
    bottomShadow: {
      shadowOffset: {
        width: 3,
        height: 3,
      },
      shadowOpacity: 0.7,
      shadowRadius: 3,
      // shadowColor: '#b7c4dd',
      shadowColor: shadows.bottomShadow,
      elevation: 3,
    },
  });
  return (
    <View style={styles.topShadow}>
      <View style={styles.bottomShadow}>
        <View
          style={[
            styles.inner,
            {
              width,
              height,
              borderRadius: screen.height > 667 ? 40 / 2.5 : 40 / 3,
            },
            style,
          ]}
        >
          {children}
        </View>
      </View>
    </View>
  );
};

export default Morph;
