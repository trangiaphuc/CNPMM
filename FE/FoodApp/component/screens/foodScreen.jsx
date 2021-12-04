import React,{useState, useEffect} from "react";
import {View, Text, TextStyle, SafeAreaView, StyleSheet, ScrollView, FlatList, Dimensions,Image, TouchableOpacity, TextInput} from "react-native";
import axios from "axios";
import{
    Avatar,
    Title,
    Caption,
    TouchableRipple
} from 'react-native-paper';
import {Card} from "react-native-elements";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import FontAwesome from 'react-native-vector-icons/FontAwesome';
export default function userScreen({navigation, route}){
    const{response}=route.params;
    const[foodCategory, setfoodCategory]=useState([]);
    const[data, setData]=useState([]);
   

    
        const fetchfoodCategory = async() => {
            const result = await axios.get("http://192.168.1.31:8080/api/foodcategory/",
            {
                headers:{
                    'Content-Type': 'application/json',
                    'x-access-token': response.accessToken
                    
                },
            });
            
            setfoodCategory(result.data.foodCategories);
            
        }

        useEffect(() => {
            fetchfoodCategory();
        },[setfoodCategory]);

        const renderItem=({item})=>{
            const itemFood =()=>{
                
                axios.get(`http://192.168.1.31:8080/api/foods/category/${item.id}`,
                {
                    headers:{
                        'Content-Type': 'application/json',
                        'x-access-token': response.accessToken,
                        
                    },
                })
                .then(response => {
                    setData(response.data.foods)
                    
                    
                }).catch(error => {
                        alert('Error', error.response);
                    
                });
            }
            
            return(
                    <TouchableOpacity onPress={itemFood}>
                        <View style={styles.container}>
                            <View style={styles.image}>
                                <Avatar.Image source={{uri:item.catIcon}} size={30}/>
                            </View>
                            <View style={styles.textarea}>
                                <Text style={styles.text_product}>{item.catName}</Text>
                            </View>
                            
                        </View>
                    </TouchableOpacity>
                        
                    
            );
        }
       
    return(
        <SafeAreaView style={styles.productFoodMargin}>
            <View>
                <View style={styles.search}>
                        <TextInput 
                            placeholder ="Search here"
                            autoCapitalize='none'
                            style={styles.textInput}
                            placeholderStyle={{color:'#FF0000'}}
                            
                        />
                        <TouchableOpacity onPress={()=>{}}>
                            <View style={styles.iconSearch}>
                                <FontAwesome
                                    name="search"
                                    color="#05375a"
                                    size={20}
                                />
                            </View>
                        </TouchableOpacity>
                    
                </View>
            </View>
            <FlatList
                    horizontal={true}
                    data={foodCategory}
                    renderItem={renderItem}
                    keyExtractor={(item) =>item.id}/>

            <FlatList
            data={data}
            renderItem={({item})=>
                <TouchableOpacity onPress={()=>{navigation.navigate('foodDetailScreen', {response: response, foodId: item.id})}}>
                    <View style={styles.container_food}>
                        <Avatar.Image source={{uri:item.foodImage}} size={70}/>
                        <View style={{flex: 15}}>
                            <Text style={styles.textFoodTitle}>{item.foodName}</Text>
                            <View style={{flexDirection: 'row'}}>
                                <Text style={styles.textFood}>Calories:</Text>
                                <Text style={styles.textFood}>{item.foodCalories}</Text>
                            </View>
                            <View style={{flexDirection: 'row'}}>
                                <Text style={styles.textFood}>Mô tả:</Text>
                                <Text style={styles.textFood}>{item.foodDescription}</Text>
                            </View>
                        </View>
                        
                        <View style={{flex: 1, marginTop: 13}}>
                            <FontAwesome
                                name="angle-right"
                                color="#05375a"
                                size={20}
                                />
                        </View>
                    </View>
                </TouchableOpacity>
            }
            keyExtractor={(item) =>item.id}/>
        </SafeAreaView>
    );
}
const styles = StyleSheet.create({
    container: {
        marginTop:10,
        marginLeft: 3,
        borderWidth: 1,
        borderRadius: 20,
        borderColor: '#FF4B3A',
        flexDirection: 'row'
        
       
    },
    container_product:{
        borderColor: '#FF4B3A',
        borderRadius: 50,
        marginBottom: 2,
        marginLeft: 3,
    },
    item: {
        
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
    text_product: {
        color: '#FF4B3A',
        fontSize: 18,
        paddingLeft: 5,
    },
    productFoodMargin:{
        marginLeft: 15,
        marginRight: 15
    },
    text_product: {
        color: '#FF4B3A',
        fontSize: 18
    },
    textarea:{
        padding: 5,
    },
    image: {
        padding:3,
    },
    container_food: {
        marginLeft: 15,
        marginRight: 15,
        marginTop: 20,
        flexDirection: 'row',
        borderBottomWidth: 0.5,
    },
    textFoodTitle:{
        marginLeft: 10,
        fontSize: 18,
        fontWeight: 'bold',
    },
    textFood:{
        marginLeft: 10,
        fontSize: 15,
    },
    iconFood:{
        marginTop: 20,
    },
    search:{
        marginTop:5,
        borderWidth: 0.5,
        borderRadius: 15,
        marginLeft: 5,
        marginRight: 5,
        flexDirection: 'row',
        height: 35
    },  
    iconSearch:{
        marginTop: 5,
        marginRight: 15
    },
    textInput: {
        flex: 1,
        paddingLeft: 15,
        color: '#05375a',
    },
});