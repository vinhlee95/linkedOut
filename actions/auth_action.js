import {
   LOGIN_SUCCESS,
   LOGIN_FAIL
} from './types';
import { AsyncStorage } from 'react-native';
import { Facebook } from 'expo';

const APP_ID = '192928678192750';

export const facebookLogin = () => async (dispatch) => {
   let token = await AsyncStorage.getItem('fb_token');
   if(token) {
      dispatch({ type: LOGIN_SUCCESS, payload: token });
   } else {
      handleFacebookLogin(dispatch);
   }
};

const handleFacebookLogin = async (dispatch) => {
   let result = await Facebook.logInWithReadPermissionsAsync(APP_ID, {
      permissions: ['public_profile']
   });
   const { type, token } = result;
   if(type === 'cancel') {
      return dispatch({ type: LOGIN_FAIL });
   }
   await AsyncStorage.setItem('fb_token', token);
   dispatch({ type: LOGIN_SUCCESS, payload: token });
};