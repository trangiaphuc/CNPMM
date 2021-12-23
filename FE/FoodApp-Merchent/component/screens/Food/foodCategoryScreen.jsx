import React,{useState, useEffect} from "react";
import {
    View,
    Text,
    TextStyle,
    SafeAreaView,
    StyleSheet,
    ScrollView,
    FlatList,
    Dimensions,
    Image,
    TouchableOpacity,
    TextInput
} from "react-native";
import { Avatar } from "react-native-paper";
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import API from "../../services/api";
import {Card} from "react-native-elements";
import {useIsFocused } from '@react-navigation/native';
export default function productCategoryScreen({navigation, route}){
    const{userData}=route.params;
    const[category, setCategory]=useState([]);
    const isFocused = useIsFocused();
    

    const fetchdataCategory = async() => {
        const result = await API.get('merchant/foodcategory/',
        {
            headers:{
                'Content-Type': 'application/json',
                'x-access-token': userData.accessToken
            },
        });
        //console.log(result.data.information);
        setCategory(result.data.foodCategories);
        //console.log(data);
    }
    useEffect(() => {
        fetchdataCategory();
    },[setCategory, isFocused]);

    const ButtonSet=(item)=>{
        return (
            <TouchableOpacity onPress={()=>{}}>
                <FontAwesome
                    name="trash"
                    color="#05375a"
                    size={20}
                />
            </TouchableOpacity>
        );
    }
    
    return (
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
                    <Text style={styles.returnText}>Danh mục món ăn</Text>
                </View>
                <View style={styles.addProduct}>
                    <TouchableOpacity style={{ alignItems: 'center' }} onPress={() => {navigation.navigate('addFoodCategoryScreen',{userData: userData})}}>
                        <FontAwesome
                            name="plus"
                            color="#05375a"
                            size={30}
                        />
                    </TouchableOpacity>
                </View>
            </View>
            
                <ScrollView style={{height: '92%',}}>
                    {
                        category.map((item)=>
                        <View key={item.id}>
                            <Card containerStyle={{backgroundColor: '#FF9933', borderRadius: 5}}>
                                <View style={{flexDirection: 'row'}}>
                                    <View style={{marginRight: 20}}>
                                        <Avatar.Image source={{uri: item.catIcon}} size={50}/>
                                    </View>
                                    <View style={{flex: 1, justifyContent: 'center'}}>
                                        <Text style={{fontWeight: 'bold'}}>{item.catName}</Text>
                                    </View>
                                    <View style={{justifyContent: 'center'}}>
                                        {
                                            ButtonSet(item)
                                        }
                                        
                                    </View>
                                </View>
                            </Card>
                        </View>
                        )
                    }
                </ScrollView>
            
        </SafeAreaView>
    );
}
const styles = StyleSheet.create({
    return: {

        height: 60,
        backgroundColor: '#FFFFFF',
        flexDirection: 'row',

    },
    returnIcon: {
        flex: 3,
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
        flex: 5,
    },
    addProduct: {
        justifyContent: 'flex-end',
        flex: 2,
    },
});