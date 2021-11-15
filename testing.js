console.log("Hello from testing.js")
const { default: axios } = require('axios');

//const data = staticData.getStaticData(); // use as global
async function getData(searchPattern = "maiden") {

    let obj;
    await axios.get(`http://www.songsterr.com/a/ra/songs.json?pattern=${searchPattern}`).then(x => obj = x).then(() => console.log("Axios finished" + obj))

    return obj;
}



if( typeof require !== 'undefined' && require.main === module) {
    console.log(getData())
}  
module.exports = {getData} ;
