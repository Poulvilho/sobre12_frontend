import { StyleSheet } from 'react-native';
import Colors from '../../constants/Colors';

export const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.light.secondaryColor,
    width: '95%',
    height: 55,
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
  icon: {
    marginRight:'auto',
    marginLeft:'auto',
  },
  iconImage:{
    color: Colors.light.secondaryButton,
  },
  data:{
    flexDirection: 'column',
    marginTop: 5,
    width: '80%',
    alignItems: 'center',
    alignContent: 'center',
    alignSelf: 'center',
  },
  info:{
    marginTop: 5,
    flexDirection: 'row',
    justifyContent:'space-between',
  },
})
