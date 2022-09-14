import { StyleSheet } from 'react-native';
import Colors from '../../constants/Colors';

export const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.light.secondaryColor,
    width: '95%',
    height: 56,
    borderRadius: 10,
    justifyContent: 'space-between',
    margin: 7,
    marginTop: 14,
    marginBottom: 0,
    elevation: 5,
  },
  PrimaryText:{
    fontSize: 16,
    // fontWeight: '700',
    color: Colors.light.text,
  },
  content: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  image:{
    width: 30,
    height: 30,
    borderRadius: 30,
    margin: 10,
    marginTop: 13,
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
  excludeIcon:{
    color: 'red',
  },
  excludeButton:{
    padding: 20,
    borderRadius: 100,
  },
  data:{
    flexDirection: 'row',
    marginTop: 5,
    width: '70%',
    alignItems: 'center',
    alignSelf: 'center',
    justifyContent: 'center',
  },
  infoContainer:{
    // marginTop: 5,
    // flexDirection: 'row',
    // justifyContent:'space-between',
    // height: 30,
    // width: '90%',
    // backgroundColor: Colors.light.secondaryColor,
    backgroundColor: Colors.light.secondaryColor,
    width: '92%',
    height: 'auto',
    borderTopColor: Colors.light.primaryColor,
    borderTopWidth: 2,
    borderBottomEndRadius: 10,
    borderBottomLeftRadius: 10,
    // justifyContent: 'space-between',
    marginLeft: 14,
    elevation: 5,
  },
  info:{
    margin: 5,
    marginTop: 10,
    flexDirection: 'row',
  },
  infoIcon: {
    color: Colors.light.primaryColor,
    marginRight: 5,
  },
})
