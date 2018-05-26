import React, { Component } from 'react';
import { View, Text, ScrollView, Dimensions, Image } from 'react-native';
import { Button } from 'react-native-elements';
import Swiper from 'react-native-swiper';

const DEVICE_WIDTH = Dimensions.get('window').width;
const DEVICE_HEIGHT = Dimensions.get('window').height;

class Slides extends Component {

   renderSlides = () => {
      return this.props.data.map((slide, id) => {
         let button = null;
         if(id === this.props.data.length -1) {
            button = <Button 
                        title="I'm ready"
                        buttonStyle={{ backgroundColor: '#5c5f63', borderRadius: 3}}
                        onPress={this.props.onStart} />;
         }
         return (
            <View 
               style={[styles.slides, {backgroundColor: slide.color}]}
               key={id} >
               <Text style={styles.text}>{slide.text}</Text>
               <Image 
                  source={slide.image} 
                  style={{ 
                     width: DEVICE_WIDTH, 
                     height: DEVICE_HEIGHT,
                     position: 'absolute',
                     zIndex: 0,
                     alignSelf: 'stretch',
                     opacity: 0.8 }}
               />
               {button}
            </View>
         );
      });
   }

   render() {
      return(
         <Swiper>
               {this.renderSlides()}
         </Swiper>
      );
   }
}

const styles = {
   slides: {
      flex: 1,
      width: DEVICE_WIDTH,
      justifyContent:'center',
      alignItems: 'center'
   },
   text: {
      fontSize: 25,
      color: '#fff',
      marginLeft: 10,
      marginRight: 10,
      zIndex: 1
   },
}

export default Slides;