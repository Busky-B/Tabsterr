const { default: axios } = require('axios');
// Url used for searching, replace {q} with searchphrase
let url = "https://www.google.com/search?safe=off&site=&tbm=isch&source=hp&q=iron%20maiden%20the%20trooper&oq={q}&gs_l=img" ;

const GetImage = (searchPhrase = "the trooper iron maiden") => {
   searchUrl = url.replace('{q}', searchPhrase.replace(' ', '%20')) 

  const fs = require('fs')
  const staticData = fs.readFileSync('staticLogoHtml.txt', 'utf-8') 
   // make request
    // axios.get(searchUrl).then((res) => {
    //     fs.writeFile('staticLogoHtml.txt', res.data, err => {
    //         if(err) {
    //             console.log(err)
    //             return
    //         }
    //     })
    // })
   // Extract base64image
    filData = staticData.replace(/>/g, "$&\n")
    filData = filData.match();

    console.log(filData) ;

   // return image
};




if( typeof require !== 'undefined' && require.main === module) {
    GetImage()
}


