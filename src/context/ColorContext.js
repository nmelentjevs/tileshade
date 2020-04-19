import { AsyncStorage } from 'react-native';
import createDataContext from './createDataContext';
import Color from 'color';
import shuffle from '../utils/shuffle';

const colorReducer = (state, action) => {
  switch (action.type) {
    case 'new_color':
      return { ...state, colors: action.payload, level: state.level + 1 };
    case 'add_time':
      return { ...state, time: state.time + action.payload };
    case 'subtract_time':
      return { ...state, time: state.time - action.payload };
    case 'reset':
      return { ...state, level: 0 };
    default:
      return state;
  }
};

const generateFieldColors = (color, level) => {
  color = Color.rgb(color);
  const colors = {
    main: color,
    background: color,
    border: color.fade(0.5),
    topShadow: color.lighten(0.15),
    bottomShadow: color.darken(0.15),
    special:
      Math.random() >= 0.5
        ? color.lighten(0.02 - level * 0.00025)
        : color.darken(0.02 - level * 0.00025),
    buttonTopShadow: color.lighten(0.15).darken(0.025),
    buttonBottomShadow: color.darken(0.15).darken(0.025),
    buttonBackground: color.darken(0.04),
    buttonText: color.lighten(0.5),
    buttonBorder: color.fade(0.5),
    icon: color.isDark() ? color.lighten(0.8) : color.lighten(0.4),
    heading: color.darken(0.2),
  };
  return colors;
};

const colorArrayMatch = (arr1, arr2) => {
  if (arr1.length !== arr2.length) return false;
  for (let i = 0; i < arr1.length; i++) {
    if (arr1[i] !== arr2[i]) return false;
  }
  return true;
};

const defaultArray = [
  Color.rgb('#FEC9D9'),
  Color.rgb('#FFDFD3'),
  Color.rgb('#E0BBE4'),
  Color.rgb('#CC99C9'),
  Color.rgb('#D291BC'),
  Color.rgb('#957DAD'),
];

const changeColor = (dispatch) => async ({ color, level, theme }) => {
  const nextColors = shuffle(theme).filter(
    (c) => !colorArrayMatch(c.color, Color.rgb(color).color)
  );

  const colors = generateFieldColors(nextColors[0], level);
  dispatch({ type: 'new_color', payload: { ...colors } });
};

// const defaultColor = { r: 220, g: 233, b: 247, alpha: 1 };
const defaultColor = shuffle(defaultArray)[0];
const initialState = {
  colors: generateFieldColors(defaultColor, 1),
  level: 1,
};

const resetLevel = (dispatch) => () => {
  dispatch({ type: 'reset' });
};

export const { Provider, Context } = createDataContext(
  colorReducer,
  {
    changeColor,
    resetLevel,
  },
  { ...initialState }
);
