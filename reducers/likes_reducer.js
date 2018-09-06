import { LIKE_JOB, CLEAR_LIKE_JOBS } from '../actions/types';
import { PERSIST_REHYDRATE } from 'redux-persist/lib/constants'

export default (state=[], action) => {
   switch(action.type) {
      // pull out likedJobs pience of state from action.payload
      // saved to AsyncStorage last time redux persist was run
      case PERSIST_REHYDRATE:
         return action.payload.likedJobs || [];

      case LIKE_JOB:
         return [...state, action.payload];

      case CLEAR_LIKE_JOBS:
         return [];

      default:
         return state;
   }
}