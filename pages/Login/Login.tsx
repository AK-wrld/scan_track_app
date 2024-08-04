import React from 'react'
import { Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { styles } from './Style'

const Login = () => {
  return (
    <View style={styles.container}>
    <Text style={styles.regularText}>Poppins Regular</Text>
    <Text style={styles.boldText}>Poppins Bold</Text>
  </View>
  )
}

export default Login


  