import React, {useState, useEffect, useCallback} from "react";
import {View, Text, FlatList, SafeAreaView, StyleSheet, TouchableOpacity, Image, RefreshControl} from "react-native"
import axios from "axios";
import {Card} from "react-native-elements";
import NumericInput from 'react-native-numeric-input';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import API from "../services/api";

export default function historyScreen({navigation, route}){
    const{response}=route.params;
    const[cart, setCart]=useState([]);
    const[quantity, setQuantity]=useState('2');


    const fetchdata = async() => {
        const result = await API.get(`cart/${response.id}`,
        {
            headers:{
                'Content-Type': 'application/json',
                'x-access-token': response.accessToken
                
            },
        });
        setCart(result.data.cart.cartDetails);
    }

    useEffect(() => {
        fetchdata();
    },[setCart]);

   
  
        const onChange=(val)=>{
            setQuantity(val);
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
            <FlatList
            data={cart}
            renderItem={({item})=>
            <Card>
                <Card.Image source={{uri: item.product.productImage}}/>
                <View style={styles.cardItem}>
                        <View>
                            <Text>{item.product.proName}</Text>
                            <NumericInput
                                minValue={0}
                                maxValue={50}
                                step={1}
                                totalHeight={40}
                                onChange={(val) =>onChange(val)}
                                rounded/>
                        </View>
                        <View style={styles.deleteItem}>
                            <TouchableOpacity onPress={()=>{
                                
                                // console.log(item.id);
                                
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
        }
            keyExtractor={(item) =>item.id}
            
            />
        </SafeAreaView>
    );
}
const styles = StyleSheet.create({
    cardItem:{
        flexDirection: 'row',
        alignItems: 'center',
        
    },
    deleteItem:{
        marginLeft: 180,
        
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
    }
});