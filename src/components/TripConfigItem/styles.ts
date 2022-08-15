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
    fontSize: 18,
    // fontWeight: '700',
    color: Colors.light.text,
  },
  content: {
    flexDirection: 'row',
    marginTop: 'auto',
    marginBottom: 'auto',
  },
  image:{
    width: 30,
    height: 30,
    borderRadius: 30,
    marginLeft: 15,
    backgroundColor: Colors.light.primaryColor,
    alignSelf:'center',
    justifyContent:'center',
  },
  icon: {
    marginRight:'auto',
    marginLeft:'auto',
  },
  data:{
    // flexDirection: 'column',
    
    width: '80%',
    alignItems: 'center',
    // alignContent: 'center',
  },
})
