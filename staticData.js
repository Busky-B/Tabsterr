
const getStaticData = () => {
    let arr = [
        {
            "id": 338,
            "type": "Song",
            "title": "The Trooper",
            "artist": {
              "id": 139,
              "type": "Artist",
              "nameWithoutThePrefix": "Iron Maiden",
              "useThePrefix": false,
              "name": "Iron Maiden"
            },
            "chordsPresent": false,
            "tabTypes": [
              "PLAYER",
              "TEXT_GUITAR_TAB",
              "TEXT_BASS_TAB"
            ]
          },
          {
            "id": 482,
            "type": "Song",
            "title": "Hallowed Be Thy Name",
            "artist": {
              "id": 139,
              "type": "Artist",
              "nameWithoutThePrefix": "Iron Maiden",
              "useThePrefix": false,
              "name": "Iron Maiden"
            },
            "chordsPresent": true,
            "tabTypes": [
              "PLAYER",
              "TEXT_GUITAR_TAB",
              "CHORDS",
              "TEXT_BASS_TAB"
            ]
          },
          {
            "id": 10046,
            "type": "Song",
            "title": "Phantom Of The Opera",
            "artist": {
              "id": 139,
              "type": "Artist",
              "nameWithoutThePrefix": "Iron Maiden",
              "useThePrefix": false,
              "name": "Iron Maiden"
            },
            "chordsPresent": false,
            "tabTypes": [
              "PLAYER",
              "TEXT_GUITAR_TAB",
              "TEXT_BASS_TAB"
            ]
          },
          {
            "id": 10083,
            "type": "Song",
            "title": "Wasted Years",
            "artist": {
              "id": 139,
              "type": "Artist",
              "nameWithoutThePrefix": "Iron Maiden",
              "useThePrefix": false,
              "name": "Iron Maiden"
            },
            "chordsPresent": false,
            "tabTypes": [
              "PLAYER",
              "TEXT_GUITAR_TAB",
              "TEXT_BASS_TAB"
            ]
          },
          {
            "id": 10074,
            "type": "Song",
            "title": "Powerslave",
            "artist": {
              "id": 139,
              "type": "Artist",
              "nameWithoutThePrefix": "Iron Maiden",
              "useThePrefix": false,
              "name": "Iron Maiden"
            },
            "chordsPresent": false,
            "tabTypes": [
              "PLAYER",
              "TEXT_GUITAR_TAB",
              "TEXT_BASS_TAB"
            ]
          },
          {
            "id": 10027,
            "type": "Song",
            "title": "Wasting Love",
            "artist": {
              "id": 139,
              "type": "Artist",
              "nameWithoutThePrefix": "Iron Maiden",
              "useThePrefix": false,
              "name": "Iron Maiden"
            },
            "chordsPresent": false,
            "tabTypes": [
              "PLAYER",
              "TEXT_GUITAR_TAB",
              "TEXT_BASS_TAB"
            ]
          }
    ]

    return arr ;
}


module.exports = {getStaticData} ;