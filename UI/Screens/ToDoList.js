import React from 'react';
import { StyleSheet, View,  Text,  ScrollView, } from 'react-native';

export default class ToDoListScreen extends React.Component {
  
  state = {
    firstRate: 0,
    secondRate: 0,
   };

  
render() {
    return (
      <ScrollView style={styles.container}>
     
          <View >
            <Text >To Do List</Text>
          
          </View>
        
        </ScrollView>
    );}
}


const styles = StyleSheet.create({
  container: {
    flex: 5, 
    paddingLeft:5,
    paddingRight:5,
    //backgroundColor: '#89E1C4',
    
  },

});