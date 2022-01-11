import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View , Button, FlatList, Modal, TextInput, Linking, Image, ImageBackground, TouchableOpacity, Animated} from 'react-native';
import SongsterApiMethods from './SongsterrApiMethods.js';
import staticData from './staticData.js';
import logoscraper from './logoscraper.js'
import styles from './styles.js'
import MyButton, {MyButtonSmall} from './myButton.js';
import {Icon} from 'react-native-elements'
import SongModal from './SongModal.js';
import AudioRecorder from './AudioRecorder.js';


export default function App() {
  const bgImage = require('./img/bgi2.jpg'); // path to background image

  // Array where searchresults I.E songdata is saved
  const [eventData, setEventData] = useState([]) ;

  // determines wether image is loading or not
  const [imageLoading, setImageLoading] = useState(false);

  // For checking if modal is visible or not
  const [modalVisible, setModalVisible] = useState(false);

  // checks if image was found
  const [songImage, setSongImage] = useState("Song URI")

  // The searchphrase to be used
  const [searchPhrase, setSearchPhrase] = useState("") ;

  // state for checking if an initial search has been made or not, visual components might
  // use this to determine if they should be displayed or not.
  const [searchHasBeenMade, setSearchHasBeenMade] = useState(false) ;

  // new state for songs that get displayed in modal
  const [songData, setSongData] = useState({id:"", title: "", type: "", artistName: ""});

  /**
   * Makes a call to songsterr api witht the searchphrase and returns songs
   */
  const getAndSetEventData = () => {
    SongsterApiMethods.getData(searchPhrase).then(x => {
      // console.log(x.data);
      setEventData(x.data);
    });
  }
  /**
   * Method for debugging, Gets some static data of songs from a file
   */
  const setStaticData = () => {
    setSearchHasBeenMade(true)
    setEventData(staticData.getStaticData());
  }

  /**
   * Selects the song clicked in the list on screen, calls and fills the modal 
   * 
   * @param {Event} e  the event called from the flatlist when an item is clicked
   */
  const selectSong = (e) => {
    let selectedEvent = eventData.find(x => x.id === e);
    let artist = selectedEvent.artist;

    setSongData({id: selectedEvent.id, title: selectedEvent.title, type: selectedEvent.type, artistName: artist.name});
    setModalVisible(!modalVisible); // Toggle the modal
    setImageLoading(!imageLoading); // toggle loading animation for image

    // Gets coverart for modal
    FetchLogo(selectedEvent.title + " " + artist.name).then((res) => {
      setSongImage(res)
    }).finally(() => {
      setImageLoading(false);
    });
  }
  /**
   *  Fetches a logo using Logoscraper.js
   *  @param {String} searchString  string to be searched for, concatted by the artist and song name
   */
  const FetchLogo = async (searchString) => {
    console.log("SHOW ME: " + searchString);
    const response = await logoscraper.GetLogo(searchString) ;
    return response; 
  }

  const CloseModal = () => {
    setModalVisible(!modalVisible) ; // Invert state of modalvisibility
  }
  
  return (

    <View style={styles.container}> 
      <View >
        <AudioRecorder />
      </View>
      <ImageBackground  source={bgImage} style={styles.bgImg} resizeMode='cover'>
        <View style={styles.greetingContainer}>
          <View style={styles.greetingCardContainer} >

            <View style={{position:'absolute', right: 50, top: 20}}>
              <Icon name='music' type='font-awesome'color='white' />
            </View>
            <Text style={styles.greetingCard}>Tabsterr
            {'\n'}<Text style={{fontSize: 16}}>Search for tab by artist or song</Text>
            </Text>
          </View>
          <StatusBar style="auto" />
            <View style={styles.greetingSearchContainer}>
              <TextInput 
                onChangeText={setSearchPhrase}
                value={searchPhrase}
                placeholder="Search . . ."
                placeholderTextColor='#fff'
                style={styles.greetingSearchBar}
                />
            </View>
            <TouchableOpacity style={styles.greetingSearchBarIcon} onPress={getAndSetEventData}>
                <Icon
                  type='evilicon'
                  name='search'
                  color='#fff'
                  />
            </TouchableOpacity>
          </View>
	  <View style={styles.songListContainer}>
		  <FlatList style={styles.songList} 
		  data= {eventData}
		  renderItem={({item}) => 
		  <View style={{margin: 2}}>
		    <MyButton title={item.title} onPress={() => selectSong(item.id)}  />
		  </View>
		  }
		  />
	  </View>
          {modalVisible && 
            <SongModal data={songData} modalVisible={modalVisible} imageLoading={imageLoading} songImage={songImage} closeModalFunction={CloseModal}/>
          }
        </ImageBackground>
        </View>
      );
}
