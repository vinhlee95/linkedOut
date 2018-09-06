import { FETCH_JOB } from '../actions/types';

export default (state=[], action) => {
   switch(action.type) {
      case FETCH_JOB:
         return action.payload;

      default:
         return state;
   }
}