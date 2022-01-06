const fs = require('fs');
const sample = fs.readFileSync('./audio/sample_shazam.mp3').toString('base64') ;
var axios = require("axios").default;
var options = {
  method: 'POST',
  url: 'https://shazam.p.rapidapi.com/songs/detect',
  headers: {
    'content-type': 'text/plain',
    'x-rapidapi-host': 'shazam.p.rapidapi.com',
    'x-rapidapi-key': 'bf49bfdde6msh94dc54cbd4c642ap1db1dfjsnbceecd0500eb'
  },
  data: sample,
  
};

const sendShazamRequest = () => {

    axios.request(options).then(function (response) {
        console.log(response.data);
    }).catch(function (error) {
        // console.error(error);
        console.log(error.message);
    });
}
const convertAudio = () => {
    const reader = new FileReader();
    reader.readAsDataURL()
}

if( typeof require !== 'undefined' && require.main === module) {
//    sendShazamRequest();
      fs.writeFileSync("test_shazam_api", sample);
}  