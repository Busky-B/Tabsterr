import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View , Button, FlatList, Modal, TextInput, Linking} from 'react-native';
import axios from 'axios';
import { Axios } from 'axios';
import {Link, NavigationContainer, StackActions} from '@react-navigation/native'
import {createNativeStackNavigator} from '@react-navigation/native-stack'
import BugFilled, { BoldOutlined } from '@ant-design/icons';
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
  // FOR DEBUGGING, fills with dummydata automatically
//  useEffect(()=> setStaticData())
  return (
      
      <View style={styles.container}>
        <Text style={{ fontSize: 22, marginTop: 125, marginBottom : 50, backgroundColor: "#ddd", padding: 30, borderRadius: 15}}>Enter searchphrase with artist/band and click button</Text>
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
            title='Fill Dummy Data'
            onPress={() => setStaticData()}
            />
        </View>

        <Text>Choose Song:</Text>
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
            <Button title="X" onPress={() => setModalVisible(!modalVisible)}/>
            <View style={styles.modalBox}>
              <Text >Id: {modalContent.id}</Text>
              <Text style={{ fontSize: 22 }}>{modalContent.title}</Text>
              <Text>Artist: {modalContent.artist}</Text>
              <Text>{modalSubContent.name}</Text>
              <Text style={{color: 'blue'}} onPress={() => Linking.openURL(`http://www.songsterr.com/a/wa/song?id=${modalContent.id}`)}>Go to songtab</Text>
            </View>
          </View>
        </Modal>
        </View>
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
    flex:1,
    backgroundColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center'
  },
  modalBox: {
    flex: 1,
    width: '50%',
    backgroundColor: '#fff'
  },
  myBtn: {
    backgroundColor: '#fff',
    padding: 10,
    margin: 10,
    borderBottomEndRadius: 20,
    borderBottomStartRadius: 20

  },
  myBtnHover: {
    backgroundColor: '#000'

  },
  btnContainer: {
    flex:0.3,
    flexDirection: 'row',
    padding: 15,

  },
  
});
