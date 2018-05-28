import React, { Component } from 'react';
import { View, Text, AsyncStorage } from 'react-native';
import Slides from '../components/Slides';
import { AppLoading } from 'expo';

const data = [
   { 
      text: 'Welcome to LinkedOut, the app helps you to quit your bullshit job', 
      color: 'black',
      image: require("../images/background1.png"),
   },
   { 
      text: 'Set your location, then swipe away', 
      color: 'black',
      image: require("../images/earthBackground.png")
   }
]

class WelcomeScreen extends Component {
   state = { isReady: false };

   onStart = () => {
      this.props.navigation.navigate('auth');
   }

   // // espace from logging in
   // componentWillMount() {
   //    AsyncStorage.removeItem('fb_token')      
   // }

   loadTokenAsync = async () => {
      let token = await AsyncStorage.getItem('fb_token');
      if(token) {
         this.props.navigation.navigate('map');
      } else {
         this.setState({ isReady: false });
      }
   }

   render() {
      if(!this.state.isReady) {
         return(
            <AppLoading
               startAsync={this.loadTokenAsync}
               onFinish={() => this.setState({ isReady: true })}
            />
         );
      }
      return(
         <View style={{ flex: 1 }}>
            <Slides data={data} onStart={this.onStart}/>
         </View>
      )
   }
}

export default WelcomeScreen;