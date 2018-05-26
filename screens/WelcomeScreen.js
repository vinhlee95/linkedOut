import React, { Component } from 'react';
import { View, Text } from 'react-native';
import Slides from '../components/Slides';

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

   onStart = () => {
      this.props.navigation.navigate('auth');
   }

   render() {
      return(
         <View style={{ flex: 1 }}>
            <Slides data={data} onStart={this.onStart}/>
         </View>
      )
   }
}

export default WelcomeScreen;