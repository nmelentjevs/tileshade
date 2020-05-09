import createDataContext from './createDataContext';

const timerReducer = (state, action) => {
  switch (action.type) {
    case 'add_time':
      return { ...state, time: state.time + 1 };
    case 'subtract_time':
      return { ...state, time: state.time - 1 };
    case 'start_time':
      return { ...state, moving: true };
    case 'stop_time':
      return { ...state, moving: false };
    case 'reset':
      return { ...state, time: 20 };
    default:
      return state;
  }
};

const initialState = {
  time: 20,
  moving: false,
};

const resetTime = (dispatch) => () => {
  dispatch({
    type: 'reset',
  });
};

const startTime = (dispatch) => () => {
  dispatch({
    type: 'start_time',
  });
};

const stopTime = (dispatch) => () => {
  dispatch({
    type: 'stop_time',
  });
};

const addTime = (dispatch) => () => {
  dispatch({
    type: 'add_time',
  });
};

const subtractTime = (dispatch) => () => {
  dispatch({
    type: 'subtract_time',
  });
};

export const { Provider, Context } = createDataContext(
  timerReducer,
  {
    resetTime,
    addTime,
    subtractTime,
    startTime,
    stopTime,
  },
  { ...initialState }
);
