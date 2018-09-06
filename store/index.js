import { createStore, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import reducers from '../reducers';
// redux-persist stuffs
import { AsyncStorage } from 'react-native';
import { persistStore, persistCombineReducers } from 'redux-persist';

const persistConfig = {
   key: 'root',
   storage: AsyncStorage,
   whitelist: 'likedJobs' // only state in likedJobs reducer will be persisted
}

let persistedReducer = persistCombineReducers(persistConfig, reducers);

export default () => {
   let store = createStore(
      persistedReducer,
      {},
      applyMiddleware(thunk)
   );
   let persistor = persistStore(store);
   return { persistor, store }; // store for Provider, persistor for PersistGate
}