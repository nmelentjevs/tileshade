import React, { useContext } from 'react';
import { StyleSheet, Dimensions } from 'react-native';
import { Text, Morph } from '../common';
import { Context as ColorContext } from '../../context/ColorContext';
const { width, height } = Dimensions.get('window');

const Highscores = ({ scores, mode }) => {
  const {
    state: {
      colors: {
        background,
        buttonBottomShadow,
        buttonTopShadow,
        buttonBackground,
        buttonBorder,
        buttonText,
        icon,
      },
    },
  } = useContext(ColorContext);

  const renderScoreBox = (mode) => {
    let modeHighScores = scores
      .filter((score) => score.mode === mode)
      .sort((a, b) => b.score - a.score);

    return (
      <>
        {modeHighScores.slice(0, width > 900 ? 15 : 10).map((score, index) => (
          <Morph
            key={score._id}
            shadows={{
              topShadow: buttonTopShadow,
              bottomShadow: buttonBottomShadow,
            }}
            border={buttonBorder}
            background={buttonBackground}
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              height: height < 1000 ? (height > 690 ? 42.5 : 35) : 47.5,
              marginBottom: 10,
              paddingHorizontal: 20,
            }}
          >
            <Text
              style={{
                color: buttonText,
                fontSize: 16,
                letterSpacing: 2,
                fontFamily: 'baloo',
              }}
            >
              {index + 1}
            </Text>
            <Text
              style={{
                color: buttonText,
                fontSize: 16,
                letterSpacing: 2,
                fontFamily: 'baloo',
              }}
            >
              {score.nickname}
            </Text>
            <Text
              style={{
                color: buttonText,
                fontSize: 16,
                letterSpacing: 2,
                fontFamily: 'baloo',
              }}
            >
              {score.score}
            </Text>
          </Morph>
        ))}
      </>
    );
  };

  return <>{renderScoreBox(mode)}</>;
};

const styles = StyleSheet.create({});

export default Highscores;
