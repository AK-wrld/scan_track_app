import React from 'react';
import {SafeAreaView, View} from 'react-native';
import {IconButton, Searchbar} from 'react-native-paper';
import {styles} from './Style';
import {
  secondaryBg,
  secondaryDarkBg,
} from '../../Globals/constants';
const SearchBar = () => {
  const [searchQuery, setSearchQuery] = React.useState('');
  return (
    <SafeAreaView style={styles.searchBoxContainer}>
      <Searchbar
        placeholder="Search"
        onChangeText={setSearchQuery}
        value={searchQuery}
        style={styles.searchBar}
        elevation={1}
        iconColor={secondaryBg}
        right={() => (
          <View style={styles.rightContainer}>
            <IconButton
              size={20}
              icon="microphone"
              iconColor={secondaryDarkBg}
              style={{paddingRight: 20}}
              onPress={() => console.warn('clicked')}
            />
          </View>
        )}
      />
    </SafeAreaView>
  );
};

export default SearchBar;
