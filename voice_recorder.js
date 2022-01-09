import AudioRecorderPlayer, {
     AVEncoderAudioQualityIOSType,
     AVEncodingOption,
     AudioEncoderAndroidType,
     AudioSet,
     AudioSourceAndroidType,
    } from 'react-native-audio-recorder-player';
import React, { useState, useEffect } from 'react';
import {Button, View} from 'react-native'
    

export default function VoiceRecorder(){
    const arp = new AudioRecorderPlayer();
    arp.setSubscriptionDuration(0.09);
    const filePath = 'user_recording.m4a'
    const audioSet = {
        AudioEncoderAndroid: AudioEncoderAndroidType.AAC,
        AudioSourceAndroid: AudioSourceAndroidType.MIC,
        AVEncoderAudioQualityKeyIOS: AVEncoderAudioQualityIOSType.high,
        AVNumberOfChannelsKeyIOS: 2,
        AVFormatIDKeyIOS: AVEncodingOption.aac,
    }

    const [isLoggingIn, setIsLoggingIn] = useState(false);
    const [recordSeconds, setRecordSeconds] = useState(0)
    const [recordingTime, setRecordingTime] = useState('00:00:00')
    const [currentPositionSec, setCurrentPositionSec] = useState(0)
    const [currentDurationSec, setCurrentDurationSec] = useState(0)
    const [playTime, setPlayTime] = useState('00:00:00')
    const [duration, setDuration] = useState('00:00:00')

    const onRecord = async () => {
        const uri = await arp.startRecorder(filePath, audioSet);

        arp.addRecordBackListener((e) => {
            setRecordSeconds(e.current_position)
            setRecordingTime(arp.mmssss(Math.floor(e.current_position)))
        });
        console.log(uri);
    }
    
    const onStop = async () => {
        const result = await arp.stopRecorder();
        arp.removeRecordBackListener();
        setRecordSeconds(0)
        console.log(result);
    }

    return (
        <View style={{flex:1, marginTop: 50}}>
            <Button title='Record' onPress={() => onRecord()}></Button>
            <Button title='Stop Record' onPress={() => onStop()}></Button>
            <Button title='Play Recording'></Button>
        </View>

    );
}
    