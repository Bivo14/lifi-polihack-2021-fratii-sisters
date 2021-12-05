import {
  LOGIN,
  LOGOUT,
  REGISTER,
  ANSWER_PROCESSING_START,
  HABIT_INC,
} from '../actions/types';

const INIT_STATE = {
  user: null,
  register: false,
};

const authReducer = (state = INIT_STATE, action) => {
  switch (action.type) {
    case REGISTER:
      return { ...state, user: action.payload, register: true };
    case LOGIN:
      return { ...state, user: action.payload };
    case LOGOUT:
      return { ...state, user: null };
    case ANSWER_PROCESSING_START:
      return { ...state, register: false };
    case HABIT_INC:
      return { ...state, user: { ...state.user, score: state.user.score } };
    default:
      return state;
  }
};

export default authReducer;
