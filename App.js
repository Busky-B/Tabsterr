import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, View , Button, FlatList, Modal, TextInput} from 'react-native';
import axios from 'axios';
import { Axios } from 'axios';
import xml2js from 'xml2js';
import {NavigationContainer, StackActions} from '@react-navigation/native'
import {createNativeStackNavigator} from '@react-navigation/native-stack'
import MyStack from './MyStack.js';
import testing from './testing.js';
import staticData from './staticData.js';
async function getWithAxios(){
  return await testing.getData() ;
}
export default function App() {
  const testing = require('./testing.js');
  const [eventData, setEventData] = useState([]) ;
  const [modalVisible, setModalVisible] = useState(false);
  const [modalContent, setModalContent] = useState({id:"", title : "", type : ""});
  const [modalSubContent, setModalSubContent] = useState({name: ""});
  const [searchPhrase, setSearchPhrase] = useState("") ;

  const getAndSetEventData = () => {
    // test if a searchstring has been supplied or if the default "maiden" should be searched for

    testing.getData(searchPhrase).then(x => {
      console.log(x.data);
      setEventData(x.data)
    })
  }
  const setStaticData = () => {
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
  }

  return (
    <NavigationContainer>
      <MyStack/>
      <View style={styles.container}>
        <Text>Enter searchphrase with artist/band and click button</Text>
        <StatusBar style="auto" />
        <TextInput 
          onChangeText={setSearchPhrase}
          value={searchPhrase}
          style={{backgroundColor :"#222", borderRadius:25, padding:5, textAlign: "center", margin: 20}}
        />
        <Button 
          title='Fill list - Api Call'
          onPress={() => getAndSetEventData()}
          color="#222"
        />
        <Button
          title='Fill Dummy Data'
          onPress={() => setStaticData()}
        />
        <FlatList 
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
            <Button title="X" onPress={() => setModalVisible(!modalVisible)}/>
            <View style={styles.modalBox}>
              <Text>{modalContent.id}</Text>
              <Text>{modalContent.title}</Text>
              <Text>{modalContent.type}</Text>
              <Text>{modalContent.artist}</Text>
              <Text>{modalSubContent.name}</Text>
            </View>
          </View>
        </Modal>
        <Text>STUFF GOES HERE -- {modalContent.id + modalContent.Title}</Text>
      </View>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ccc',
    alignItems: 'center',
    justifyContent: 'center',
  },
  modal: {
    flex:0.7,
    backgroundColor: 'green',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center'
  },
  modalBox: {
    flex: 1,
    backgroundColor: '#fff'
  }
});
