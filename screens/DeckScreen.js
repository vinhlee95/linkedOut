import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';
import * as actions from '../actions';
import { Icon } from 'react-native-elements';

import Swipe from '.././components/Swipe';

class DeckScreen extends Component {
   static navigationOptions = {
      title: 'Jobs',
      tabBarIcon: ({ tintColor }) => {
         return <Icon name="description" size={25} color={tintColor} />
      },
   }
   render() {
      let initialRegion;
      // console.log(this.props.jobs)
      let jobCards;
      this.props.jobs 
      ?
      jobCards = <Swipe 
                     data={this.props.jobs}
                     onSwipeRight={job => this.props.likeJob(job)} />
      :
      jobCards = <Text>Loading...</Text>
      return(
         <View>
            {jobCards}
         </View>
      )
   }
}

const mapStateToProps = ({jobs}) => {
   return { jobs };
}

export default connect(mapStateToProps, actions)(DeckScreen);