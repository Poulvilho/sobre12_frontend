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
  budgetText:{
    color: Colors.light.secondaryButton,
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
    marginRight: 10,
    alignItems: 'flex-end',
    width: '25%',
  },
  spent:{
    flexDirection: 'column',
    marginTop: 5,
    alignItems: 'flex-end',
    width: '30%',
    paddingRight: 10,
  },
  date:{
    alignItems:'flex-end',
  },
  infoContainer:{
    flexDirection: 'row',
    justifyContent:'space-between',
    backgroundColor: Colors.light.secondaryColor,
    width: '92%',
    height: 40,
    borderTopColor: Colors.light.primaryColor,
    borderTopWidth: 2,
    borderBottomEndRadius: 10,
    borderBottomLeftRadius: 10,
    marginLeft: 14,
    elevation: 5,
  },
  info:{
    margin: 5,
    marginTop: 10,
    flexDirection: 'row',
    width: '46%',
    alignItems: 'center',
    justifyContent: 'center',
    // borderWidth: 1,
    elevation: 4,
    backgroundColor: Colors.light.primaryColor,
    borderRadius: 5,
  },
  infoIcon: {
    color: Colors.light.secondaryButton,
    marginRight: 5,
  },
  text:{
    color: Colors.light.secondaryButton,
  },
  textDanger:{
    color: Colors.light.overBudget,
  },
})
