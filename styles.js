import { StyleSheet } from 'react-native'
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ccc',
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
      padding: 15,
    flexDirection: 'row',

  },
  
});


export default styles;