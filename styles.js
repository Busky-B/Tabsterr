import { StyleSheet } from 'react-native'
const styles = StyleSheet.create({
  bgImg: {
    // width: '100%',
    flex: 1,
    justifyContent: 'center',
  },
  songList: {
    flex:1,
    margin: 10, 
    paddingBottom : 10, 
    paddingHorizontal: 20, 
    // backgroundColor: '#fff',
  },
  greetingContainer : {
    flex: 1,
    margin:50,
    marginTop:125,
  },
  greetingSearchContainer: {
    flex: 1,
    flexDirection: 'row', 
    borderBottomWidth: 1,
    borderColor: '#395244',
    borderWidth: 2,
    backgroundColor: 'transparent',
    borderRadius:25, 

  },
  greetingSearchBarIconContainer: {
    flex: 1,
    alignSelf: 'center',
    // position:'absolute', 
    // right:11, 
    // top: 11
  },
  greetingSearchBar: {
    flex:3,
    // backgroundColor :"#aaa", 
    // backgroundColor: '#c0d1c8',
    borderRadius:25, 
    // color:"blue", 
    padding:5, 
    // textAlign: "center", 
    paddingHorizontal: 40,
    // margin: 20, 
    // color : '#000',
    color: '#fff',
    elevation: 3,
    
  },
  greetingCard: { 
    fontSize: 22,
    // marginBottom : 50, 
    backgroundColor: "#9ab5a7c0", 
    padding: 30, 
    borderRadius: 15,
    elevation: 3,
    borderColor: '#395244',
    borderWidth: 2,
    marginBottom: 20,
  },
  container: {
    flex: 1,
    flexDirection: 'column',
    // backgroundColor: '#ccc',
    // backgroundColor: '#222',
    backgroundColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
  },
  modal: {
    flex:1,
    backgroundColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
  },
  modalFooter: {
    marginBottom: 20

  },
  modalBox: {
  //  flex: 1,
    width: '80%',
    height: '80%',
    backgroundColor: '#fff',
    padding: 15,
    color:'#fff',
  },
  modalBtnView: {
    //marginBottom: 50,

  },
  modalImage : {
    flex: 3,
    alignItems: 'center',
    justifyContent: 'center',
    // elevation: 3,
    marginBottom: 50,
    backgroundColor: 'transparent',
  },
  myBtn: {
    backgroundColor: '#ccc',
    borderBottomEndRadius: 20,
    borderBottomStartRadius: 20,
    padding: 10

  },
  myBtnHover: {
    backgroundColor: '#000'

  },
  btnContainer: {
    flex: 1,
    padding: 15,
    flexDirection: 'column',
    elevation: 3,

  },
  
});


export default styles;