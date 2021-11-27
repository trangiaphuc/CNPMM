import React,{useState, useEffect} from "react";
import {View, Text, TextStyle, SafeAreaView, StyleSheet, ScrollView, FlatList, Dimensions,Image } from "react-native";
import axios from "axios";
import{
    Avatar,
    Title,
    Caption,
    TouchableRipple
} from 'react-native-paper';
import {Card} from "react-native-elements";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
export default function userScreen({navigation, route}){
    const{response}=route.params;
    const[foodCategory, setfoodCategory]=useState([]);
   

    
        const fetchfoodCategory = async() => {
            const result = await axios.get("http://192.168.1.6:8080/api/foodcategory/",
            {
                headers:{
                    'Content-Type': 'application/json',
                    'x-access-token': response.accessToken
                    
                },
            });
            //console.log(result.data.foodCategories);
            //console.log(result.foodCategory.information);
            setfoodCategory(result.data.foodCategories);
            
        }

        useEffect(() => {
            fetchfoodCategory();
        },[setfoodCategory]);

        const renderItem=({item})=>{
            return(
                <View style={styles.container}>
                                    <Card>
                                        <Card.Title>{item.catName}</Card.Title>
                                        <Card.Divider/>
                                        <Card.Image source = {{uri:'https://hitasanti.com/wp-content/uploads/2020/05/hita-chay-cac-mon-chay-ngon-de-lam-5-1232x800.jpg'}} />

                                    </Card>
                </View>
                   
                
            );
        }
   



    return(
        <SafeAreaView>
            <FlatList
                    
                    data={foodCategory}
                    numColumns={2}
                    renderItem={renderItem}
                    keyExtractor={(item) =>item.id}/>
        </SafeAreaView>
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop:30,
    },
    
});