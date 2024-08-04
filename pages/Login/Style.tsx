import { StyleSheet } from "react-native";
import { primaryBg, primaryText, secondaryBg, secondaryDarkBg, secondaryText } from '../../Globals/constants';

export const styles = StyleSheet.create({
  loginContainer: {
    width: "100%",
    height: "80%",
    // justifyContent:"space-evenly",
    paddingTop:20,
    backgroundColor: secondaryBg,
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    borderBottomLeftRadius: 0,
    // borderBottomRightRadius: 50,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 1,
    gap:20
  },
  headingBox: {
    // backgroundColor: "black"
    height:"20%",
    justifyContent:"center",
    paddingTop:40,
    gap:10
  },
  title: {
    fontSize: 30,
    color: secondaryText,
    textAlign: "center",
    paddingTop: 20,
    
  },
  quote: {
    fontSize: 16,
    color: primaryText,
    textAlign: "center"
  },
  formBox: {
    height: 220,
    // backgroundColor: "red",
    justifyContent: "space-evenly",
    alignItems: "center", 
  },
  inputBox: {
    width: "80%",
    // marginVertical: 10, 
  },
  loginBtn: {
    backgroundColor:secondaryDarkBg,
    color:secondaryText,
    width:"80%",
    borderRadius:10,
    elevation:1,
    marginTop:30
  },
  footerBox: {
    // Additional styles for footerBox if needed
    // backgroundColor:"red",
    justifyContent:"space-between",
    height:110
  },
  footerText: {
    width:"60%",
    alignSelf:"center",
    borderRadius:10
  }
});
