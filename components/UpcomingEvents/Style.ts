import {StyleSheet} from 'react-native';
import {
  primaryText,
  secondaryDarkBg,
  secondaryText,
} from '../../Globals/constants';

export const styles = StyleSheet.create({
  tableContainer: {
    width: '90%',
    marginTop: 10,
    margin: 'auto',
  },
  tableContent: {
    borderColor: primaryText,
    borderWidth: 1,
    padding: 10,
    width: '100%',
    margin: 'auto',
    gap: 10,
    borderRadius: 10,
    marginVertical: 10,
    // backgroundColor:"green"
  },
  headingContent: {
    width: '100%',
    // height:"100%",
    flexDirection: 'row',
    flex: 2,
  },
  iconContainer: {
    flex: 1,
    height: '100%',
    justifyContent: 'center',
  },
  detailsContainer: {
    flex: 4,
    // backgroundColor:"red",
    height: '100%',
    paddingLeft: 10,
  },
  buttonsContainer: {
    flex: 1,
    height: '100%',
    justifyContent: 'center',
  },
  detailsBtn: {
    backgroundColor: secondaryDarkBg,
    color: secondaryText,
    // width: '80%',
    borderRadius: 10,
    elevation: 1,
    // marginTop: 30,
    fontSize: 10,
    // marginLeft:"auto"
  },
  normalSize: {
    fontSize: 10,
    color: secondaryText,
  },
  detailsBottom: {
    flexDirection: 'row',
    flex: 1,
    // backgroundColor:"green",
    gap: 10,
  },
  datesContainer: {
    // flexDirection:"row"
    flex: 1,
  },
  teamDetailsContainer: {
    flex: 1,
  },
  noEventText: {
    color: secondaryText,
    fontSize: 20,
    textAlign:"center"
  }
});
