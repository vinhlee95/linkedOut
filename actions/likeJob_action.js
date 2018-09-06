import { LIKE_JOB, CLEAR_LIKE_JOBS } from './types';

export const likeJob = (job) => {
   return {
      type: LIKE_JOB,
      payload: job
   }
}

export const clearLikedJobs = () => {
   return {
      type: CLEAR_LIKE_JOBS
   }
}