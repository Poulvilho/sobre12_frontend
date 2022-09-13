import { StyleSheet } from 'react-native';
import Colors from '../../constants/Colors';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
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
  icon:{
    color: Colors.light.secondaryColor,
  },
  image:{
    width: 55,
    height: 55,
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
    marginRight: 10,
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
  },
})
