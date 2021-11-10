import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, View , Button, FlatList, Modal} from 'react-native';
import axios from 'axios';
import { Axios } from 'axios';
import xml2js from 'xml2js';


export default function App() {
  const testing = require('./testing.js');
  const [eventData, setEventData] = useState(testing.getHeadlines()) ;
  const [modalVisible, setModalVisible] = useState(false);
  const [modalContent, setModalContent] = useState({id:"", Headlines: ""})
  async function test(){
    console.log('Testing function called')
    axios.get('http://api.missatsamtal.se/?action=search&format=json&number=0722055511')
      .then(res => {
        console.log(res.data);
      })
    

    // axios.get('https://brottsplatskartan.se/sida/api/events/?location=lidköping&app=skolprojektBusky').then(res => {
    //   console.log(res.data)
    // })
  }
  const displayEventData = () => {
    //console.log(eventData[0].id);
    console.log(eventData.map(x => x.id));
  }

  const logEvent = (e) => {
    console.log(`Id: ${e}`);
    let selectedEvent = eventData.find(x => x.id === e);
    console.log(selectedEvent);

    setModalContent(selectedEvent);
    setModalVisible(!modalVisible);
  }

  return (
    <View style={styles.container}>
      <Text>Open up App.js to start working on your app!</Text>
      <StatusBar style="auto" />
      <Button 
        title='Click Me'
        onPress={() => displayEventData()}
      />
      <FlatList 
      data= {eventData}
      renderItem={({item}) => <Button title={item.id} onPress={() => logEvent(item.id)}/>}
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
            <Text>{modalContent.Headlines}</Text>
          </View>
        </View>
      </Modal>
      <Text>STUFF GOES HERE -- {modalContent.id + modalContent.Headlines}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
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
