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
    const{response}=route.params;
    const[cart, setCart]=useState([]);
    const[quantity, setQuantity]= useState([]);
    const isFocused = useIsFocused();
   


    const fetchdata = async() => {
        const result = await API.get(`cart/${response.id}`,
        {
            headers:{
                'Content-Type': 'application/json',
                'x-access-token': response.accessToken
                
            },
        });
        //console.log(result.data.cart.cartDetails.quantity);
        setCart(result.data.cart.cartDetails);
    }

    useEffect(() => {
        fetchdata();
    },[setCart]);

    useEffect(() => {
        fetchdata();
    },[isFocused])

   
  
        const onChange=(value)=>{
            setQuantity(value);
        }

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
                <Text style={styles.returnText}>Giỏ hàng</Text>
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
                                    {/* <Card.Title>{item.product.proName}</Card.Title> */}
                                    
                                    <NumericInput
                                        minValue={0}
                                        maxValue={50}
                                        initValue={item.quantity}
                                        step={1}
                                        totalHeight={40}
                                        onChange={(value) =>onChange(value)}
                                        rounded/>
                                </View>
                                <View style={styles.deleteItem}>
                                    <TouchableOpacity onPress={()=>{
                                        const article ={title: "Delete Cart"};
                                        API.put(`cart/${response.id}/deleteCartItem/${item.id}`,article,
                                                            {
                                                                headers:{
                                                                    'Content-Type': 'application/json',
                                                                    'x-access-token': response.accessToken,
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
                        <TouchableOpacity onPress={()=>{navigation.navigate('billScreen', {response: response, product: cart})}}>
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
        marginLeft: 15,
        marginTop: 30,
    },
    returnText:{
        marginTop: 25,
        marginLeft: 127,
        fontWeight: 'bold',
        fontSize: 20,
        color: '#05375a'
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