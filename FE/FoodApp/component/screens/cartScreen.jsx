import React, {useState, useEffect, useCallback} from "react";
import {View, Text, FlatList, SafeAreaView, StyleSheet, TouchableOpacity, Image, RefreshControl, ScrollView} from "react-native"
import axios from "axios";
import {Card} from "react-native-elements";
import { CheckBox } from 'react-native-elements';
import NumericInput from 'react-native-numeric-input';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {useIsFocused } from '@react-navigation/native';
import API from "../services/api";
import {LinearGradient} from 'expo-linear-gradient';
import{
    Avatar,
    Title,
    Caption,
    TouchableRipple
} from 'react-native-paper';

export default function historyScreen({navigation, route}){
    const{userData, status, listCart}=route.params;
    const[cart, setCart]=useState([]);
    const[quantityValue, setQuantityValue]= useState([]);
    const isFocused = useIsFocused();
    
    //console.log(listCart);
    
   
    // const onChange=(value, id)=>{
        
    //     //console.log(id);
    //     var listCartItem =[];
    //     listCartItem=cart;
    //     //var id=-1;
    //     //console.log(value);
    //     //console.log(listCartItem);
    //     for (let i=0; i<listCartItem.length; i++){
    //         //console.log(listCartItem[i]);
    //         if(listCartItem[i].id==id){
    //             listCartItem[i].quantity=value;
    //             //console.log(listCartItem[i])
    //         }
            
    //     }
    //     for (let i=0; i<listCartItem.length; i++){
            
    //         console.log(listCartItem[i].quantity);
    //     }
    //     setCart(listCartItem);
    //     //console.log(id)
    //     //console.log('ListCartItem',listCartItem[id].quantity);
    //     //console.log(value);
    //     //setCart(value);
    // }

    const fetchdata = async() => {
        //console.log('Before fetch data')
        const result = await API.get(`cart/${userData.id}`,
        {
            headers:{
                'Content-Type': 'application/json',
                'x-access-token': userData.accessToken
                
            },
        });
        //console.log(result.data.cart.cartDetails.quantity);
        setCart(result.data.cart.cartDetails);
        //console.log('fetchdata');
        //console.log(result.data.cart.cartDetails);
    }

 
   
    // const updateCartItem=()=>{
    //     console.log('update');
    //     if(status==true){
    //         //console.log(listCart);
            // API.post(`cart/${userData.id}/editCartItem/`,{listEditCartItemId: listCart},
            //                     {
            //                         headers:{
            //                             'Content-Type': 'application/json',
            //                             'x-access-token': userData.accessToken,
            //                         },
            //                     })
            //                     .then(res => {
                                    

                
            //                     }).catch(error => {
            //                             console.log(error.res);
            //                     });
    //     }
    // }
    useEffect(() => {
        //await updateCartItem();
        fetchdata();
    },[setCart, isFocused])

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
                <View style={styles.containerText}>
                    <Text style={styles.returnText}>Giỏ hàng</Text>
                </View>

            </View>
            
            <ScrollView style={{height: 670}}>
                {cart.map((item)=>
                    <Card key={item.id}>
                        <View style={styles.cardItem}>
                            
                                <View style={{flex: 2}}>
                            
                                    <Avatar.Image source={{uri: item.product.productImage}} size={80}/>
                                </View>
                                <View style={{flex: 4}}>
                                    <Text style={{fontWeight: 'bold', marginBottom: 5}}>{item.product.proName}</Text>
                                    {/* <NumericInput
                                                    minValue={1}
                                                    maxValue={50}
                                                    step={1}
                                                    value={item.quantity}
                                                    totalHeight={40}
                                                    onChange={(value) =>onChange(value, item.id)}
                                                    rounded/> */}
                                    <Text>{'Số lượng: ' + item.quantity}</Text>
                                   
                                </View>
                                <View style={styles.deleteItem}>
                                    <TouchableOpacity onPress={()=>{
                                        const article ={title: "Delete Cart"};
                                        API.put(`cart/${userData.id}/deleteCartItem/${item.id}`,article,
                                                            {
                                                                headers:{
                                                                    'Content-Type': 'application/json',
                                                                    'x-access-token': userData.accessToken,
                                                                },
                                                            })
                                                            .then(res => {
                                                                if(res.status===200){
                                                                    fetchdata();
                                                                }
                                                            }).catch(error => {
                                                                    //alert('Error', error.res);
                                                                    console.log(error.res);
                                                            });
                                        }}>
                                        <Image
                                            style={styles.recyclerImage}
                                            source={require('../images/recycle.png')}/>
                                        
                                    </TouchableOpacity>
                                </View>
                        </View>
                    </Card>
                )}
            </ScrollView>
            <View style={styles.button}>
                        <TouchableOpacity onPress={()=>{navigation.navigate('billScreen', {userData: userData, product: cart})}}>
                            <LinearGradient
                                colors={['#FF4B3A','#FF4B3A']}
                                style={styles.signIn}>
                                <Text style={styles.textSign}>Đặt hàng</Text>
                            </LinearGradient>
                        </TouchableOpacity>
                    </View>
            
           
        </SafeAreaView>
    );
}
const styles = StyleSheet.create({
    cardItem:{
        flexDirection: 'row',
        alignItems: 'center',
        
    },
    checkbox: {
        alignSelf: "center",
    },
    footer: {
        borderWidth: 1,
        
    },
    deleteItem:{
        flex: 0,
        
    },
    recyclerImage:{
        width: 20,
        height: 20,
    },
    return: {

        height: 60,
        backgroundColor: '#FFFFFF',
        flexDirection: 'row',

    },
    returnIcon:{
        flex: 3,
        marginBottom: 5,
        marginLeft: 10,
        justifyContent: 'flex-end',

    },
    returnText:{
        marginBottom: 5,

        fontWeight: 'bold',
        fontSize: 20,
        color: '#05375a',
    },
    containerText:{
        justifyContent: 'flex-end',
        flex: 5,
    },
    button: {
        alignItems: 'center',
        marginTop: 10,
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
});