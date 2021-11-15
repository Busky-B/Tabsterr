console.log("Debugging axios call to api")
const axios = require('axios') ; 


async function test() {
    await axios.get('https://brottsplatskartan.se/api/events/?app=skolprojektBusky&location=lidköping').then(x => console.log(x.data))
    .catch(err => console.log(err)) 
}
test()



//const data = staticData.getStaticData(); // use as global
function getData() {
    // let returnObj;
    // axios.get("https://brottsplatskartan.se/api/events/?app=skolprojektBusky&location=lidköping")
    // .then(x )
    // .catch(err => {console.log(err);})

    // return returnObj;
}
// let data = getData();
// console.log("getting data");
// getData();
// console.log("Data is: \n "+data);
// console.log("trying to acess data")
// const getLinks = () => data.links ;
// const getEvents = () => data.data ;
// const getHeadlines = () => data.data.map((x) => {
//     let pattern = /<strong>(?<content>.*)<\/strong>/g ;
//     var stripped = x.content.match(pattern);
//     if(stripped !== null)
//         return {id : x.id, Headlines : stripped.toString().replace(/(<strong>|<\/strong>|<br \/>)/g, "")};
// });


// console.log(data.links); // for testing the required module

// in order to not flood their api, data was saved here for debug.
// real api is 
// var apiConn = "https://brottsplatskartan.se/api/events/?app=skolprojektBusky&location=lidköping"

