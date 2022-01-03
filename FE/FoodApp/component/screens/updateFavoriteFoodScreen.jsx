import React, {useState, useEffect} from "react";
import API from "../services/api";
import {View, Text, FlatList, SafeAreaView, StyleSheet, TouchableOpacity} from "react-native";
import {Card} from "react-native-elements";
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import{
    Avatar,
} from 'react-native-paper';


export default function favoriteFoodScreen({navigation, route}){

    const{userData}=route.params;
    const [data, setData] =React.useState([]);


    const [listCatFav, setListCatFav] = useState([]);

    const fetchdata = async() => {
        const result = await API.get("foodcategory/",
        {
            headers:{
                'Content-Type': 'application/json',
                'x-access-token': userData.accessToken
                
            },
        });
        

        setData(result.data.foodCategories);
        
    }
    const fetchFavouriteCategory = async() => {
        const result= await API.get(`user/${userData.id}/getFavorite/`,
        {
            headers:{
                'Content-Type': 'application/json',
                'x-access-token': userData.accessToken,
        },
        });
        var listFavCategory = [];
        
        result.data.FavoriteFoodCategory.forEach(favCategory => {
            listFavCategory.push(favCategory.foodCategoryId);
        });
        setListCatFav(listFavCategory);
        
        //console.log(listFavCategory);
    }

    useEffect(async() => {
        await fetchFavouriteCategory();
        
        await fetchdata();
    },[setListCatFav, setData]);


    const FavouriteSet = (item)=>{

        if(listCatFav.includes(item.id)==true){
            return(
                
                    <Card containerStyle={{ backgroundColor: '#FF4B3A', borderRadius: 5}}>
                        <TouchableOpacity onPress={()=>{
                            //listCatFav.pop(item.id);
                            const index = listCatFav.indexOf(item.id);
                            //console.log('Before',listCatFav);
                            listCatFav.splice(index, 1);
                            API.post(`user/updateFavorite/`,{userId: userData.id, newFavorites: listCatFav},
                            {
                                headers:{
                                    'Content-Type': 'application/json',
                                    'x-access-token': userData.accessToken,
                                },
                            })
                            .then(res => {
                                if (res.status ==201){
                                    fetchFavouriteCategory();
                                }
                            }).catch(error => {
                                console.log('Error', error.res);
                            });
                            //console.log('After',listCatFav);
                        }}>
                            <View style={styles.iconTittle}>
                                <View style={styles.image}>
                                    <Avatar.Image source={{uri: item.catIcon}} size={100}/>
                                </View>
                                <View style={styles.text}>
                                    <Card.Title>{item.catName}</Card.Title>
                                </View>
                            </View>
                            
                        </TouchableOpacity>
                    </Card>
            );
        }
        else{
            return(
                <Card containerStyle={{borderRadius: 5}}>
                    <TouchableOpacity onPress={()=>{
                        API.post(`user/addFavorite/`,{userId: userData.id, favorites: [item.id]},
                        {
                            headers:{
                                'Content-Type': 'application/json',
                                'x-access-token': userData.accessToken,
                            },
                        })
                        .then(res => {
                            if (res.status ==201){
                                fetchFavouriteCategory();
                            }
                        }).catch(error => {
                            console.log('Error', error.res);
                        });
                    }}>
                        <View style={styles.iconTittle}>
                            <View style={styles.image}>
                                <Avatar.Image source={{uri: item.catIcon}} size={100}/>
                            </View>
                            <View style={styles.text}>
                                <Card.Title>{item.catName}</Card.Title>
                            </View>
                                
                        </View>
                    </TouchableOpacity>
                    
                </Card>
            );
        }
       
        
    }
    
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
                    FavouriteSet(item)
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
        
        marginRight: 30,
    },
    text:{
        
        alignItems: 'center',
        justifyContent: 'center',
    },
    iconHeart:{
        marginLeft: 60,
        justifyContent: 'center',
        flex: 2,
    },
    btnPress:{
        borderColor: '#FFFFFF'
    },
    btnNormal:{
        borderColor: '#05375a'
    }
});