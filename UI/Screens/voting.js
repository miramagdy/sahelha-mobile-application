import React, { Component } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, ScrollView,FlatList } from 'react-native';
import CustomMultiPicker from "react-native-multiple-select-list";
 class CalcTotalHoursScreen extends React.Component  {
 


    userlist ={
          "123":"Is",
          "124":"DB1",
          "125":"Hr",
          "127":"PL1",
          "128":"CS",
          "129":"AI",
          "130":"IA",
          "131":"Math1",
          "132":"Math2",
          "133":"English",
          "134":"Quality",
          "135":"DW",
          "136":"Statistics                                                ",
          "137":"Ethics",
          "138":"Security",
          "139":"SW1",
          "140":"SW2"
        }

  render(){
    return  (
      <View style={styles.container}>
      <ScrollView style={styles.scroll}>
      <CustomMultiPicker
       // options={this.userlist}
       options={Object.assign({},this.state.viewSubjects)}
        search={false} // should show search bar?
        multiple={false} //
        placeholder={"Search"}
        placeholderTextColor={'#757575'}
        returnValue={"label"} // label or value
        callback={(res)=>{ console.log(res) }} // callback, array of selected items
        rowBackgroundColor={"#eee"}
        rowHeight={40}
        rowRadius={10}
        iconColor={"#53D6BB"}
        iconSize={30}
        selectedIconName={"ios-checkmark-circle-outline"}
        unselectedIconName={"ios-add-circle"}
        scrollViewHeight={280}
        selected={[]} // list of options which are selected by default
      />
      <View style={styles.button}>
        <TouchableOpacity
        onPress={this.calculate}
        >
          <Text>Calculate Total Hours</Text>
        </TouchableOpacity>
      </View>
      </ScrollView>
    </View>
      
   );
  }

}
  

const styles = StyleSheet.create({
  container: {
    flex:1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 50
  },
  scroll: {
    width:"95%"
  },
  button: {
    backgroundColor: '#53D6BB',
    width:"60%",
    borderRadius:25,
    height:50,
    alignItems:"center",
    justifyContent:"center",
    marginTop:30,
    marginBottom:10
  }
});

export default CalcTotalHoursScreen;