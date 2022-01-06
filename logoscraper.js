const { default: axios } = require('axios');
// Url used for searching, replace {q} with searchphrase
// let url = "https://www.google.com/search?safe=off&site=&tbm=isch&source=hp&q=iron%20maiden%20the%20trooper&oq={q}&gs_l=img" ;
let url = "https://musicbrainz.org/search?query={q}&type=release&method=indexed" ;

const GetImage = async (searchPhrase = "diary of jane") => {
    searchUrl = url.replace('{q}', searchPhrase.replace(/ /g, '+')) 
    console.log("RUN: GetImage");

  const response = await axios.get(searchUrl).then((res) => {
        filData = res.data.replace(/>/g, "$&\n")
        filData = filData.match(/.*\/release\/(.)*\/cover-art/);
        
        songMbid = filData[0].match(/release\/(.*)\//)
        
        return songMbid[1] ;  
        
    })
    return response ;
};

const GetImageByMbid = async (mbid) => {
    console.log("RUN: GetImageByMbid");
    const response = axios.get('http://www.coverartarchive.org/release/' + mbid.toString()+'/')
        .then((res) => {
            images = res.data.images;
            // console.log(images[0].thumbnails.small) ;
            return images[0].thumbnails.small ;
        })
        .catch((err) => {
            console.log("ERROR")
            console.log(err) ;
            return err;
        })
        return response;
}

const GetLogo = async (searchPhrase) => {
    const data = await GetImage(searchPhrase);
    const response = await GetImageByMbid(data); 
    console.log("Returning: GetLogo\n res:" + response);
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
    // console.log("Main start");
    // GetImage().then((res) => {
    //     console.log("Sending below to mbidfunc");
    //     console.log(res)
    //     GetImageByMbid(res).then((res) => {
    //         console.log("Output from mbidfunc");      
    //         console.log(res);
    //     })
    // })
    // GetLogo("afterlife avenged sevenfold").then((res) => console.log(res));
    debug();
}

module.exports = {GetLogo} ;
