import createDataContext from './createDataContext';

const adsReducer = (state, action) => {
  switch (action.type) {
    case 'turn_off_ads':
      return { ...state, showAds: false };
    default:
      return state;
  }
};

const initialState = {
  showAds: true,
};

const turnOffAds = (dispatch) => () => {
  dispatch({
    type: 'turn_off_ads',
  });
};

export const { Provider, Context } = createDataContext(
  adsReducer,
  {
    turnOffAds,
  },
  { ...initialState }
);
