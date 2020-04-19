import createDataContext from './createDataContext';
import Color from 'color';

const themeReducer = (state, action) => {
  switch (action.type) {
    case 'set_theme':
      return {
        ...state,
        theme: [...state.theme, ...action.payload.themeArray],
        names: action.payload.currentThemeNames,
      };
    case 'disable_theme':
      return {
        ...state,
        theme: state.theme.filter(
          (color) => !action.payload.colors.some((c) => c.hex() === color.hex())
        ),
        names: state.names.map((n) => {
          if (n.name === action.payload.name) {
            n.active = false;
            n.purchased = true;
            n.locked = false;
          }
          return n;
        }),
      };
    case 'enable_theme':
      return {
        ...state,
        theme: [...state.theme, ...action.payload.colors],
        names: state.names.map((n) => {
          if (n.name === action.payload.name) {
            n.active = true;
            n.purchased = true;
            n.locked = false;
          }
          return n;
        }),
      };
    default:
      return state;
  }
};

const defaultArray = [
  Color.rgb('#FEC9D9'),
  Color.rgb('#FFDFD3'),
  Color.rgb('#E0BBE4'),
  Color.rgb('#CC99C9'),
  Color.rgb('#D291BC'),
  Color.rgb('#957DAD'),
];

const themes = {
  stylish: [
    Color.rgb('#75ABBC'),
    Color.rgb('#CCAADD'),
    Color.rgb('#D1D1D4'),
    Color.rgb('#976ED7'),
    Color.rgb('#8C00FC'),
    Color.rgb('#DAD2BC'),
  ],

  mystery: [
    Color.rgb('#A99985'),
    Color.rgb('#EDAF97'),
    Color.rgb('#C49792'),
    Color.rgb('#A755C2'),
    Color.rgb('#F4B9B2'),
    Color.rgb('#DE6B48'),
  ],

  neon: [
    Color.rgb('#F39A27'),
    Color.rgb('#994636'),
    Color.rgb('#03C03C'),
    Color.rgb('#F25F5C'),
    Color.rgb('#59C9A5'),
    Color.rgb('#6622CC'),
  ],

  leaf: [
    Color.rgb('#4A7C59'),
    Color.rgb('#436436'),
    Color.rgb('#60A561'),
    Color.rgb('#698F3F'),
    Color.rgb('#ACA885'),
    Color.rgb('#99C2A2'),
  ],

  premium: [
    Color.rgb('#FE938C'),
    Color.rgb('#DB995A'),
    Color.rgb('#E1CA96'),
    Color.rgb('#ACA885'),
    Color.rgb('#CCA43B'),
    Color.rgb('#434A42'),
  ],

  // ADD 1
  woodoo: [
    Color.rgb('#70C1B3'),
    Color.rgb('#B9E3C6'),
    Color.rgb('#B07C9E'),
    Color.rgb('#D2A1B8'),
    Color.rgb('#B59194'),
    Color.rgb('#AD91A3'),
  ],

  orchide: [
    Color.rgb('#DB504A'),
    Color.rgb('#B56470'),
    Color.rgb('#8B575C'),
    Color.rgb('#C98986'),
    Color.rgb('#F4B9B2'),
    Color.rgb('#F6BDD1'),
  ],

  // CHANGE
  shadow: [
    Color.rgb('#F46036'),
    Color.rgb('#FFDFD3'),
    Color.rgb('#CAA87D'),
    Color.rgb('#804E49'),
    Color.rgb('#FAD1AF'),
    Color.rgb('#AFC9CF'),
  ],

  arctic: [
    Color.rgb('#23B5D3'),
    Color.rgb('#579ABE'),
    Color.rgb('#8EC6C5'),
    Color.rgb('#6983AA'),
    Color.rgb('#789FCC'),
    Color.rgb('#56A3A6'),
  ],
};

const themeNames = [
  'orchide',
  'leaf',
  'arctic',
  'premium',
  'neon',
  'stylish',
  'mystery',
  'shadow',
  'woodoo',
];

const initialState = {
  theme: [...defaultArray],
  names: [],
};

const setTheme = (dispatch) => (purchases) => {
  console.log(purchases);
  let themeArray = [];
  let currentThemeNames = themeNames.map((t, i) => {
    const themeObj = {
      name: t,
      active: purchases[i] === 'active',
      purchased: purchases[i] === 'active' || purchases[i] === 'purchased',
      locked: !purchases[i],
    };
    return themeObj;
  });

  currentThemeNames.map((theme) => {
    if (theme.active) {
      themeArray = [...themeArray, ...themes[theme.name]];
    }
  });

  dispatch({
    type: 'set_theme',
    payload: { themeArray, currentThemeNames },
  });
};

const activateTheme = (dispatch) => (newTheme) => {
  let addedTheme = null;
  Object.keys(themes).map((theme) => {
    if (theme === newTheme) {
      addedTheme = themes[theme];
    }
  });

  dispatch({
    type: 'enable_theme',
    payload: { colors: addedTheme, name: newTheme },
  });
};

const disableTheme = (dispatch) => (newTheme) => {
  let disabledTheme = null;
  Object.keys(themes).map((theme) => {
    if (theme === newTheme) {
      disabledTheme = themes[theme];
    }
  });

  dispatch({
    type: 'disable_theme',
    payload: { colors: disabledTheme, name: newTheme },
  });
};

export const { Provider, Context } = createDataContext(
  themeReducer,
  {
    setTheme,
    activateTheme,
    disableTheme,
  },
  initialState
);
