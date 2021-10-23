import React from "react";
import {
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
    Dimensions,
    Platform,
    TextInput
} from "react-native";
import {LinearGradient} from 'expo-linear-gradient';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
export default function signIn({navigation}){


    const[data, setData]=React.useState({
        email: '',
        password: '',
        check_TextInput: false,
        secureTextEntry: true
    });
    const textInputChange=(val)=>{
        if( val.length !==0){
            setData({
                ...data,
                email: val,
                check_TextInput: true
            });
        } else {
            setData({
                ...data,
                email: val,
                check_TextInput: false
            });
        }
    }
    const handlePasswordChange=(val)=>{
        setData({
            ...data,
            password: val
        });
    }
    const updatePasswordEntry=()=>{
        setData({
            ...data,
            secureTextEntry: !data.secureTextEntry,
        });
    }



    return(
        <View style={styles.container}>
           <View style={styles.header}>
               <Text style={styles.textheader}>Đăng nhập</Text>
           </View>
           <View style={styles.footer}>
               <Text style={styles.textfooter}>Email</Text>
               <View style={styles.action}>
                   <FontAwesome
                        name="user-o"
                        color="#05375a"
                        size={20}
                   />
                   <TextInput
                        placeholder="Your email"
                        style={styles.textInput}
                        autoCapitalize='none'
                        onChangeText={(val)=>textInputChange(val)}
                   />
                   {data.check_TextInput ?
                   <Feather
                        name="check-circle"
                        color="#05375a"
                        size={20}
                    /> 
                    :null}
                   
               </View>
               <Text style={[styles.textfooter,{marginTop:35}]}>Password</Text>
               <View style={styles.action}>
                    <Feather
                        name="lock"
                        color="#05375a"
                        size={20}
                    />
                   <TextInput
                        placeholder="Your password"
                        secureTextEntry={data.secureTextEntry ? true : false}
                        style={styles.textInput}
                        autoCapitalize='none'
                        onChangeText={(val)=>handlePasswordChange(val)}
                   />
                   <TouchableOpacity onPress={updatePasswordEntry}>
                       {data.secureTextEntry ?
                        <Feather
                                name="eye-off"
                                color="#05375a"
                                size={20}
                        />
                        :
                        <Feather
                                name="eye"
                                color="#05375a"
                                size={20}
                        />
                       }
                   </TouchableOpacity>
                    
               </View>

               <View style={styles.button}>
                   <LinearGradient
                   colors={['#ff4700','#EA9515']}
                   style={styles.signIn}
                   >
                       <Text style={[styles.textSign,{color:'#fff'}]}>Đăng nhập</Text>
                   </LinearGradient>

                   <TouchableOpacity
                   onPress={()=>navigation.navigate('signUpScreen')}
                   style={[styles.signIn,{
                       borderColor:'#ff4700',
                       borderWidth: 1,
                       marginTop: 15
                   }]}>
                       <Text style={[styles.textSign,{color:'#ff4700'}]}>Đăng ký</Text>
                   </TouchableOpacity>
               </View>
           </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor:'#ff4700',
    },
    header: {
        flex: 1,
        justifyContent: "flex-end",
        paddingHorizontal:20,
        paddingBottom: 50
    },
      footer: {
        flex: 3,
        backgroundColor: "#fff",
        borderTopLeftRadius: 30,
        borderTopRightRadius:30,
        paddingVertical: 30,
        paddingHorizontal:20
    },
    textheader: {
        color: "#fff",
        fontWeight:'bold',
        fontSize:30,
        
    },
    textfooter: {
        color:'#05735a',
        fontSize: 18
    },
    action: {
        flexDirection: 'row',
        marginTop: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#f2f2f2',
        paddingBottom: 5
    },
    textInput: {
        flex: 1,
        paddingLeft: 10,
        color: '#05375a',
    },
    button: {
        alignItems: 'center',
        marginTop: 50
    },
    signIn: {
        width: '100%',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10
    },
    textSign: {
        fontSize: 18,
        fontWeight: 'bold'
    }
});