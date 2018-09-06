import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { Button } from 'react-native-elements';
import * as actions from '../actions';
import { connect } from 'react-redux';

class SettingScreen extends Component {
   static navigationOptions = {
      title: 'Clear all',
   }

   handleClearLikedJobs = () => {
      this.props.clearLikedJobs();
      this.props.navigation.navigate('review');
   }

   render() {
      return(
         <View>
            <Button 
               title='Clear all jobs'
               backgroundColor="#f25454"
               buttonStyle={{
                  borderRadius: 5,
                  marginTop: 10,
               }}
               onPress={this.handleClearLikedJobs}
            />
         </View>
      )
   }
}

export default connect(null, actions)(SettingScreen);