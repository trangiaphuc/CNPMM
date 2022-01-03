import React, {useState, useEffect}from "react";
import {
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
    Dimensions,
    Platform,
    TextInput,
    Picker,
    Alert ,
    Image,
} from "react-native";
import {LinearGradient} from 'expo-linear-gradient';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import axios from "axios";
//import signInScreen from "./signInScreen";
import darBoardScreen from "./darBoardScreen";
import API from "../services/api";
import ComboBox from 'react-native-combobox';



export default function updateUserProfile({navigation, route}){
    
    const {userData} = route.params; 
    
    const[changePasswordInfo, setChangePasswordInfo]=React.useState({
        oldPassword: '',
        newPassword: '',
        confirmPassword: '',
    });



    //handle Zone
    const handleoldPassword = (val)=>{
        setChangePasswordInfo({
            ...changePasswordInfo,
            oldPassword: val
        });
    }
    const handleNewPassword = (val)=>{
        setChangePasswordInfo({
            ...changePasswordInfo,
            newPassword: val
        });
    }
    const handleConfirmPassword = (val)=>{
        setChangePasswordInfo({
            ...changePasswordInfo,
            confirmPassword: val
        });
    }

    const submitUpdate = ()  =>{
        if(changePasswordInfo.newPassword === changePasswordInfo.confirmPassword){
            API.post(`merchant/changepassword/${userData.id}`,{oldPassword: changePasswordInfo.oldPassword, password: changePasswordInfo.newPassword},
            {
                headers:{
                    'Content-Type': 'application/json',
                    'x-access-token': userData.accessToken,
                },
            })
            .then(res => {
                if(res.status==200)
                {
                    Alert.alert("Thông báo","Cập nhật thành công");
                }
            }).catch(error => {
                Alert.alert('Thông báo', 'Sai mật khẩu cũ');
            });
        }
        else{
            Alert.alert('Thông báo','Xác nhận mật khẩu không đúng')
        }
    }


    return(

        <View style={styles.container}>
        
            <View style={styles.return}>    
                <View style={styles.returnIcon}>
                    <TouchableOpacity onPress={()=>{navigation.goBack();}}>
                        <FontAwesome
                            name="arrow-left"
                            color="#05375a"
                            size={20}
                        />
                    </TouchableOpacity>
                </View>
                <Text style={styles.returnText}>Đổi mật khẩu</Text>    
            </View>
            
            <View style={styles.footer}>

                <View style={styles.action}>
                   
                   <TextInput
                        placeholder="Mật khẩu cũ"
                        style={styles.textInput}
                        secureTextEntry={true}
                        //autoCapitalize='none'
                        onChangeText={(val)=>handleoldPassword(val)}
                   />
                </View>

                <View style={styles.action}>
                   <TextInput
                        placeholder="Mật khẩu mới"
                        style={styles.textInput}
                        secureTextEntry={true}
                        //autoCapitalize='none'
                        //defaultValue = {userInformation.firstname}
                        onChangeText={(val)=>handleNewPassword(val)}
                   />
                </View>
               
                <View style={styles.action}>
                   <TextInput
                        placeholder="Xác nhận mật khẩu"
                        style={styles.textInput}
                        secureTextEntry={true}
                        // autoCapitalize='none'
                        // defaultValue ={userInformation.lastname}
                        onChangeText={(val)=>handleConfirmPassword(val)}
                   />
                </View>
            </View>

            <View style={styles.button}>
                <TouchableOpacity
                   onPress = {submitUpdate}
                   style={[styles.signIn,{
                       borderColor:'#ff4700',
                       borderWidth: 1,
                       margin: 10,
                   }]}>
                       <Text style={[styles.textSign,{
                           color:'#ffffff',
                           fontSize: 25
                        }]}
                        >Cập nhật</Text>
                </TouchableOpacity>
            </View>

        </View>

    );

}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        // backgroundColor:'#FF4B3A',
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
        backgroundColor:'#FF4B3A',
        margin: 5,
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
    },
    textSignIn:{
        fontSize: 15,
        marginTop: 15
    },
    gender:{
        flexDirection: 'row',
        alignItems: 'center',
    },
    genderImage:{
        width: 20,
        height: 20,
        marginRight: 10,
    },
    return: {

        height: 60,
        backgroundColor: '#FFFFFF',
        flexDirection: 'row',
        
    },
    returnIcon:{
        marginLeft: 15,
        marginTop: 30,
    },
    returnText:{
        marginTop: 25,
        marginLeft: 80,
        fontWeight: 'bold',
        fontSize: 20,
        color: '#05375a'
    }
});
