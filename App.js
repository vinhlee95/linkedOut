import React from 'react';
import { Notifications } from 'expo';
import registerNotification from './services/push_notification';
import { StyleSheet, Text, View, Alert } from 'react-native';
import { createBottomTabNavigator, createStackNavigator } from 'react-navigation';
import { Provider } from 'react-redux';
import configureStore from './store';

import { PersistGate } from 'redux-persist/lib/integration/react';


import AuthScreen from './screens/AuthScreen';
import WelcomeScreen from './screens/WelcomeScreen';
import MapScreen from './screens/MapScreen';
import DeckScreen from './screens/DeckScreen';
import SettingsScreen from './screens/SettingsScreen';
import ReviewScreen from './screens/ReviewScreen';

export default class App extends React.Component {

   componentDidMount() {
      registerNotification();
      Notifications.addListener((notification) => {
         const { text } = notification.data;
         const { origin } = notification;

         if(text && origin === 'received') {
            Alert.alert(
               'New Push Notification',
               text, [{
                  text: 'OK'
               }]
            )
         }
      });
   }

  render() {
     const { persistor, store } = configureStore();
    const MainNavigator = createBottomTabNavigator(
      {
        welcome: WelcomeScreen,
        auth: AuthScreen,
        main: createBottomTabNavigator({
         
          map: MapScreen,
          deck: DeckScreen,
          review: createStackNavigator({
            review: ReviewScreen,
            settings: SettingsScreen
          },
          {
            
          })
        })
      }, 
      {
        navigationOptions: {
          tabBarVisible: false
        }
      },
    );
    return (
      <Provider store={store}>
         {/* delay rendering till persisted state has been retrieved
            and save to redux */}
         <PersistGate persistor={persistor}>
            <View style={styles.container}>
               <MainNavigator  />
            </View>
         </PersistGate>
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
});
