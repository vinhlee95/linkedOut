// import { combineReducers } from 'redux';
import authReducer from './auth_reducer';
import jobsReducer from './jobs_reducer';
import likeJobsReducer from './likes_reducer';

export default ({
   auth: authReducer,
   jobs: jobsReducer,
   likedJobs: likeJobsReducer,
});