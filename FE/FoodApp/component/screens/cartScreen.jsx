import React, {useState, useEffect} from "react";
import {View, Text, FlatList, SafeAreaView, StyleSheet, TouchableOpacity, Image, RefreshControl} from "react-native"
import axios from "axios";
import {Card} from "react-native-elements";
import NumericInput from 'react-native-numeric-input';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import API from "../services/api";

export default function historyScreen({navigation, route}){
    const{response}=route.params;
    const[cart, setCart]=useState([]);
    const [isFetching, setIsFetching] = useState(false);



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
        }

    return(
        
        <SafeAreaView>
            <FlatList
            data={cart}
            renderItem={({item})=>
            <Card>
                <View style={styles.cardItem}>
                        <View>
                            <Text>{item.product.proName}</Text>
                            <NumericInput
                                minValue={0}
                                maxValue={50}
                                step={1}
                                initValue={item.quantity}
                                totalHeight={40}
                                onChange={(val) =>onChange(val)}
                                rounded/>
                        </View>
                        <View style={styles.deleteItem}>
                            <TouchableOpacity onPress={()=>{
                                // console.log(item.id);
                                
                                const article ={title: "Huy"};


                                API.put(`cart/${response.id}/deleteCartItem/${item.id}`,article,
                                                    {
                                                        headers:{
                                                            'Content-Type': 'application/json',
                                                            'x-access-token': response.accessToken,
                                                        },
                                                    })
                                                    .then(res => {
                                                        console.log(res.data);
                                                        
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
    }
});