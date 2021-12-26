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
import API from "../services/api";
export default function userScreen({navigation, route}){
    const{userData}=route.params;
    const[foodCategory, setfoodCategory]=useState([]);
    const[data, setData]=useState([]);
    const[dataSearch, setDataSearch]=React.useState({
        textSearch: '',
    });
    const[search, setSearch]=useState([]);
    const [click, setClick]=useState(false);
   

    
        const fetchfoodCategory = async() => {
            const result = await API.get("merchant/foodcategory/",
            {
                headers:{
                    'Content-Type': 'application/json',
                    'x-access-token': userData.accessToken
                    
                },
            });
            
            setfoodCategory(result.data.foodCategories);
            
        }

        useEffect(() => {
            fetchfoodCategory();
        },[setfoodCategory]);

        const renderItem=({item})=>{
            const itemFood =()=>{
                
                API.get(`foods/category/${item.id}`,
                {
                    headers:{
                        'Content-Type': 'application/json',
                        'x-access-token': userData.accessToken,
                        
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
        const textInputChange=(val)=>{
        
            setDataSearch({
                ...dataSearch,
                textSearch: val,
            });
        
    }
    const searchFood =()=>{
        //alert(dataSearch.textSearch);
        
        API.post(`foods/search`,{keyword: dataSearch.textSearch},
                {
                    headers:{
                        'Content-Type': 'application/json',
                        'x-access-token': userData.accessToken,
                    },
                })
                .then(res => {
                    //console.log(res.data.products);
                    
                   
                        setSearch(res.data.foods);
                        //console.log(res.data.foods);
                        setClick(true);
                 
                    
                }).catch(error => {
                        alert('Error', error.res);
                });
    }
    if(click===true) {
        return(
            <SafeAreaView>
                <View style={styles.return}>
                    <View style={styles.returnIcon}>
                        <TouchableOpacity onPress={()=>{setClick(false);}}>
                            <FontAwesome
                                name="arrow-left"
                                color="#05375a"
                                size={20}
                            />
                        </TouchableOpacity>
                    </View>
                    <Text style={styles.returnTextSearch}>Tìm kiếm món ăn</Text>
                   
                </View>
                <ScrollView>
                    <View>
                        {
                            search.map(item =>
                                <SafeAreaView key={item.id}>
                                    <TouchableOpacity onPress={()=>{navigation.navigate('foodDetailScreen', {userData: userData, foodId: item.id})}}>
                                        <View style={styles.container_food}>
                                            <Avatar.Image source={{uri:item.foodImage}} size={70}/>
                                            <View style={{flex: 15}}>
                                                <Text style={styles.textFoodTitle}>{item.foodName}</Text>
                                                
                                               
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
                                </SafeAreaView>
                                )
                        }
                    </View>
                </ScrollView>
            </SafeAreaView>
        );
    }

    return(
        <SafeAreaView>
            <View style={styles.return}>
                <View style={styles.returnIcon}>
                    <TouchableOpacity onPress={() => { navigation.goBack(); }}>
                        <FontAwesome
                            name="arrow-left"
                            color="#05375a"
                            size={20}
                        />
                    </TouchableOpacity>
                </View>
                <View style={styles.containerText}>
                    <Text style={styles.returnText}>Món ăn</Text>
                </View>
                <View style={styles.addProduct}>
                    <TouchableOpacity style={{ alignItems: 'center' }} onPress={() => {navigation.navigate('addNewFoodScreen',{ userData: userData, foodCategory: foodCategory})}}>
                        <FontAwesome
                            name="plus"
                            color="#05375a"
                            size={30}
                        />
                    </TouchableOpacity>
                </View>
            </View>
            <View style={styles.productFoodMargin}>
                <View style={styles.search}>
                        <TextInput 
                            placeholder ="Search here"
                            autoCapitalize='none'
                            style={styles.textInput}
                            placeholderStyle={{color:'#FF0000'}}
                            onChangeText={(val)=>textInputChange(val)}
                            
                        />
                        <TouchableOpacity onPress={searchFood}>
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
            <View style={styles.productFoodMargin}>
                <FlatList
                        horizontal={true}
                        data={foodCategory}
                        renderItem={renderItem}
                        keyExtractor={(item) =>item.id}/>
            </View>

            <View style={{marginBottom: 210}}>
            <FlatList
            data={data}
            renderItem={({item})=>
                <TouchableOpacity onPress={()=>{navigation.navigate('foodDetailScreen', {userData: userData, foodId: item.id})}}>
                    <View style={styles.container_food}>
                        <Avatar.Image source={{uri:item.foodImage}} size={70}/>
                        <View style={{flex: 15}}>
                            <Text style={styles.textFoodTitle}>{item.foodName}</Text>
                            
                            
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
            </View>
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
    return: {

        height: 60,
        backgroundColor: '#FFFFFF',
        flexDirection: 'row',

    },
    returnIcon: {
        flex: 4,
        marginBottom: 5,
        marginLeft: 10,
        justifyContent: 'flex-end',


    },
    returnText: {
        marginBottom: 5,
        fontWeight: 'bold',
        fontSize: 20,
        color: '#05375a',
    },
    containerText: {
        justifyContent: 'flex-end',
        flex: 4,
    },
    addProduct: {
        justifyContent: 'flex-end',
        flex: 2,
    },
    returnTextSearch:{
        marginTop: 25,
        marginLeft: 85,
        fontWeight: 'bold',
        fontSize: 20,
        color: '#05375a'
    }
});