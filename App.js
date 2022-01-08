import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View , Button, FlatList, Modal, TextInput, Linking, Image, ImageBackground, TouchableOpacity, Animated} from 'react-native';
import axios from 'axios';
import { Axios } from 'axios';
import {Link, NavigationContainer, StackActions} from '@react-navigation/native'
import {createNativeStackNavigator} from '@react-navigation/native-stack'
import MyStack from './MyStack.js';
import SongsterApiMethods from './SongsterrApiMethods.js';
import staticData from './staticData.js';
import logoscraper from './logoscraper.js'
import styles from './styles.js'
import MyButton, {MyButtonSmall} from './myButton.js';
import * as Animatable from 'react-native-animatable';
import {Icon} from 'react-native-elements'
import VoiceRecorder from './voice_recorder.js';

export default function App() {
  const DebugMode = false; // set to false in order to consume api's
  
  const bgImage = require('./img/bgi2.jpg');

  // determines wether image is loading or not
  const [imageLoading, setImageLoading] = useState(false);

  // Array where searchresults I.E songdata is saved
  const [eventData, setEventData] = useState([]) ;

  // For checking if modal is visible or not
  const [modalVisible, setModalVisible] = useState(false);

  // checks if image was found
  const [songImage, setSongImage] = useState("Song URI")
  // Sets the content of the modal (selected song)
  const [modalContent, setModalContent] = useState({id:"", title : "", type : ""});

  // State where the name of artist is saved, needed to be in a different one due to 
  // layers of json response
  const [modalSubContent, setModalSubContent] = useState({name: ""});

  // The searchphrase to be used
  const [searchPhrase, setSearchPhrase] = useState("") ;

  // state for checking if an initial search has been made or not, elements might
  // use this to determine if they should be displayed or not.
  const [searchHasBeenMade, setSearchHasBeenMade] = useState(false) ;

  const getAndSetEventData = () => {
    SongsterApiMethods.getData(searchPhrase).then(x => {
      console.log(x.data);
      setEventData(x.data)
    })
  }
  const setStaticData = () => {
    setSearchHasBeenMade(true)
    setEventData(staticData.getStaticData());
  }

  const logEvent = (e) => {
    let selectedEvent = eventData.find(x => x.id === e);
    let artist = selectedEvent.artist;

    delete selectedEvent.artist
    setModalContent(selectedEvent);
    setModalSubContent(artist);
    setModalVisible(!modalVisible);
    setImageLoading(!imageLoading);
    FetchLogo(selectedEvent.title + " " + artist.name).then((res) => {
      console.log(`setting songImage too ${res}`); 
      setSongImage(res)
      console.log(`logging songImage: ${songImage}`);

    }).finally(() => {
      setImageLoading(false);
    });
    // setSongImage('http://coverartarchive.org/release/b8a3f027-cc86-4b00-b045-351882e00e54/6749434866-250.jpg')

    // eventData.push(artist)

  }
  const FetchLogo = async (searchString) => {
    console.log(`RUN: FetchLogo\n searchstring: [${searchString}]`);
    
    // const response =   ( DebugMode ? require('./img/DebugImage.jpg') : await logoscraper.GetLogo(searchString))
    const response = await logoscraper.GetLogo(searchString) ;
    console.log(`Logging response: [${response}]`);
    return response; 
  }
  const CloseModal = () => {
    console.log(modalSubContent.name);
    setModalVisible(!modalVisible) ; // Invert state of modalvisibility
    // setSongImage("") ; // reset song image

  }
 
  // FOR DEBUGGING, fills with dummydata automatically
//  useEffect(()=> setStaticData())
  return (

    <View style={styles.container}> 
      <ImageBackground  source={bgImage} style={styles.bgImg} resizeMode='cover'>
        <View style={styles.greetingContainer}>
          <Text style={styles.greetingCard}>Tabsterr {'\n'}<Text style={{fontSize: 16}}>Search for tab by artist or song</Text></Text>
          <StatusBar style="auto" />
          <View style={styles.greetingSearchContainer}>
            <TextInput 
              onChangeText={setSearchPhrase}
              value={searchPhrase}
              placeholder="Search . . ."
              placeholderTextColor='#fff'
              style={styles.greetingSearchBar}
              />
            <View style={styles.greetingSearchBarIconContainer}>
              <Icon
                type='evilicon'
                name='search'
                color='#fff'
              />
            </View>
          </View>
            <MyButtonSmall
              title='OK'
              onPress={() => getAndSetEventData()}
            />

          </View>
        <View style={styles.btnContainer}>
            <MyButton 
              title='Pressable Dummy Data Data'
              onPress={() => setStaticData()}
              />
        </View>
          <FlatList style={styles.songList} 
          data= {eventData}
          renderItem={({item}) => <MyButton title={item.title} onPress={() => logEvent(item.id)} color="#c0d1c8" />}
          />
          <Modal style={styles.modal}
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {setModalVisible(!modalVisible)}}
            >
            <View style={styles.modal}>
              <View style={styles.modalBox}>
                <View style={styles.modalBtnView}>
                  <Button title="Choose different song" onPress={() => CloseModal()} color='#222'/>
                </View>
                <View style= {{flex: 1}}>
                  {/* <Text >Id: {modalContent.id}</Text> */}
                  <Text style={{ fontSize: 22 }}>{modalContent.title}</Text>
                  <Text>Artist: {modalContent.artist}</Text>
                  <Text>{modalSubContent.name}</Text>
                </View>
                <View style={styles.modalImage}>
                {/* <Text>{songImage}</Text> */}
                {imageLoading &&

                  <Animatable.Text
                  animation="slideInDown"
                  iterationCount="infinite"
                  direction="alternate"
                  >
                  Loading . . .
                </Animatable.Text> 
                }
                {!imageLoading &&
                
                  <Image 
                  style={{width: 300, height: 300}}
                  source={{uri: songImage}}
                  />
                }
                </View>
                <View style={styles.modalFooter}>
                  <Text style={styles.myBtn} onPress={() => Linking.openURL(`http://www.songsterr.com/a/wa/song?id=${modalContent.id}`)}>Go to songtab</Text>
                </View>
              </View>
            </View>
          </Modal>
        </ImageBackground>
        </View>
      );
}