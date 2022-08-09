import { StyleSheet } from 'react-native';
import Colors from '../../constants/Colors';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.light.secondaryColor,
    width: '95%',
    height: 55,
    justifyContent: 'space-between',
    margin: 7,
    elevation: 7,
    borderRadius: 5,
  },
  PrimaryText:{
    fontSize: 16,
    // fontWeight: '700',
    color: Colors.light.text,
    textAlign: 'auto',
  },
  content: {
    flexDirection: 'row',
  },
  category:{
    marginRight: 15,
    width: 130,
    height: 55,
    borderBottomRightRadius: 20,
    borderTopRightRadius: 20,
    backgroundColor: Colors.light.primaryColor,
    flexDirection: 'row',
    alignItems: 'center',
  },
  budget:{
    flexDirection: 'column',
    marginTop: 5,
    marginRight: 30,
    alignItems: 'flex-end',
  },
  spent:{
    flexDirection: 'column',
    marginTop: 5,
    alignItems: 'flex-end',
  },
  date:{
    alignItems:'flex-end',
  },
})
