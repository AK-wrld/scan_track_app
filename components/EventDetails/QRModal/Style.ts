import {StyleSheet} from 'react-native';
import { secondaryBg, secondaryText } from '../../../Globals/constants';
import { getShadowProps } from '../../../helper';


export const styles = StyleSheet.create({

  closeIcon: {
    backgroundColor:"transparent",
    width:5,
    marginLeft:"90%",

  },
  modal:{
    padding:10,
    // backgroundColor:secondaryBg,
    borderColor:secondaryBg,
    borderWidth:2,
    marginTop:20,
    width:"90%",
    margin:"auto",
    borderRadius:10
  },
  title:{
    fontSize:20,
    color:secondaryText
  },
  qrText:{
    fontSize:14,
    color:secondaryText
  },
  itemContainer: {
    width: '100%',
    height: 70,
    backgroundColor: 'white',
    marginTop: 30,
    justifyContent: 'center',
    ...getShadowProps(),
    paddingLeft: 20,
  },
  itemText: {
    fontSize: 17,
    color: 'black',
  },
});
