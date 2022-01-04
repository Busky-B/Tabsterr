const { default: axios } = require('axios');

/**
 * Method for getting song-data from the songsterr API
 * 
 * @param {*} searchPattern 
 * if no parameter was sent then method defaults to maiden for
 * for debugging purposes 
 * 
 * @returns an object of found song 
 */
async function getData(searchPattern = "maiden") {

    let obj;
    await axios.get(`http://www.songsterr.com/a/ra/songs.json?pattern=${searchPattern}`)
        .then(x => obj = x)
        .then(() => console.log("Axios finished" + obj))

    return obj;
}

// just a simple check for if file is run as main or if it is called as a module
// if called as main  it will run the log-statement
if( typeof require !== 'undefined' && require.main === module) {
    console.log(getData())
}  
module.exports = {getData} ;
