import React from 'react'
import { ScrollView, View,Text } from 'react-native'
import { styles } from './Style';
import { Avatar, Button, Chip, Divider, Icon  } from 'react-native-paper';
import { globalStyles } from '../../Globals/globalStyles';
import { primaryText, secondaryBg, secondaryText } from '../../Globals/constants';
import RegisteredEventBox from './RegisteredEventBox';

const RegisteredEvents = () => {
    const [page, setPage] = React.useState<number>(0);
  const [numberOfItemsPerPageList] = React.useState([2, 3, 4]);
  const [itemsPerPage, onItemsPerPageChange] = React.useState(
    numberOfItemsPerPageList[0]
  );

    const [items] = React.useState([
        {
          key: 1,
          name: 'Cupcake',
          calories: 356,
          fat: 16,
        },
        {
          key: 2,
          name: 'Eclair',
          calories: 262,
          fat: 16,
        },
        {
          key: 3,
          name: 'Frozen yogurt',
          calories: 159,
          fat: 6,
        },
        {
          key: 4,
          name: 'Gingerbread',
          calories: 305,
          fat: 3.7,
        },
       ]);
     
       const from = page * itemsPerPage;
       const to = Math.min((page + 1) * itemsPerPage, items.length);
     
       React.useEffect(() => {
         setPage(0);
       }, [itemsPerPage]);
  return (
    <>
    <ScrollView style={styles.tableContainer}>
        <RegisteredEventBox/>
        <RegisteredEventBox/>
        <RegisteredEventBox/>
    </ScrollView>
    </>
  )
}

export default RegisteredEvents