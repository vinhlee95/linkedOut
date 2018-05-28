import React, { Component } from 'react';
import { View, Text } from 'react-native';

class SettingScreen extends Component {
   static navigationOptions = {
      title: 'Clear all',
   }
   render() {
      return(
         <View>
            <Text>SettingScreen</Text>
         </View>
      )
   }
}

export default SettingScreen;