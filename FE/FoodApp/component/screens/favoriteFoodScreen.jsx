import React, {useState, useEffect} from "react";
import API from "../services/api";
import {View, Text, FlatList, SafeAreaView, StyleSheet, ScrollView, TouchableOpacity, Button, TextInput, Item} from "react-native";
import axios from "axios";
import {Card} from "react-native-elements";
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import{
    Avatar,
    Title,
    Caption,
    TouchableRipple
} from 'react-native-paper';


export default function favoriteFoodScreen({navigation, route}){

    const{response}=route.params;
    const [data, setData] =React.useState([]);
    const fetchdata = async() => {
        const result = await API.get("foodcategory/",
        {
            headers:{
                'Content-Type': 'application/json',
                'x-access-token': response.accessToken
                
            },
        });
        //console.log(result.data.foodCategories);
        setData(result.data.foodCategories);
        //console.log(data);
        
    }

    useEffect(() => {
        fetchdata();
    },[setData]);
    
    return (
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
                <Text style={styles.returnText}>Thêm danh mục món ăn yêu thích</Text>
            </View>
            <View style={styles.listFood}>
                <FlatList
                data={data}
                renderItem={({item})=>
                    <Card>
                        <View style={styles.iconTittle}>
                            <View style={styles.image}>
                                <Avatar.Image source={{uri: item.catIcon}} size={100}/>
                            </View>
                            <View style={styles.text}>
                                <Card.Title>{item.catName}</Card.Title>
                            </View>
                            <View style={styles.iconHeart}>
                                <TouchableOpacity onPress={()=>{
                                    API.post(`user/addFavorite/`, {userId: response.id, favorites:[item.id]},
                                    {
                                        headers:{
                                            'Content-Type': 'application/json',
                                            'x-access-token': response.accessToken,
                                        },
                                    })
                                    .then(res => {
                                        alert('Bạn đã thêm' + ' ' + item.catName + ' ' + 'vào danh mục món ăn yêu thích');
                                    }).catch(error => {
                                            alert('Error', error.res);
                                        
                                    });
                                }}>
                                    <FontAwesome
                                        name="heart-o"
                                        color="#05375a"
                                        size={40}
                                    />
                                </TouchableOpacity>
                            </View>
                        </View>
                        <Card.Divider/>
                        
                        
                    </Card>
                }
                keyExtractor={(item) =>item.id}
                />
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
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
        fontWeight: 'bold',
        fontSize: 20,
        color: '#05375a',
        marginLeft: 20,
    },
    listFood:{
        marginBottom: 130,
    },
    iconTittle:{
        flexDirection: 'row',
    },
    image:{
        flex: 2,
        marginRight: 30,
    },
    text:{
        flex: 3,
        alignItems: 'center',
        justifyContent: 'center',
    },
    iconHeart:{
        marginLeft: 40,
        justifyContent: 'center',
        flex: 2,
    }
});