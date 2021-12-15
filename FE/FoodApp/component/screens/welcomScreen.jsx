import React, {useState, useEffect, useCallback}from "react";
import {
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
    Dimensions,
    Platform,
    TextInput,
    Form,
    Alert,
    FlatList,
    ScrollView,
    SafeAreaView
} from "react-native";
import{
    Avatar,
    Title,
    Caption,
    TouchableRipple
} from 'react-native-paper';
import API from "../services/api";
import {Card} from "react-native-elements";

import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {useIsFocused } from '@react-navigation/native';
export default function welcomScreen({navigation, route}){
    const{userData}=route.params;
    const[data, setData]=useState([]);
    const[favorites, setFavorites]=useState([]);
    const isFocused = useIsFocused();
    
    const[dataFavorites, setDataFavorites]=useState([]);

    


    const fetchdata = async() => {
        const result = await API.get(`user/information/${userData.id}`,
        {
            headers:{
                'Content-Type': 'application/json',
                'x-access-token': userData.accessToken
                
            },
        });
        //console.log(result.data.information);
        setData(result.data.information);
        //console.log(result.data.information.favoriteFoodCategory);
        //console.log(result.data.information);
        
    }
    const fetchFavorite = async() => {
        const result = await API.get(`user/${userData.id}/getFavorite/`,
        {
            headers:{
                'Content-Type': 'application/json',
                'x-access-token': userData.accessToken

            },
        });
        //console.log('Huy',result.data.FavoriteFoodCategory);
        setFavorites(result.data.FavoriteFoodCategory);
        //console.log(favorites.length);



    }
    
  
        const fetchDataFavorite = async() => {
            //console.log(data.favoriteFoodCategory);
          
            try{
                const result = await API.post("foods/favorite", {listFavoriteFoodCategory: data.favoriteFoodCategory},
                {
                    headers:{
                        'Content-Type': 'application/json',
                        'x-access-token': userData.accessToken
                    },
                });
                setDataFavorites(result.data.favoriteFoods);
                //console.log("3");
        
            } catch (err) {console.log(err);}
        }
    useEffect(async() => {
        await fetchdata();
        await fetchFavorite();
        await fetchDataFavorite();
    },[setData, setFavorites, isFocused]);
  



    // useEffect(() => {
    //     fetchFavorite().then(()=>{fetchDataFavorite().then(()=>{console.log('inner');}).catch(()=>{console.log('HHHHH')});}).catch((err) => {console.log(err)});
    //     console.log("run");
    // },[isFocused]);

    // useEffect(() => {
    //     fetchDataFavorite();
    // },[isFocused]);

  


    if(favorites.length===0){
        return (
            <View>
                <View style={styles.containerTitle}>
                    <Avatar.Image source={{uri: data.userAvatar}}/>
                    <View style={styles.title}>
                        <Text style={styles.textTitle}>{'Hello, '+ data.firstname +' '+ data.lastname +'!'}</Text>
                    </View>
                </View>
                <View>
                    <Text style={styles.caption}>Bạn muốn nấu món gì hôm nay?</Text>
                </View>
                <View style={styles.containerButton}>
                    <View style={styles.containerFood}>
                        <TouchableOpacity onPress={()=>{
                            navigation.jumpTo('Food');
                        }}>
                            <FontAwesome
                                name="bars"
                                color="#FF0000"
                                size={60}
                            />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.containerShop}>
                        <TouchableOpacity onPress={()=>{
                            navigation.jumpTo('Product');
                        }}>
                            <FontAwesome
                                name="shopping-cart"
                                color="#FF0000"
                                size={60}
                            />
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={styles.containerText}>
                    <View style={styles.textCaption}>
                        <Text style={styles.textCaptionDetail}>Món Ngon</Text>
                    </View>
                    <View style ={styles.textCaption}>
                        <Text style={styles.textCaptionDetail}>Mua sắm ngay</Text>
                    </View>
                </View>
                <View>
                    <Text style={styles.caption}>Danh mục món ăn yêu thích</Text>
                 
                    <TouchableOpacity onPress={()=>{navigation.navigate('favoriteFoodScreen',{userData: userData})}}>
                   <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
                        <Text style={styles.addFavoriteFood}>Thêm món ăn yêu thích</Text>
                        <View>
                            <FontAwesome
                                        name="plus"
                                        color="#FF0000"
                                        size={20}
                                    />
                            </View>
                    </View>
                </TouchableOpacity>
                </View>
            </View>
        );
    } else {
        
        return (
            <View>
                <View style={styles.containerTitle}>
                    <Avatar.Image source={{uri: data.userAvatar}}/>
                    <View style={styles.title}>
                        <Text style={styles.textTitle}>{'Hello, '+ data.firstname +' '+ data.lastname +'!'}</Text>
                    </View>
                </View>
                <View>
                    <Text style={styles.caption}>Bạn muốn nấu món gì hôm nay?</Text>
                </View>
                <View style={styles.containerButton}>
                    <View style={styles.containerFood}>
                        <TouchableOpacity onPress={()=>{
                            navigation.jumpTo('Food');
                        }}>
                            <FontAwesome
                                name="bars"
                                color="#FF0000"
                                size={60}
                            />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.containerShop}>
                        <TouchableOpacity onPress={()=>{
                            navigation.navigate('Product');
                        }}>
                            <FontAwesome
                                name="shopping-cart"
                                color="#FF0000"
                                size={60}
                            />
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={styles.containerText}>
                    <View style={styles.textCaption}>
                        <Text style={styles.textCaptionDetail}>Món Ngon</Text>
                    </View>
                    <View style ={styles.textCaption}>
                        <Text style={styles.textCaptionDetail}>Mua sắm ngay</Text>
                    </View>
                </View>
                <View style={styles.card}>
                    <Text style={styles.caption}>Danh mục món ăn yêu thích</Text>
                    
                    
                    <View>
                    <FlatList
                        horizontal={true}
                        data={dataFavorites}
                        renderItem={({item})=>
                            <TouchableOpacity onPress={()=>{navigation.navigate('foodDetailScreen', {userData: userData, foodId: item.id})}}>
                                <Card>
                                    <View style={{marginTop: 40}}>
                                        <Card.Image source={{uri: item.foodImage}}/>
                                    </View>
                                    <Card.Divider/>
                                    
                                    {/* <View style={styles.food}>
                                        <Text style={styles.textFood}>{item.foodName}</Text>
                                    </View> */}
                                    <Card.Title style={{width:220, height: 70}}>{item.foodName}</Card.Title>
                                    <Card.Divider/>
                                </Card>
                            </TouchableOpacity>
                        }
                        keyExtractor={(item) =>item.id}
                        
                        />
                    </View>
                    
                    
                    {/* <View style={{marginBottom: 300}}>
                        <ScrollView>
                            {
                            dataFavorites.map((item) => 
                                <SafeAreaView key ={item.id}>
                                    <TouchableOpacity onPress={()=>{navigation.navigate('foodDetailScreen', {userData: userData, foodId: item.id})}}>
                                        <Card>
                                            <Card.Image source={{uri: item.foodImage}}/>
                                            <Card.Divider/>
                                            
                                            <View style={styles.food}>
                                                <Text style={styles.textFood}>{item.foodName}</Text>
                                            </View>
                                            <Card.Divider/>
                                        </Card>
                                    </TouchableOpacity>
                                </SafeAreaView>
                            )
                            }
                        </ScrollView>
                    </View> */}
                </View>
            </View>
        );
    }
    
}
const styles = StyleSheet.create({
    containerTitle:{
        marginTop: 50,
        flexDirection: 'row',
        marginLeft: 15,
    },
    textTitle:{
        fontSize: 25,
        fontWeight: 'bold',
        color: '#800000',
    },
    title: {
        marginLeft: 10,
        justifyContent: 'center',
    },
    caption:{
        marginTop:60,
        fontSize: 18,
        marginLeft: 20,
        color: '#800000'
    },
    containerButton:{
        marginTop: 20,
        marginLeft: 15,
        marginRight: 15,
        flexDirection: 'row',
        height: 90,
    },
    containerFood:{
        flex: 1,
        alignItems: 'center',
        borderWidth: 1,
        marginRight: 7,
        borderRadius: 15,
        borderColor: '#FF0000',
        justifyContent: 'center',
    },
    containerShop:{
        flex: 1,
        alignItems: 'center',
        borderWidth: 1,
        marginLeft: 7,
        borderRadius: 15,
        borderColor: '#FF0000',
        justifyContent: 'center',
    },
    containerText:{
        flexDirection: 'row',
        justifyContent: 'center',
  
    },
    textCaption:{
        flex: 1,
        alignItems: 'center',
    },
    textCaptionDetail:{
        fontWeight: 'bold',
        color: '#FF0000',
        fontSize: 20,
    },
    addFavoriteFood:{
        fontWeight: 'bold',
        marginTop: 10,
        marginLeft: 30,
        color: '#FF0000'

    },
    food:{
        width: 220,
        alignItems: 'center',
    },
    textFood:{
        fontWeight: 'bold',
        marginLeft: 70
    },
    card:{
        marginLeft: 15,
        marginRight: 15,
    },
    cardFood:{
        marginBottom: 1,
    }
});