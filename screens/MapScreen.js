import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { MapView } from 'expo';
import * as actions from '../actions';
import { connect } from 'react-redux';
import { Button, Icon } from 'react-native-elements';

class MapScreen extends Component {
   static navigationOptions = {
      title: 'Map',
      tabBarIcon: ({ tintColor }) => {
         return <Icon name="my-location" size={25} color={tintColor} />
      },
   }
   state = {
      region: {
         longitude: -73.935242,
         latitude: 40.730610,
         longitudeDelta: 0.04,
         latitudeDelta: 0.09,
      }
   }

   onRegionChangeComplete = (region) => {
      this.setState({ region })
   }

   handleSearch = () => {
      this.props.fetchJob(this.state.region, () => {
         this.props.navigation.navigate('deck')
      });
   }

   render() {
      return(
         <View style={{ flex: 1}}>
            <MapView 
               style={{ flex: 1 }}
               initialRegion={this.state.region}
               onRegionChangeComplete={this.onRegionChangeComplete} />
            <View style={styles.buttonContainer}>
               <Button 
                  buttonStyle={styles.button} 
                  large title="Search"
                  icon={{ name: 'search'}}
                  onPress={this.handleSearch} />
            </View>
         </View>
      )
   }
}

const styles = {
   buttonContainer: {
      position: 'absolute',
      left: 0,
      right: 0,
      bottom: 20,
   },
   button: {
      backgroundColor: '#3e90e8',
      borderRadius: 5,
   }
}

export default connect(null, actions)(MapScreen);