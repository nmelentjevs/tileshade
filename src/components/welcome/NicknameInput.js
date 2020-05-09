import React, { useState, useEffect, useRef } from 'react';
import {
  StyleSheet,
  KeyboardAvoidingView,
  Keyboard,
  AsyncStorage,
  TouchableWithoutFeedback,
  Platform,
} from 'react-native';
import { Text, Input } from '../common';

const NicknameInput = ({ colors: { buttonText, heading } }) => {
  const [nickname, setNickname] = useState('Nickname');
  const nicknameInput = useRef();

  useEffect(() => {
    AsyncStorage.getItem('nickname').then((nickname) => setNickname(nickname));
  }, []);

  const enteredNickname = async () => {
    Keyboard.dismiss();
    if (nickname) {
      await AsyncStorage.setItem('nickname', nickname);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={enteredNickname}>
      <KeyboardAvoidingView>
        <Input
          returnKeyType="done"
          customRef={nicknameInput}
          value={nickname}
          onChangeText={setNickname}
          placeholder={Platform.OS === 'android' ? 'Nickname' : 'Nickname'}
          placeholderTextColor={buttonText}
          style={{
            ...styles.nicknameInput,
            color: buttonText,
            borderBottomColor: heading,
            minWidth: Platform.OS === 'android' ? 155 : 140,
            textAlign: 'center',
          }}
          onSubmitEditing={enteredNickname}
        />
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  nicknameInput: {
    fontSize: 20,
    fontWeight: 'bold',
    letterSpacing: 2,
    fontFamily: 'baloo',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderWidth: 0,
    backgroundColor: 'transparent',
    alignSelf: 'center',
    borderBottomWidth: 1,
  },
});

export default NicknameInput;
