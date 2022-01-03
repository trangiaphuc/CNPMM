import React,{useState, useEffect} from "react";
import {View, Text, SafeAreaView, StyleSheet, ScrollView, TouchableOpacity, NativeModules} from "react-native";
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import axios from "axios";
import{
    Avatar,
    Title,
    Caption,
    TouchableRipple
} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import API from "../services/api";
import {useIsFocused } from '@react-navigation/native';
//import ImagePicker from 'react-native-image-picker';
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';
export default function userScreen({navigation, route}){
    const{userData}=route.params;
    const[data, setData]=useState([]);
    const [orders, setOrders] = useState([]);
    const isFocused = useIsFocused();
    //const baseURL= `http://192.168.1.5:8080/api/`;
  
    const [image, setImage] = useState(null);
    //console.log(orders);
    // const[lengthOrder, setLengthOrder] = useState([]);

    data.accessToken = userData.accessToken;
    
        const fetchdata = async() => {
            const result = await API.get(`user/information/${userData.id}`,
            {
                headers:{
                    'Content-Type': 'application/json',
                    'x-access-token': userData.accessToken
                },
            });
            //console.log(result.data.information);
            setData(result.data.information);
        }

        const getUserOrder = async () =>{
            const result = await API.get(`order/${userData.id}`, 
            {
                headers:{
                    'Content-Type': 'application/json',
                    'x-access-token': userData.accessToken
                },
            });
            setOrders(result.data.orders)
            //console.log(result.data.orders);
            
        }


        useEffect( async() => {
            await fetchdata();
            await getUserOrder();
        },[setData, setOrders,isFocused]);


        
        const chooseImage = async () => {
            // No permissions request is necessary for launching the image library
            let result = await ImagePicker.launchImageLibraryAsync({
              mediaTypes: ImagePicker.MediaTypeOptions.All,
              allowsEditing: false,
              aspect: [4, 3],
              quality: 1,
            });
        
            //console.log(result);
        
            if (!result.cancelled) {
                    let form =new FormData();
                    let file = {
                        name:'avatar.jpg',
                        uri: result.uri,
                        type: "image/jpeg",
                    }
                    form.append('file', file);


                    API.post('upload',form,
                    {
                        headers:{
                            'Content-Type': 'multipart/form-data',
                        },

                    })
                    .then(res => {
                        console.log(res.data);
                    }).catch(error => {
                            console.log('Error', error.res);
                    });

            }
            
        };

    return(
       

        <SafeAreaView>
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
                <Text style={styles.returnText}>Thông tin cá nhân</Text>

            </View>
           <ScrollView>
           <View style={styles.userInfoSection}>
                <View style={{flexDirection: 'row', marginTop: 15}}>
                    <Avatar.Image
                    source={{
                        uri: data.userAvatar
                    }}
                    size={80}/>

                    <View style={{marginLeft:20}}>
                        <Title style={[styles.title,{
                            marginTop: 15,
                            marginBottom: 5,
                        }]}>{data.firstname + ' ' + data.lastname}</Title>
                        <Caption style={styles.caption}>@{data.username}</Caption>
                    </View>
                </View>
            </View>
            <View style={styles.userInfoSection}>
                <View style={styles.row}>
                    <TouchableOpacity onPress={chooseImage}>
                        <Icon name="camera" size={20}/>
                    </TouchableOpacity>
                </View>
                <View style={styles.row}>
                    <Icon name="map-marker-radius" size={20}/>
                    <Text style={styles.text}>Viet Nam</Text>
                </View>
                <View style={styles.row}>
                    <Icon name="phone" size={20}/>
                    <Text style={styles.text}>{data.phone}</Text>
                </View>
                <View style={styles.row}>
                    <Icon name="email" size={20}/>
                    <Text style={styles.text}>{data.email}</Text>
                </View>
                <View style={styles.row}>
                    <Icon name="calendar-account" size={20}/>
                    <Text style={styles.text}>{data.birthday}</Text>
                </View>
                <View style={styles.row}>
                    <Icon name="map-marker" size={20}/>
                    <Text style={styles.text}>{data.address}</Text>
                </View>
            </View>
            <View style={styles.infoBoxWrapper}>
                <View style={[styles.infoBox, {
                    borderRightColor: '#dddddd',
                    borderRightWidth: 1,
                }]}>
                    <Title>1200</Title>
                    <Caption>Tổng chi tiêu</Caption>
                </View>
                <TouchableRipple onPress={()=>{navigation.navigate('userOrderManagementScreen',{userData: userData, orders: orders, userInfo: data})}} 
                style={[styles.infoBox, {
                    borderRightColor: '#dddddd',
                    borderRightWidth: 1,
                }]}>
                    <View>
                        <Title>{orders.length}</Title>
                        <Caption>Số đơn hàng</Caption>
                    </View>
                </TouchableRipple>
            </View>
            <View style={styles.menuWrapper}>
                <TouchableRipple onPress={()=>{}}>
                    <View style={styles.menuItem}>
                        <Icon name="heart-outline" color="#FE6347" size={25}/>
                        <Text style={styles.menuItemText}>Your Favourites</Text>
                    </View>
                </TouchableRipple>
                <TouchableRipple onPress={()=>{}}>
                    <View style={styles.menuItem}>
                        <Icon name="credit-card" color="#FE6347" size={25}/>
                        <Text style={styles.menuItemText}>Payment</Text>
                    </View>
                </TouchableRipple>
                <TouchableRipple onPress={()=>{}}>
                    <View style={styles.menuItem}>
                        <Icon name="account-check-outline" color="#FE6347" size={25}/>
                        <Text style={styles.menuItemText}>Support</Text>
                    </View>
                </TouchableRipple>
                <TouchableRipple onPress={()=>{navigation.navigate('updateUserProfileScreen',{ userData : data})}}>
                    <View style={styles.menuItem}>
                        <Icon name="cog-outline" color="#FE6347" size={25}/>
                        <Text style={styles.menuItemText}>Cập nhật thông tin cá nhân</Text>
                    </View>
                </TouchableRipple>
                <TouchableRipple onPress={()=>{navigation.navigate('signInScreen')}}>
                    <View style={styles.menuItem}>
                        <Icon name="logout" color="#FE6347" size={25}/>
                        <Text style={styles.menuItemText}>Sign Out</Text>
                    </View>
                </TouchableRipple>
            </View>
           </ScrollView>
        </SafeAreaView>
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop:30,
    },
    text: {
        marginLeft: 10,
    },
    userInfoSection: {
        paddingHorizontal: 30,
        marginBottom: 25,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
    },
    caption: {
        fontSize: 14,
        lineHeight: 14,
        fontWeight: '500',
    },
    row: {
        flexDirection: 'row',
        marginBottom: 10,
    },
    infoBoxWrapper: {
        borderBottomColor: '#dddddd',
        borderBottomWidth: 1,
        borderTopColor: '#dddddd',
        borderTopWidth: 1,
        flexDirection: 'row',
        height: 100,
    },
    infoBox: {
        width: '50%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    menuWrapper: {
        marginTop: 10,
    },
    menuItem: {
        flexDirection: 'row',
        paddingVertical: 15,
        paddingHorizontal: 30,
    },
    menuItemText: {
        color: '#777777',
        marginLeft: 20,
        fontWeight: '600',
        fontSize: 16,
        lineHeight: 26,
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