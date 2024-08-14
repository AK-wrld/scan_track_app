import React from 'react'
import { Button, Icon, Modal, Text } from 'react-native-paper'
import { primaryBg, secondaryBg } from '../../../Globals/constants'
import { styles } from './Style'
import { globalStyles } from '../../../Globals/globalStyles'
import { View } from 'react-native'
type Props = {
    visible:boolean,
    handleModalState: (visible:boolean)=>void
}
const QRModal = ({visible,handleModalState}:Props) => {
    
  return (
    <>
     <View style={styles.modal}>
     <Button style={styles.closeIcon} icon="close" mode="contained" onPress={() => handleModalState(false)} children={undefined}>
  </Button>
          <Text style={[globalStyles.semiBoldText,styles.title]}>QR Code</Text>
          {/* <Text>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus dolores, at fuga harum maiores dicta dolor esse placeat vero eveniet eligendi doloribus velit, maxime autem laudantium? Eveniet voluptatibus, voluptatem maiores earum eaque sit facere laborum quod totam veniam perferendis reprehenderit assumenda, impedit, sint illo enim officiis! Ex, cum eum dicta natus itaque nihil, cupiditate, molestias architecto tempora impedit quae nobis? Nobis perferendis eligendi quo ad enim illum eum facere nesciunt, aperiam possimus non impedit eos pariatur cum! Deleniti quae quo aut maiores obcaecati laboriosam commodi quam dolores magni autem aliquid sequi, voluptatibus et, ipsum inventore placeat quas molestiae ex. Dolore animi voluptatibus minima amet veritatis doloremque, voluptatem nihil iure. Omnis, id vitae, odit cupiditate sequi reprehenderit, a recusandae aliquam eum eligendi voluptatem. Commodi quia quod laudantium omnis vitae quisquam suscipit. Aliquam vero architecto, perspiciatis facilis excepturi labore ea cumque aliquid recusandae tempora voluptas velit magni eos nulla est temporibus alias quae facere adipisci. Quaerat pariatur quos veniam. Ullam quidem voluptatum maiores in temporibus harum dolores natus ducimus ipsa, dicta eum omnis ea tempora blanditiis saepe pariatur totam sequi cupiditate! Quibusdam, iste? Earum ea eligendi laudantium animi officia placeat beatae dolor iusto vero quia qui cupiditate eos aperiam, expedita distinctio doloremque.</Text> */}
        </View>
    </>
  )
}

export default QRModal