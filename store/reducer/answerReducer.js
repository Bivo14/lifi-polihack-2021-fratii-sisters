import {
  ANSWER_PROCESSING_START,
  ANSWER_PROCESSING_DONE,
} from '../actions/types';

const INIT_STATE = false;

const answerReducer = (state = INIT_STATE, action) => {
  switch (action.type) {
    case ANSWER_PROCESSING_START:
      return true;
    case ANSWER_PROCESSING_DONE:
      return false;
    default:
      return state;
  }
};

export default answerReducer;
