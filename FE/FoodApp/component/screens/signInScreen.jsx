import React from "react";
import { useState, useEffect ,useContext} from 'react';
import {
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
    Dimensions,
    Platform,
    TextInput,
    Form,
    Alert
} from "react-native";
import {LinearGradient} from 'expo-linear-gradient';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import axios from "axios";
//import { error } from "../../../../BE/app/winston/winston";
//import authServices from "../../services/authServices";

export default function signIn(){


    const[data, setData]=React.useState({
        username: '',
        password: '',
        check_TextInput: false,
        secureTextEntry: true
    });

   
  
    const signInButton=()=>{
        if(data.username.length !== 0){
            if(data.password.length !== 0)
            {
                
                axios.post("http://192.168.1.3:8080/api/auth/signin/", {username:data.username, password:data.password}).then(response => {
                    if (response.accessToken === null){
                        Alert.alert("Login Failed");
                    }
                    else{
                        Alert.alert("Login Successful");
                    }
                });
            }
            else {
                Alert.alert("Please enter your password");
            }
        }
        else{
            Alert.alert("Please enter your username");
        }
        
        
    }

    const textInputChange=(val)=>{
        if( val.length !==0){
            setData({
                ...data,
                username: val,
                check_TextInput: true
            });
        } else {
            setData({
                ...data,
                username: val,
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
                <Text style={styles.textfooter}>Username</Text>
                <View style={styles.action}>
                    <FontAwesome
                            name="user-o"
                            color="#05375a"
                            size={20}
                    />
                    <TextInput
                            placeholder="Username"
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
                    <TouchableOpacity
                        onPress={signInButton}
                        style={[styles.signIn,{
                            borderColor:'#ff4700',
                            borderWidth: 1,
                            marginTop: 15
                        }]}>
                            <Text style={[styles.textSign,{color:'#ff4700'}]}>Đăng nhập</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                    // onPress={()=>navigation.navigate('signUpScreen')}
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