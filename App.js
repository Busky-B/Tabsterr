import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View , Button, FlatList, Modal, TextInput, Linking, Image} from 'react-native';
import axios from 'axios';
import { Axios } from 'axios';
import {Link, NavigationContainer, StackActions} from '@react-navigation/native'
import {createNativeStackNavigator} from '@react-navigation/native-stack'
import BugFilled, { BoldOutlined } from '@ant-design/icons';
import MyStack from './MyStack.js';
import SongsterApiMethods from './SongsterrApiMethods.js';
import staticData from './staticData.js';
import styles from './styles.js'

export default function App() {
  // Array where searchresults I.E songdata is saved
  const [eventData, setEventData] = useState([]) ;

  // For checking if modal is visible or not
  const [modalVisible, setModalVisible] = useState(false);

  // checks if image was found
  const [songImage, setSongImage] = useState({uri : ''})
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
    console.log(`Id: ${e}`);
    let selectedEvent = eventData.find(x => x.id === e);
    console.log(selectedEvent);
    let artist = selectedEvent.artist;

    delete selectedEvent.artist
    setModalContent(selectedEvent);
    setModalSubContent(artist);
    setModalVisible(!modalVisible);

    // eventData.push(artist)

  }
  // FOR DEBUGGING, fills with dummydata automatically
//  useEffect(()=> setStaticData())
  return (
      
      <View style={styles.container}>

        { songImage.uri.length !== 0 &&
          <Image 
          source={songImage}
          />
        }      

        <Text style={{ fontSize: 22, marginTop: 125, marginBottom : 50, backgroundColor: "#ddd", padding: 30, borderRadius: 15}}>Tabsterr {'\n'}<Text style={{fontSize: 16}}>Search for tab by artist or song</Text></Text>
        <StatusBar style="auto" />
        <TextInput 
          onChangeText={setSearchPhrase}
          value={searchPhrase}
          placeholder="Search"
          style={{width: '50%', backgroundColor :"#aaa", borderRadius:25, color:"blue", padding:5, textAlign: "center", margin: 20, color : 'white'}}
        />

        <View style={styles.btnContainer}>
          <Button 
            title='Fill list - Api Call!'
            onPress={() => getAndSetEventData()}
            color="#222"
            />
          <Button
            title='Fill Dummy Data (Debug)'
            onPress={() => setStaticData()}
            />
        </View>

        {searchHasBeenMade && // becomes visible if bool is true 
          <Text style={{margin: 15}}>Choose Song:</Text>
        }

        <FlatList style={{margin: 10, paddingBottom : 10}} 
        data= {eventData}
        renderItem={({item}) => <Button title={item.title} onPress={() => logEvent(item.id)} color="#666" />}
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
                <Button title="Choose different song" onPress={() => setModalVisible(!modalVisible)} color='#222'/>
              </View>
              <View style= {{flex: 10}}>
                {/* <Text >Id: {modalContent.id}</Text> */}
                <Text style={{ fontSize: 22 }}>{modalContent.title}</Text>
                <Text>Artist: {modalContent.artist}</Text>
                <Text>{modalSubContent.name}</Text>
              </View>
              <View style={styles.modalFooter}>
                <Text style={styles.myBtn} onPress={() => Linking.openURL(`http://www.songsterr.com/a/wa/song?id=${modalContent.id}`)}>Go to songtab</Text>
              </View>
            </View>
          </View>
        </Modal>
        </View>
      );
}