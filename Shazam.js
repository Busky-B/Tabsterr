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
  // var foo = RNFS.readFile(file, 'utf-8') ;
  // console.log(foo)
  // console.log(typeof(foo));
  // r = new FileReader();
  // let newFile = r.readAsBinaryString(file);
  // console.log(newFile);
  var data = {
    'url' : file,
    'return': 'apple_music',
    'api_token': '0a90d770c2875e2a5569234535ae1a05'
  };

  axios.post('https://api.audd.io/', data).then((res) => {
    console.log(res);
  }).catch((err) => console.log(err));
  
}

if( typeof require !== 'undefined' && require.main === module) {
//    sendShazamRequest();
      // fs.writeFileSync("test_shazam_api", sample);
}  

module.exports = { debug } ;