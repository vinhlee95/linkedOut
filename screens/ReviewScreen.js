import React, { Component } from 'react';
import { View, Text, ScrollView, Linking } from 'react-native';
import { Card, Button } from 'react-native-elements';
import { MapView } from 'expo';

import { connect } from 'react-redux';

class ReviewScreen extends Component {
   static navigationOptions = ({ navigation }) => {
      return {
         title: 'Review Jobs',
         tabBarIcon:  ({ tintColor }) => {
            return <Icon name="favorite" size={30} color={tintColor} />;
         },
         headerRight: 
            <Button
               title="Settings"
               onPress={() => navigation.navigate('settings')}
               backgroundColor="rgba(0,0,0,0)"
               color="rgba(0, 122, 255, 1)"
            />
         }
      }

   renderLikedCards = () => {
      return this.props.likedJobs.map(({latitude, longitude, jobtitle, company, formattedRelativeTime, url}, id) => {
         let region = {
            longitudeDelta: 0.04,
            latitudeDelta: 0.09,
         }
         region.latitude = latitude;
         region.longitude = longitude;
         return(
            <Card key={id} style={styles.cardStyle}>
               <View style={{height: 300}}>
                  {/* Text title */}
                  <Text style={styles.title}>{jobtitle}</Text>
                  <View style={styles.description}>
                     <Text>{company}</Text>
                     <Text>{formattedRelativeTime}</Text>
                  </View>

                  {/* Map comes here */}
                  <MapView
                     style={styles.mapView}
                     initialRegion={region}
                     scrollEnabled={false}
                  />

                  {/* Apply button */}
                  <Button 
                     title='APPLY NOW'
                     backgroundColor="#4286f4"
                     buttonStyle={{
                        borderRadius: 5
                     }}
                     onPress={() => Linking.openURL(url)}
                  />
               </View>
            </Card>
         )
      });
   }

   render() {
      return(
         <ScrollView style={{flex:1}}>
            {this.renderLikedCards()}
         </ScrollView>
      )
   }
}

const styles = {
   title: {
      fontSize: 18,
      fontWeight: 'bold',
   },
   description: {
      flexDirection: 'row',
      justifyContent: 'space-between',
   },
   mapView: {
      flex: 1,
      marginTop: 10,
      marginBottom: 10,
   }
}

const mapStateToProps = ({ likedJobs }) => {
   return { likedJobs };
}

export default connect(mapStateToProps)(ReviewScreen);