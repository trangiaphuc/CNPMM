import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { useTheme } from '@react-navigation/native';

import {
    View,
    Text,
    Button,
    TouchableOpacity,
    Dimensions,
    StyleSheet,
    Image
} from "react-native";
import {LinearGradient} from 'expo-linear-gradient';
export default function flashScreen({navigation}) {
  const { colors } = useTheme();
  return (
    <View style={styles.container}>
            <View style={styles.header}>
                <Image source={require('../assets/logo.png')}>
                </Image>
            </View>
            <View style={styles.footer}>
                <Text style={styles.title}>Stay connected with everyone</Text>
                <Text style={styles.text}>Sign in with account</Text>
                <View style={styles.button}>
                  <TouchableOpacity onPress={()=>navigation.navigate('signInScreen')}>
                        <LinearGradient
                            colors={['#08d4c4','#01ab9d']}
                            style={styles.signIn}>
                            <Text style={styles.textSign}>Get Started</Text>
                        </LinearGradient>
                  </TouchableOpacity>
                </View>
            </View>
         </View>
  );
}





const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#009387',
  },
  header: {
    flex: 2,
    justifyContent: "center",
    alignItems: "center"
},
  footer: {
    flex: 1,
    backgroundColor: "#fff",
    borderTopLeftRadius: 30,
    borderTopRightRadius:30,
    paddingVertical: 50,
    paddingHorizontal:30
},
  signIn: {
    width: 150,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
    flexDirection: 'row'
},
  textSign: {
    color: 'white',
    fontWeight: 'bold'
},
  button: {
    alignItems: 'flex-end',
    marginTop: 30
},
  title: {
    color: '#05375a',
    fontSize: 30,
    fontWeight: 'bold'
  },
  text: {
    color: 'grey',
    marginTop:5
  },
});