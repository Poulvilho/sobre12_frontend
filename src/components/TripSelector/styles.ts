import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E5E5E5',
    width: '95%',
    height: 90,
    borderRadius: 10,
    justifyContent: 'space-between',
    paddingLeft: 5,
    paddingTop: 5,
    margin: 5,
    elevation: 7,
  },
  PrimaryText:{
    fontSize: 16,
    fontWeight: '700',
    color: '#000000',
    textAlign: 'auto',
  },
  content: {
    flexDirection: 'row',
    width: '90%',
  },
  image:{
    marginRight: 15,
    marginTop: 10,
    width: 60,
    height: 60,
    borderRadius: 5,
    backgroundColor: '#42A4E8',
    alignSelf:'center',
    alignItems:'center',
    justifyContent:'center',
  },
  data:{
    marginTop: 10,
    // justifyContent:'space-between'
  },
  date:{
    alignItems:'flex-end',
  },
})
