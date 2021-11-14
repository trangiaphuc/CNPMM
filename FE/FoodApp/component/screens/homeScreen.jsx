import React from "react";
import {View, Text, FlatList} from "react-native";
import axios from "axios";
export default function homeScreen({navigation, route}){
    const{response}=route.params;
    var products=[];
    //console.log(response);


    axios.get("http://192.168.1.30:8080/api/productcategory/",
                {
                    headers:{
                        'Content-Type': 'application/json',
                        'x-access-token': response.accessToken
                        
                    },
                })
                .then(res => {
                   
                    products=res.data;
                    console.log(products);
                }).catch(error => {
                        alert('Error', error.res);
                    
                });


    return(
        <View>
            <Text>{products}</Text>
        </View>
        
    );
}