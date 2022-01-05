import { StyleSheet } from 'react-native'
const styles = StyleSheet.create({
  glassContainer: {
    backgroundColor: '#fff8',
    paddingHorizontal: 20,

  },
  searchBar: {
    flexDirection: 'row',
    // backgroundColor :"#aaa", 
    backgroundColor: '#c0d1c8',
    borderRadius:25, 
    color:"blue", 
    padding:5, 
    textAlign: "center", 
    margin: 20, 
    color : '#000',
    elevation: 3,
    borderColor: '#395244',
    borderWidth: 2,
  },
  greetingCard: { 
    fontSize: 22,
    marginTop: 125, 
    marginBottom : 50, 
    backgroundColor: "#9ab5a7", 
    padding: 30, 
    borderRadius: 15,
    elevation: 100,
    borderColor: '#395244',
    borderWidth: 2,
  },
  container: {
    flex: 1,
    flexDirection: 'column',
    // backgroundColor: '#ccc',
    backgroundColor: '#222',
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
    padding: 15
  },
  modalBtnView: {
    //marginBottom: 50,

  },
  modalImage : {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 30
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

  },
  
});


export default styles;