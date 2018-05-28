import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createBottomTabNavigator, createStackNavigator } from 'react-navigation';
import { Provider } from 'react-redux';
import store from './store';

import AuthScreen from './screens/AuthScreen';
import WelcomeScreen from './screens/WelcomeScreen';
import MapScreen from './screens/MapScreen';
import DeckScreen from './screens/DeckScreen';
import SettingsScreen from './screens/SettingsScreen';
import ReviewScreen from './screens/ReviewScreen';

export default class App extends React.Component {
  render() {
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
        <View style={styles.container}>
          <MainNavigator  />
        </View>
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
