
import { FETCH_JOB} from './types';
import jobData from '.././jobData.json';

const URL = 'https://jobs.github.com/positions.json?';

export const fetchJob = (location, callback) => async (dispatch) => {
   const { latitude, longitude } = location;
   // let result = await axios.get(`${URL}lat=${latitude}&long=${longitude}`);
   const data = jobData.results;
   dispatch({
      type: FETCH_JOB,
      payload: data,
   });
   callback(); 
}

