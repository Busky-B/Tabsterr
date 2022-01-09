import { StyleSheet } from 'react-native'
const styles = StyleSheet.create({
  bgImg: {
    flex: 1,
    justifyContent: 'center',
  },
  songList: {
    flex:2,
    margin: 10, 
    paddingBottom : 10, 
    paddingHorizontal: 20, 
    borderRadius: 15,
  },
  greetingContainer : {
    flex: 1,
    margin:50,
    marginTop:125,
  },
  greetingSearchContainer: {
    // flex: 1,
    flexDirection: 'row', 
    borderBottomWidth: 1,
    borderColor: '#395244',
    borderWidth: 2,
    backgroundColor: "#9ab5a7c0", 
    borderRadius:25, 

  },
  greetingSearchBarIconContainer: {
    flex: 1,
    alignSelf: 'center',
  },
  greetingSearchBar: {
    width:'100%',
    borderRadius:25, 
    padding:5, 
    paddingHorizontal: 40,
    color: '#fff',
    elevation: 3,
    
  },
  greetingSearchBarIcon: {
    backgroundColor:'#395244', 
    alignItems: 'center', 
    width: '30%', 
    alignSelf: 'center', 
    margin: 10, 
    padding: 10, 
    borderRadius: 100,
    elevation: 3,
  },
  greetingCard: { 
    fontSize: 22,
    color:'#fff'
  },
  greetingCardContainer: {
    backgroundColor:'#395244', 
    padding: 30, 
    borderRadius: 15,
    elevation: 3,
    marginBottom: 20,

  },
  container: {
    flex: 1,
    flexDirection: 'column',
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
    marginBottom: 20,
    backgroundColor:'#000',
    borderRadius: 15

  },
  modalBox: {
    width: '80%',
    height: '80%',
    backgroundColor: '#fff',
    padding: 15,
    color:'#fff',
  },
  modalImage : {
    flex: 3,
    alignItems: 'center',
    justifyContent: 'center',
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