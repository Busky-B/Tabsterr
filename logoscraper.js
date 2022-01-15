const { default: axios } = require('axios');
let url = "https://musicbrainz.org/search?query={q}&type=release&method=indexed" ;

/**
 *  Gets an image from musicbrainz.org via webscraping
 * @param {String} searchPhrase  // used for the query
 * @returns mbid string used for calling the api for specific coverart
 */
const GetImage = async (searchPhrase = "diary of jane") => {
    searchUrl = url.replace('{q}', searchPhrase.replace(/ /g, '+')) 

  const response = await axios.get(searchUrl).then((res) => {
      // Filtering the raw htmldata 
        filData = res.data.replace(/>/g, "$&\n") // inserts newline after every closingtag
        filData = filData.match(/.*\/release\/(.)*\/cover-art/); // filters for /release/{MBID KEY}/cover-art
        songMbid = filData[0].match(/release\/(.*)\//) // had to to it again for some reason, couldnt figure out why
        return songMbid[1] ;
        // regex in js doesnt work like im used to, even though the response came as an array with alot of matches,
        // the second item was always the right one, therefore im just returning that index
        // since it works i did not want to tamper with it further and left it as is !
    })
    return response ;
};
/**
 * Method that calls api for specific coverart, identyfied via mbid (which is the api's unique id) 
 * @param {string} mbid 
 * @returns Uri for coverart which can then be used within an <Image> component
 */
const GetImageByMbid = async (mbid) => {
    const response = axios.get('http://www.coverartarchive.org/release/' + mbid.toString()+'/')
        .then((res) => {
            images = res.data.images;
            return images[0].thumbnails.small ;
        })
        .catch((err) => {
            console.log("ERROR")
            console.log(err) ;
            return err;
        })
        return response;
}
/**
* exposed as the usable method by the module,
     this is what other modules calls when using logoscraper.js 
 * @param {string} searchPhrase 
 * @returns  image uri
 */
const GetLogo = async (searchPhrase) => {
    const data = await GetImage(searchPhrase);
    const response = await GetImageByMbid(data);  // using async promises
    return response
}

const debug = async () => {
    axios.get("http://coverartarchive.org/release/b8a3f027-cc86-4b00-b045-351882e00e54/6749434866-250.jpg")
        .then((res) => {
            console.log(res.data);
        })
}
// For testing, Run this with "node logoscraper.js" from CLI to test if module is working
if( typeof require !== 'undefined' && require.main === module) {
    debug();
}
module.exports = {GetLogo} ;
