console.log("Hello from testing.js")
const staticData = require('./staticData');
const { default: axios } = require('axios');

//const data = staticData.getStaticData(); // use as global
function getData() {
    // let returnObj;
    // axios.get("https://brottsplatskartan.se/api/events/?app=skolprojektBusky&location=lidköping")
    // .then(x )
    // .catch(err => {console.log(err);})

    // return returnObj;
}
// let data = getData();
console.log("getting data");
getData();
console.log("Data is: \n "+data);
console.log("trying to acess data")
const getLinks = () => data.links ;
const getEvents = () => data.data ;
const getHeadlines = () => data.data.map((x) => {
    let pattern = /<strong>(?<content>.*)<\/strong>/g ;
    var stripped = x.content.match(pattern);
    if(stripped !== null)
        return {id : x.id, Headlines : stripped.toString().replace(/(<strong>|<\/strong>|<br \/>)/g, "")};
});


// console.log(data.links); // for testing the required module

// in order to not flood their api, data was saved here for debug.
// real api is 
// var apiConn = "https://brottsplatskartan.se/api/events/?app=skolprojektBusky&location=lidköping"


//kollar om denna fil körs som main eller om den används av en annan module
if( typeof require !== 'undefined' && require.main === module)
    console.log(getHeadlines());


module.exports = {getLinks, getEvents, getHeadlines} ;