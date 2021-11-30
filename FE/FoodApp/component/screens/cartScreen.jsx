import React, {useState, useEffect} from "react";
import {View, Text, FlatList, SafeAreaView} from "react-native"
import axios from "axios";
import {Card} from "react-native-elements";
export default function historyScreen({navigation, route}){
    const{response}=route.params;
    const[cart, setCart]=useState([]);


    axios.get(`http://192.168.1.33:8080/api/cart/${response.id}`,
                {
                    headers:{
                        'Content-Type': 'application/json',
                        'x-access-token': response.accessToken,
                        
                    },
                })
                .then(res => {
                    setCart(res.data.cart.cartDetails);
                    
                    
                }).catch(error => {
                        alert('Error', error.res);
                    
                });


   
    

    return(
        
        <SafeAreaView>
            <FlatList
            data={cart}
            renderItem={({item})=>
            <Card>
                <Text>{item.product.proName}</Text>
                <Text>{item.quantity}</Text>
            </Card>
        }
            keyExtractor={(item) =>item.id}/>
        </SafeAreaView>
    );
}