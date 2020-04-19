import createDataContext from './createDataContext';

const soundReducer = (state, action) => {
  switch (action.type) {
    case 'toggle_sound':
      return { ...state, sound: !state.sound };
    default:
      return state;
  }
};

const initialState = {
  sound: true,
};

const toggleSound = (dispatch) => () => {
  dispatch({ type: 'toggle_sound' });
};

export const { Provider, Context } = createDataContext(
  soundReducer,
  {
    toggleSound,
  },
  { ...initialState }
);
