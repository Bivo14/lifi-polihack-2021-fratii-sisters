import { combineReducers } from 'redux';

import authReducer from './authReducer';
import answerReducer from './answerReducer';

export default combineReducers({
  auth: authReducer,
  answer: answerReducer,
});
