import { StyleSheet } from "react-native";
import { primaryBg } from "./constants";

export const globalStyles = StyleSheet.create({
    main: {
        flex: 1,
        backgroundColor: primaryBg,
        // justifyContent:"center",
        // alignItems:"center"
      },
      regularText: {
        fontFamily: 'Poppins-Regular', // The name of the .ttf file without the extension
        fontSize: 20,
      },
      boldText: {
        fontFamily: 'Poppins-Bold', // The name of the .ttf file without the extension
        fontSize: 20,
      },
      semiBoldText: {
        fontFamily:'Poppins-SemiBold'
      },
      italicText: {
        fontFamily:'Poppins-Italic'
      }
})