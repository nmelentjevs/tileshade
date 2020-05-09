import React, { useContext } from 'react';
import { StyleSheet, Dimensions, FlatList, Platform } from 'react-native';
import Square from './Square';
import { Context as ColorContext } from '../../context/ColorContext';
import { Context as SoundContext } from '../../context/SoundContext';
import { Context as ThemeContext } from '../../context/ThemeContext';
import shuffle from '../../utils/shuffle';

const screen = Dimensions.get('window');
console.log(screen.width, screen.height, Platform.OS);
const playHeight =
  screen.height > 667 ? screen.height * 0.7 : screen.height * 0.8;
const playWidth = screen.width <= 375 ? screen.width * 0.9 : screen.width;

const Field = ({ mode }) => {
  const {
    state: { colors, level },
    changeColor,
  } = useContext(ColorContext);

  const {
    state: { sound },
  } = useContext(SoundContext);

  const rows = mode === 'hard' ? 8 : mode === 'medium' ? 6 : 5;
  const columns = mode === 'hard' ? 5 : mode === 'medium' ? 4 : 3;
  const grid = shuffle([...new Array(rows * columns - 1).fill(0), true]);

  const renderSquare = ({ item, index }) => {
    return (
      <Square
        style={styles.item}
        key={index.toString()}
        isSpecial={item}
        width={
          screen.width < 1000
            ? screen.height < 750 && screen.width > 400
              ? (playWidth -
                  (Platform.OS === 'android'
                    ? mode === 'easy'
                      ? 110
                      : mode === 'medium'
                      ? 80
                      : 100
                    : 70) -
                  2 * 5 * columns) /
                columns
              : screen.height > 1000
              ? (playWidth -
                  (mode === 'easy' ? 300 : mode === 'medium' ? 250 : 275) -
                  2 * 5 * columns) /
                columns
              : (playWidth - 30 - 2 * 5 * columns) / columns
            : (playWidth -
                (mode === 'easy' ? 400 : mode === 'medium' ? 350 : 375) -
                2 * 5 * columns) /
              columns
        }
        mode={mode}
        level={level}
        changeColor={changeColor}
        sound={sound}
        {...colors}
      />
    );
  };

  return (
    <FlatList
      scrollEnabled={false}
      keyExtractor={(item, index) => index.toString()}
      renderItem={renderSquare}
      data={grid}
      numColumns={columns}
      contentContainerStyle={{
        marginTop: mode === 'medium' ? 30 : mode === 'hard' ? 20 : 10,
      }}
    />
  );
};

const styles = StyleSheet.create({});

export default Field;
