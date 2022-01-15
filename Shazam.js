// import react from 'react' ;
// import * as rn from 'react-native';
// import * as fs from 'react-native-fs';
// const RNFS = require('react-native-fs').default;
// const fs = require('fs');
// const sample = fs.readFileSync('./audio/sample_shazam.mp3').toString('base64') ;
var axios = require("axios").default;
// var options = {
//   method: 'POST',
//   url: 'https://shazam.p.rapidapi.com/songs/detect',
//   headers: {
//     'content-type': 'text/plain',
//     'x-rapidapi-host': 'shazam.p.rapidapi.com',
//     'x-rapidapi-key': 'bf49bfdde6msh94dc54cbd4c642ap1db1dfjsnbceecd0500eb'
//   },
//   data: sample,
  
// };

const sendShazamRequest = () => {
    axios.request(options).then(function (response) {
        console.log(response.data);
    }).catch(function (error) {
        console.log(error.message);
    });
}
const convertAudio = () => {
    const reader = new FileReader();
    reader.readAsDataURL()
}

const debug = file => {
  console.log("HELLO FROM SHAZAM");
  console.log(typeof(file));
  
}

/**
 * This method is for using the audd api instead of shazam for music recognition, however it is behind a paywall
 *  and i cant seem to get access to a trial again. I got it to work with sending curl commands for a little bit in the beginning of the project but as stated, paywall.
 * Therefore i decided to create the method since it is pretty straight forward, eventhough the functionality will not be available in the app.
 * All it would take is for me to send the audiofile from the AudioRecorder.js component to this method.
 * 
 *  Most of the code is slightly modified examples from the Audd-api docs
 * @param {audiofile} audioFile 
 */
const auddApi = audioFile=> {
  // in the case of sending audiofile as a string with url location of file
  var data = {
    'url' : audioFile,
    'return': 'apple_music',
    'api_token': '0a90d770c2875e2a5569234535ae1a05'
  };
  axios.post('https://api.audd.io/', data).then((res) => {
    console.log(res);
  }).catch((err) => console.log(err));

  // in the case of sending local file within the request
  var data = {
    'api_token': 'your api token',
    'file': audioFile,
    'return': 'apple_music,spotify',
  };

  axios({
    method: 'post',
    url: 'https://api.audd.io/',
    data: data,
    headers: { 'Content-Type': 'multipart/form-data' },
  })
  .then((response) => {
    console.log(response);
  })
  .catch((error) =>  {
    console.log(error);
  });
}

if( typeof require !== 'undefined' && require.main === module) {
//    sendShazamRequest();
      // fs.writeFileSync("test_shazam_api", sample);
}  

module.exports = { debug } ;