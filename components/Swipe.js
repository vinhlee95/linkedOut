import React, { Component } from 'react';
import { View, Text, Animated, PanResponder, Dimensions, LayoutAnimation, UIManager } from 'react-native';
import { Card,Button } from 'react-native-elements';
import { MapView } from 'expo';

const DEVICE_WIDTH = Dimensions.get('window').width;
const SWIPE_THRESOLD = DEVICE_WIDTH * 0.15;
const SWIPEOUT_DURATION = 250;

class Swipe extends Component {
   // default props to avoid errors when there is no
   // props passed in the root Component
   static defaultProps = {
      onSwipeRight: () => {},
      onSwipeRight: () => {}
   }
   state = { index: 0 }
   
   componentWillMount() {
      // animated system
      this.position = new Animated.ValueXY();
      
      // gesture system
      this.panResponder = PanResponder.create({
         // ask to be the responder
         onStartShouldSetPanResponder: () => true,
         onPanResponderMove: (event, gesture) => {
            this.position.setValue({ x: gesture.dx, y: gesture.dy });
         },
         onPanResponderRelease: (event, gesture) => {
            // when the card is swiped right
            if(gesture.dx > SWIPE_THRESOLD) {
               this.handleSwipe('right');
            } 
            // when the card is swiped left
               else if(gesture.dx < -SWIPE_THRESOLD) {
               this.handleSwipe('left');
            } else {
               Animated.spring(this.position, {
               toValue: {}
            }).start();
            }
         },
      });
   }

   componentWillReceiveProps(nextProps) {
      if(nextProps.data !== this.props.data) {
         this.setState({ index: 0 });
         LayoutAnimation.spring();         
      }
   }

   // componentWillUpdate() {
   //    UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true);
   //    LayoutAnimation.spring();
   // }

   handleSwipe(direction) {
      const x = direction === 'right' ? DEVICE_WIDTH : -DEVICE_WIDTH;
      Animated.timing(this.position, {
         toValue: {
            x,
            y: 0
         },
         duration: SWIPEOUT_DURATION
      }).start(() => this.onSwipeComplete(direction));
   }

   onSwipeComplete(direction) {
      const { onSwipeRight, onSwipeLeft, data } = this.props;
      const item = data[this.state.index];

      direction === 'right' ? onSwipeRight(item) : null; // add onSwipeLeft callback here
      this.position.setValue({ x: 0, y:0 });
      this.setState({ index: this.state.index + 1 });      
   }

//    //handleRotation
//    cardStyle() {
//       const { position } = this;
//       const rotate = position.x.interpolate({
//          inputRange: [-DEVICE_WIDTH * 1.5, 0, DEVICE_WIDTH * 1.5],
//          outputRange: ['-120deg', '0deg', '120deg'],
//       });
//       return {
//          ...position.getLayout(),
//          transform: [{ rotate }],
//       }
//    }

   renderCard = () => {
      return this.props.data.map(({jobKey, jobtitle, company, formattedRelativeTime, snippet, latitude, longitude }, cardIndex) => {
         let initialRegion = {
            longitude,
            latitude,
            longitudeDelta: 0.04,
            latitudeDelta: 0.09,
         }
         if(cardIndex < this.state.index) { return null; }
         if(cardIndex === this.state.index) { 
            return (
               <Animated.View {...this.panResponder.panHandlers}
                  style={[this.position.getLayout(), styles.cardStyle]}
                  key={cardIndex} >
                  
                  <Card
                     key={jobKey}
                     containerStyle={{ borderRadius: 5 }}>
                     <Text style={styles.title} >{jobtitle}</Text>                     
                     <View stlye={{ height: 300 }}>
                        <MapView
                           scrollEnabled={false}
                           initialRegion={initialRegion}
                           style={{ height: 300 }} >
                        <MapView.Marker coordinate = {initialRegion}/>                        
                        </MapView>
                     </View>

                     <Text>{company}</Text>
                     <Text>{formattedRelativeTime}</Text>
                     <Text style={{
                        marginBottom: 10
                     }}>{snippet.replace(/<b>/g, '').replace(/<\/b/g, '')}</Text>

                  </Card>
               </Animated.View>
            );
         }
         const marginTop = (cardIndex - this.state.index) * 10;
         return (
            // no gesture
            <Animated.View 
               style={[styles.cardStyle, {marginTop}, ]}
               key={cardIndex}>
               <Card
                  containerStyle={{ borderRadius: 5 }}>
                  <Text style={styles.title} >{jobtitle}</Text>
                  
                  <View stlye={{ height: 300 }}>
                     <MapView
                        scrollEnabled={false}
                        initialRegion = {initialRegion}
                        style={{ height: 300, zIndex: 100 }} >
                        <MapView.Marker coordinate = {initialRegion}/>
                     </MapView>
                  </View>
                  <View style={styles.description}>         
                     <Text>{company}</Text>
                     <Text>{formattedRelativeTime}</Text>
                     <Text style={{
                        marginBottom: 10
                     }}>{snippet.replace(/<b>/g, '').replace(/<\/b/g, '')}</Text>
                  </View>

               </Card>
            </Animated.View>
         );
      }).reverse();
   }

   render() {
      let noJobMessage;
      if(this.state.index >= this.props.data.length) {
         noJobMessage = (
            <View>
               <Text style={styles.noJobMessage}>No more Job!</Text>
            </View>
         );
      }
      return(
         <View>
            {this.renderCard()}
            {noJobMessage}
         </View>
      )
   }
}

const styles = {
   title: {
      fontSize: 24,
      marginBottom: 10,
   },
   description: {
      marginTop: 20
   },
   cardStyle: {
      marginTop: 20,
      position: 'absolute', 
      width: DEVICE_WIDTH,
      display: 'flex',
      justifyContent: 'space-between'
   },
   noJobMessage: {
      textAlign: 'center',
      color: 'red',
      fontSize: 20,
      marginBottom: 20,
   }

}

export default Swipe;