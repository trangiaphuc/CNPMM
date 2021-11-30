import React,{useState, useEffect} from "react";
import {View, Text, TextStyle, SafeAreaView, StyleSheet, ScrollView, Image} from "react-native";
import axios from "axios";
import{
    Avatar,
    Title,
    Caption,
    TouchableRipple
} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
export default function foodDetailScreen({route, navigation}){
    const {foodId, response}=route.params;
    const[data, setData]=useState([]);
    const fetchdata = async() => {
        const result = await axios.get(`http://192.168.1.13:8080/api/foods/detail/${foodId}`,
        {
            headers:{
                'Content-Type': 'application/json',
                'x-access-token': response.accessToken
                
            },
        });
        console.log(result.data.food);
        setData(result.data.food);
        
    }

    useEffect(() => {
        fetchdata();
    },[setData]);
    return(
        
        <View>
            <Text>Huy</Text>
        </View>
    );
}