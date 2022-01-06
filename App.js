import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View , Button, FlatList, Modal, TextInput, Linking, Image, ImageBackground} from 'react-native';
import axios from 'axios';
import { Axios } from 'axios';
import {Link, NavigationContainer, StackActions} from '@react-navigation/native'
import {createNativeStackNavigator} from '@react-navigation/native-stack'
import BugFilled, { BoldOutlined } from '@ant-design/icons';
import MyStack from './MyStack.js';
import SongsterApiMethods from './SongsterrApiMethods.js';
import staticData from './staticData.js';
import logoscraper from './logoscraper.js'
import styles from './styles.js'
import MyButton, {MyButtonSmall} from './myButton.js';

export default function App() {
  const DebugMode = false; // set to false in order to consume api's
  
  const bgImage = require('./img/bgi2.jpg');
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

    FetchLogo(selectedEvent.title + " " + artist.name).then((res) => {
      console.log(`setting songImage too ${res}`); 
      setSongImage(res)
      console.log(`logging songImage: ${songImage}`);

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
    setModalVisible(!modalVisible) ; // Invert state of modalvisibility
    // setSongImage("") ; // reset song image

  }
 
  // FOR DEBUGGING, fills with dummydata automatically
//  useEffect(()=> setStaticData())
  return (

    <View style={styles.container}> 
      <ImageBackground  source={bgImage} style={styles.bgImg} resizeMode='cover'>
        <View style={styles.greetingContainer}>
          {/* <Image 
            source={{uri:'http://coverartarchive.org/release/b8a3f027-cc86-4b00-b045-351882e00e54/6749434866-250.jpg'}} 
            style={{width: 100,height:100, backgroundColor:'red'}} 
          /> */}
          <Text style={styles.greetingCard}>Tabsterr {'\n'}<Text style={{fontSize: 16}}>Search for tab by artist or song</Text></Text>

          <StatusBar style="auto" />

          <TextInput 
            onChangeText={setSearchPhrase}
            value={searchPhrase}
            placeholder="Search . . ."
            placeholderTextColor='#fff'
            style={styles.greetingSearchBar}
            />
            <MyButtonSmall
              title='O K'
              onPress={() => getAndSetEventData()}
            />
            {/* <Image style={{width: 100, height: 100}} source={require('./DebugImage.jpg')}/> */}

          </View>
        <View style={styles.btnContainer}>
          {/* <MyButton 
            title='OKk'
            onPress={() => getAndSetEventData()}
            /> */}
          {/* <Button 
            title='Fill list - Api Call!'
            onPress={() => getAndSetEventData()}
            color="#222"
          /> */}
          {/* <Button
            title='Fill Dummy Data (Debug)'
            onPress={() => setStaticData()}
          /> */}
            <MyButton 
              title='Pressable Dummy Data Data'
              onPress={() => setStaticData()}
              />
        </View>

        {/* {searchHasBeenMade && // becomes visible if bool is true 
          <Text style={{}}>Choose Song:</Text>
        } */}

          <FlatList style={styles.songList} 
          data= {eventData}
          renderItem={({item}) => <Button title={item.title} onPress={() => logEvent(item.id)} color="#c0d1c8" />}
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
                <Text>{songImage}</Text>
                  <Image 
                    style={{width: 100, height: 100, backgroundColor: 'red'}}
                    source={{uri: songImage}}
                    // resizeMode='stretch'
                    />
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