import React, { useState, useEffect, useContext } from 'react';
import { StyleSheet, View, FlatList } from 'react-native';
import { Text } from '../common';
import Colored from '../../hooks/withColor';
import Theme from './Theme';
import { Context as ThemeContext } from '../../context/ThemeContext';

const ColorTheme = ({ colors: { heading }, requestPurchase, setLoading }) => {
  const {
    state: { names, theme },
  } = useContext(ThemeContext);

  useEffect(() => {
    console.log('Theme changed');
  }, [names, theme]);

  const renderColorTheme = (theme) => {
    return (
      <Colored>
        <Theme
          theme={theme}
          requestPurchase={requestPurchase}
          setLoading={setLoading}
        />
      </Colored>
    );
  };

  return (
    <View>
      <Text
        h3
        left
        bold
        color={heading}
        style={{ marginLeft: 25, marginBottom: 10 }}
      >
        Add Themes
      </Text>
      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        data={names}
        renderItem={({ item }) => renderColorTheme(item)}
        keyExtractor={(item) => item.name}
        style={{ paddingLeft: 15 }}
        contentContainerStyle={{ paddingRight: 20 }}
      />
    </View>
  );
};

const styles = StyleSheet.create({});

export default ColorTheme;
