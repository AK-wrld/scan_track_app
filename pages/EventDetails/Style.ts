import {StyleSheet} from 'react-native';
import {primaryText, secondaryBg, secondaryText} from '../../Globals/constants';

export const styles = StyleSheet.create({
    title:{
        // backgroundColor:secondaryText,
        flex:1,
        marginTop:20,
        borderColor:primaryText,
        borderWidth:2,
        borderRadius:10

    },
    content: {
        width:"90%",
        margin:"auto",
        paddingVertical:5
    },
    logoTitleBox:{
        flexDirection:"row",
        flex:1,
        alignItems:"center",
        gap:20
    },
    titleFont: {
        fontSize:24,
        color:secondaryText,
    
    },
    infoBox:{
        marginTop:14,
        // columnGap:5
        gap:5,
        flex:2
    },

    labelBox:{
        flexDirection:"row",
        gap:10,
        
    },
    labels: {
        color:secondaryText,
        fontSize:12
    },
    registerBox: {
        flex:1,
        justifyContent:"center"
    },
    registerBtn:{
        backgroundColor:secondaryBg,
        borderRadius:14
    },
    registerInfoBox:{
        marginTop:14,
        gap:10,
        flex:1
    },
    teamInfoBox: {
        flexDirection:"row",
        gap:20,
        alignItems:"center",
        
    }
});
