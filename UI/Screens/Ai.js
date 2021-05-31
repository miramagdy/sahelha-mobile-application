import React, { useState } from 'react';
import { StyleSheet, Linking, Image, ActivityIndicator, Button, View, TouchableOpacity, Text, TextInput, FlatList, ScrollView, TouchableWithoutFeedback, Animated, Easing, LogBox } from 'react-native';
import * as ImagePicker from "expo-image-picker";
import { Feather } from '@expo/vector-icons';
import { EvilIcons } from '@expo/vector-icons';
import {YellowBox} from 'react-native';

export default class AiScreen extends React.Component {

  
  state = {
    firstRate: 2,
    secondRate: 1,
    courselink: '',
    data: [],
    data1: [],
    image: null,
    uploading: false,
  };


  _maybeRenderUploadingIndicator = () => {
    if (this.state.uploading) {
      return <ActivityIndicator animating size="large" />;
    }
  };
  _maybeRenderControls = () => {
    if (!this.state.uploading) {
      return (
        <View style={styles.c}>
          {/* <View  style={styles.button1}>
              <Button 
                onPress={this._pickImage}
                title="Pick "
              />
            </View> */}
          <View style={styles.button1}>
            {/* <Feather name="camera" size={70} color="#BFF0E6"  onPress={this._pickImage}
  /> */}
          </View>
          <View style={styles.button1} >
            <EvilIcons name="image" size={100} color='#BFF0E6' onPress={this._pickImage} />

            {/* <Button  onPress={this._takePhoto} title="Take a photo" /> */}
            <Feather name="camera" size={70} color="#BFF0E6" onPress={this._takePhoto} />
          </View>
        </View>
      );
    }
  };



  _askPermission = async (failureMessage) => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (status === "denied") {
      alert(failureMessage);
    }
  };


  _takePhoto = async () => {
    await this._askPermission(
      "We need the camera permission to take a picture..."
    );

    let pickerResult = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [4, 3],
    });

    this._handleImagePicked(pickerResult);
  };


  _pickImage = async () => {
    await this._askPermission(
      "We need the camera-roll permission to read pictures from your phone..."
    );

    let pickerResult = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [4, 3],
    });

    this._handleImagePicked(pickerResult);
  };




  _handleImagePicked = async (pickerResult) => {
    let uploadResponse, uploadResult;

    try {
      this.setState({ uploading: true });

      if (!pickerResult.cancelled) {
        uploadResponse = await uploadImageAsync(pickerResult.uri);
        this.setState({ image: pickerResult.uri });
      }
    } catch (e) {

      console.log({ e });
    } finally {
      this.setState({ uploading: false });
    }
  };
 viewcourse=()=> {
    fetch('http://192.168.1.5:3000/viewimage', {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    }).then(res => res.json()).
      then(results => {
        this.setState({ data: results.data })
        console.log(results.data)
      })

  }

  viewimage=()=> {
    fetch('http://192.168.1.5:3000/viewimage', {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    }).then(res => res.json()).
      then(results => {
        this.setState({ data: results.data })
        console.log(results.data)
      })

  }

componentDidMount(){
  this.viewcourse();
 this.viewimage()
}


  render() {
    YellowBox.ignoreWarnings(['Warning: ...']);
  
  console.disableYellowBox = true;
    return (

      <ScrollView style={styles.container}>

        <Image source={{}} style={styles.backgriundImage}>
        </Image>
        <View style={styles.Header}>
          <Text style={styles.text}>About Artificial Intelligence Course</Text>
        </View>
        <View style={styles.inputTwo}>
          <View style={styles.inputThree}>
            <View style={styles.HeaderTwo}>
              <Text style={styles.textTwo}>Course Description</Text>
            </View>
          </View>
          <View >
            <Text >Artificial Intelligence (AI) is a rapidly advancing technology,
            Made possible by the Internet, that may soon have significant impacts on our everyday lives.
            AI traditionally refers to an artificial creation of human-like intelligence that can learn, R
            eason, plan, perceive, or process natural language[1] .
            These traits allow AI to bring immense socioeconomic opportunities,
            while also posing ethical and socio-economic challenges.
              As AI is an Internet enabled technology</Text>

          </View>


          <View style={styles.inputThree}>
            <View style={styles.HeaderTwo}>
              <Text style={styles.textTwo}>Course Tutorials</Text>
            </View>
          </View>

          <FlatList 

keyExtractor={(item,index) => index.toString()}
data={this.state.data}

renderItem={
  ({item})=>(
    <View styles={styles.item}>
      <Text onPress={() => Linking.openURL(item)} style={styles.Link}>{item}</Text>
</View>
  ) }  

/>  

          <View style={styles.courseNameComponent}>
            <View>
              <TextInput
                placeholder="Tutorial                                                            "
                style={styles.input}
                onChangeText={(courselink) => this.setState({ courselink })}
                value={this.state.courselink}
              />
            </View>
          </View>
          <View style={styles.button}>
            <TouchableOpacity
              onPress={this.add} >
              <Text>Add tutorial</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.Header}>
          <Text style={styles.text}>About Artificial Intelligence's Project</Text>
        </View>
        <View style={styles.inputTwo}>
          <View style={styles.inputThree}>
            <View style={styles.HeaderTwo}>
              <Text style={styles.textTwo}>Project Description</Text>
            </View>
          </View>
          <View >
            <Text >Artificial Intelligence (AI) is a rapidly advancing technology,
            Made possible by the Internet, that may soon have significant impacts on our everyday lives.
            AI traditionally refers to an artificial creation of human-like intelligence that can learn, R
            eason, plan, perceive, or process natural language[1] .
            These traits allow AI to bring immense socioeconomic opportunities,
            while also posing ethical and socio-economic challenges.
              As AI is an Internet enabled technology</Text>

          </View>


          <View style={styles.inputThree}>
            <View style={styles.HeaderTwo}>
              <Text style={styles.textTwo}>Project Tutorials</Text>
            </View>
          </View>
          {this._maybeRenderControls()}
          <Image
            source={{ uri: this.state.image }}
            style={{ width: 250, height: 250 }}
          />

          <FlatList horizontal

            keyExtractor={(item, index) => index.toString()}
            data={this.state.data}

            renderItem={
              ({ item }) => (

                <View styles={styles.item}>
                  <Image
                    source={{ uri: item }}
                    style={{ width: 250, height: 250, margin: 5, borderRadius: 30 }}
                  />

                </View>
              )}


          />
        </View>

      </ScrollView>
    );
  }

  constructor(props) {
    super()
    this.state = {
      courselink: '', data: [], file: null, uploading: false

    };
  }
  add = () => {


    fetch('http://192.168.1.6:3000/addcourse', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        courselink: this.state.courselink,

      })
    })
      .then((response) => response.json())
      .then((res) => {
        alert("link uplode")

      })
      .done()
  }


}
const styles = StyleSheet.create({
  container: {
    flex: 5,
    paddingLeft: 5,
    paddingRight: 5,
    //backgroundColor: '#89E1C4',

  },
  containerr: {
    flex: 1,
    marginHorizontal: 1,


  },
  FlatList: {
    height: "10"
  },
  Header: {
    flexDirection: "row",
    justifyContent: "center",
    paddingTop: 7,
    paddingBottom: 7
  },
  HeaderTwo: {
    flexDirection: "row",
    justifyContent: 'flex-start',
    paddingTop: 7,
    paddingBottom: 7
  },
  backgriundImage: {
    flex: 10,
    marginTop: 10,
    resizeMode: 'cover',
    width: '100%',
    justifyContent: 'flex-end',
  },
  button1: {
    flexDirection: 'row',
  },
  button: {
    backgroundColor: '#BFF0E6',
    width: "30%",
    borderRadius: 25,
    height: 40,

    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
    marginBottom: 30,
  },
  input: {
    flexDirection: 'column',
    borderRadius: 5,
    width: 300,
    borderColor: '#A1DED2',
    borderWidth: 2,
    padding: 7,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
    marginBottom: 1,

  },
  inputTwo: {
    flexDirection: 'column',
    borderRadius: 5,
    width: '100%',
    borderColor: '#15908E',
    borderWidth: 2,
    padding: 7,
    alignItems: "flex-start",
    justifyContent: "flex-start",
    marginTop: 10,
    marginBottom: 5,

  },
  inputThree: {
    flexDirection: 'column',
    borderRadius: 10,
    width: '100%',

    padding: 7,
    alignItems: "flex-start",
    justifyContent: "flex-start",
    marginTop: 10,
    marginBottom: 5,
    backgroundColor: '#D1F2EB',

  },

  text: {
    fontWeight: 'bold',
    fontSize: 20,
    color: '#11927F',
    textDecorationLine: 'underline',
    textShadowOffset: { width: 6, height: 6 },

  },
  textTwo: {
    fontWeight: 'bold',

    fontSize: 20,
    color: '#33BBC1',
    textDecorationLine: 'underline',
    textShadowOffset: { width: 6, height: 6 },

  },

  Link: {
    fontSize: 15,
    color: 'blue',
    textDecorationLine: 'underline',
    marginTop: 10,
    alignItems: 'flex-start',
  },
  courseNameComponent: {
    alignItems: 'flex-start',

  },
  scroll: {
    margin: 10
  },
  image: {
    width: 200,
    height: 200,
    marginTop: 30
  }
});


async function uploadImageAsync(uri) {
  let apiUrl = "http://192.168.1.4:3000/image"

  let uriArray = uri.split(".");
  let fileType = uriArray[uriArray.length - 1];

  let formData = new FormData();
  formData.append("photo", {
    uri,
    name: `photo.${fileType}`,
    type: `image/${fileType}`,
  });
  console.log(uri)

  let options = {
    method: "POST",
    body: formData,
    mode: 'cors',
    headers: {
      Accept: "application/json",
      "Content-Type": "multipart/form-data",
    },
  };

  return fetch(apiUrl, options);
}