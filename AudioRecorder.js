import * as React from 'react';
import { Text, View, StyleSheet, Button } from 'react-native';
import { Audio } from 'expo-av';

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
    setFileRecorded(true)


  }

  function getRecording() {
      return recordings.map((r, index) => {
          return (
             <View>
                 <Button title="play recording" onPress={() => r.sound.replayAsync()}></Button>
             </View> 
          )
      })
  }
  return (
    <View>
      <Button
        title={recording ? 'Stop Recording' : 'Start Recording'}
        onPress={recording ? stopRecording : startRecording}
      />
      {getRecording()}
      
    </View>
  );
}