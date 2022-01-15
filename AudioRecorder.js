import * as React from 'react';
import { Text, View, StyleSheet, Button } from 'react-native';
import { Audio } from 'expo-av';
import Shazam from './Shazam.js';

// This module uses the expo-av module in order to do audioplayback and recording. some tweaking has been made but alot of it is from the examples in the expo docs
// The plan was to use this and search for songs via recorded voice -> shazamapi in order to get a song name,
// However shazams api REQUIRES audio in raw data formatted as b64 and there is no easy way of converting standard audio from phone (m4a) to raw data. 
export default function AudioRecorder() {
  const [audioFile, setAudioFile] = React.useState();
  const [fileRecorded, setFileRecorded] = React.useState(false);
  const [recordings, setRecordings] = React.useState([])
  async function playSound() {
    console.log('Loading Sound');
    const { sound } = await Audio.Sound.createAsync(
    //    require('./audio/sample_shazam.mp3')
        props.file 
    );
    setSound(sound);

    console.log('Playing Sound');
    await sound.playAsync(); }

  React.useEffect(() => {
    return sound
      ? () => {
          console.log('Unloading Sound');
          sound.unloadAsync(); }
      : undefined;
  }, [sound]);
  
  const [recording, setRecording] = React.useState();
  const [sound, setSound] = React.useState();
  async function startRecording() {
    try {
      console.log('Requesting permissions..');
      await Audio.requestPermissionsAsync();
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
      }); 
      console.log('Starting recording..');
      const { recording } = await Audio.Recording.createAsync(
         Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY
      );
      setRecording(recording);
      console.log('Recording started');
    } catch (err) {
      console.error('Failed to start recording', err);
    }
  }

  async function stopRecording() {
    console.log('Stopping recording..');
    setRecording(undefined);
    await recording.stopAndUnloadAsync();
    const {sound, status} = await recording.createNewLoadedSoundAsync();
    let newRecordings = [...recordings];
    newRecordings.push({
        sound:sound,
        duration: status.durationMillis,
        file: recording.getURI()
    })
    setRecordings(newRecordings);
    setAudioFile({sound:sound, duration: status.durationMillis, file: recording.getUri})
    const uri = recording.getURI(); 
    console.log('Recording stopped and stored at', uri);
    console.log(`Logging type of uri: `);
    setFileRecorded(true)

    Shazam.debug(recording.getURI()) ;
  }

  function getRecording() {
      return recordings.map((r, index) => {
        // console.log(r.sound);
        // console.log(typeof(r.sound));
        
          return (
             <View>
                 <Button color='#395244' title="play recording" onPress={() => r.sound.replayAsync()}></Button>
             </View> 
          )
      })
  }
  return (
    <View>
      <Button
        color='#395244'
        title={recording ? 'Stop Recording' : 'Start Recording'}
        onPress={recording ? stopRecording : startRecording}
      />
      {getRecording()}
      
    </View>
  );
}