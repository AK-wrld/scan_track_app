import {StyleSheet} from 'react-native';
import {secondaryBg, secondaryText} from '../../Globals/constants';

export const styles = StyleSheet.create({
  header: {
    backgroundColor: secondaryBg,
    paddingRight: 20,
    paddingLeft: 10,
    justifyContent:"center"
  },
  title: {
    fontSize: 24,
    color: secondaryText,
  },
});
