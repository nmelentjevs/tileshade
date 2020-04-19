import React, { useContext } from 'react';
import { StyleSheet, Modal, FlatList, View, ScrollView } from 'react-native';
import { Block, Text, Button, Morph } from '../common';
import { theme } from '../../constants';
import Field from '../game/Field';
import Square from '../game/Square';

const FirstTime = ({
  welcomeShow,
  setWelcomeShow,
  colors: { background, heading, border, topShadow, bottomShadow, special },
}) => {
  return (
    <Modal animationType="slide" visible={welcomeShow}>
      <Block
        padding={[theme.sizes.padding * 2, 0]}
        center
        middle
        style={{ backgroundColor: background }}
      >
        <Block flex={0.5}>
          <Text h2 color={heading}>
            Welcome to Colory Tiles!
          </Text>
          <Text h3 color={heading}>
            1. Choose difficulty
          </Text>
          <Text h3 color={heading}>
            2. Find the different tone tile
          </Text>
          <ScrollView horizontal>
            {[false, false, true, false].map((c, i) => (
              <Morph
                shadows={{ topShadow, bottomShadow }}
                border={border}
                background={background}
                width={50}
                height={50}
                style={{
                  margin: 5,
                  backgroundColor: c ? special : background,
                }}
              ></Morph>
            ))}
          </ScrollView>

          <Text h3 color={heading}>
            3. Tone can be darker or lighter
          </Text>
        </Block>

        <Text h3 color={heading}>
          4. Enjoy!
        </Text>

        <Button gradient onPress={() => setWelcomeShow(false)}>
          <Text center white>
            I understand
          </Text>
        </Button>
      </Block>
    </Modal>
  );
};

const styles = StyleSheet.create({});

export default FirstTime;
