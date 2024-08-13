import { StyleSheet } from "react-native";
import { secondaryBg, secondaryText } from "../../Globals/constants";

export const styles = StyleSheet.create({
    header: {
        flex:1,
        backgroundColor:secondaryBg,
        borderBottomEndRadius:50,
        borderBottomLeftRadius:50
    },
    body: {
        flex:2,
        // backgroundColor:"green"
    },
    welcome: {
        paddingLeft:20,
        color:secondaryText,
        fontSize:18

    },
    chipContainer: {
        flexDirection:"row",
        justifyContent:"center",
        marginTop:20,
        gap:10
    }   
})