console.log("Hello from testing.js")
const staticData = require('./staticData');

const data = staticData.getStaticData(); // use as global

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