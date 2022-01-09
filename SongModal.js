import React, {  useEffect, useState } from 'react';
import { Text, View , Button,  Modal, Linking, Image, StyleSheet} from 'react-native';
import * as Animatable from 'react-native-animatable';
import MyButton from './myButton.js';
import styles from './styles.js';
export default function SongModal(props) {
    const {data, modalVisible, imageLoading, songImage, closeModalFunction} = props;
  return (
       <Modal style={styles.modal}
       animationType="fade"
       transparent={true}
       visible={modalVisible}
       onRequestClose={() => {setModalVisible(!modalVisible)}}
       >
            <View style={styles.modal}>
              <View style={styles.modalBox}>
                <View style={styles.modalBtnView}>
                  <Button title="Choose different song" onPress={() => closeModalFunction()} color='#222'/>
                </View>
                <View style= {{flex: 1}}>
                  <Text style={{ fontSize: 22 }}>{data.title}</Text>
                  <Text>{data.artistName}</Text>
                </View>
                <View style={styles.modalImage}>
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
                  <MyButton title='Go to songtab' onPress={() => Linking.openURL(`http://www.songsterr.com/a/wa/song?id=${data.id}`)}></MyButton>
                </View>
              </View>
            </View>
          </Modal>
                );
}

const modalStyles = StyleSheet.create({

})
