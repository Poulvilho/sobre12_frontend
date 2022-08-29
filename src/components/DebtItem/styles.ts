import { StyleSheet } from 'react-native';
import Colors from '../../constants/Colors';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffe3e3',//'#ffc9c9'
    width: '95%',
    height: 60,
    borderRadius: 10,
    justifyContent: 'space-between',
    marginTop: 14,
    marginHorizontal: 7,
    elevation: 5,
  },
  containerSettled: {
    flex: 1,
    backgroundColor: '#e6ffe3',//'#c9ffdd',
    width: '95%',
    height: 60,
    borderRadius: 10,
    justifyContent: 'space-between',
    margin: 7,
    elevation: 5,
  },
  PrimaryText:{
    fontSize: 16,
    // fontWeight: '700',
    color: Colors.light.text,
  },
  content: {
    flexDirection: 'row',
  },
  image:{
    width: 30,
    height: 30,
    borderRadius: 30,
    margin: 10,
    backgroundColor: Colors.light.primaryColor,
    alignSelf:'center',
    justifyContent:'center',
  },
  data:{
    flexDirection: 'column',
    marginTop: 5,
    width: '80%',
  },
  info:{
    marginTop: 5,
    flexDirection: 'row',
    justifyContent:'space-between',
    alignItems: 'center',
  },
  infoContainer:{
    flexDirection: 'row',
    justifyContent:'center',
    backgroundColor: '#ffe3e3',
    width: '92%',
    height: 40,
    borderTopColor: Colors.light.primaryColor,
    borderTopWidth: 2,
    borderBottomEndRadius: 10,
    borderBottomLeftRadius: 10,
    marginLeft: 14,
    elevation: 5,
  },
  // info:{
  //   margin: 5,
  //   marginTop: 10,
  //   flexDirection: 'row',
  //   width: '46%',
  //   alignItems: 'center',
  //   justifyContent: 'center',
  //   // borderWidth: 1,
  //   elevation: 4,
  //   backgroundColor: Colors.light.primaryColor,
  //   borderRadius: 5,
  // },
  infoIcon: {
    color: 'green',
    marginRight: 5,
  },
  text:{
    color: Colors.light.text,
  },
})
