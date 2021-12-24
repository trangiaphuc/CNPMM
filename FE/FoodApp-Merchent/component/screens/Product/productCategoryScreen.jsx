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
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import API from "../../services/api";
import {Card} from "react-native-elements";
import {useIsFocused } from '@react-navigation/native';
export default function productCategoryScreen({navigation, route}){
    const{userData}=route.params;
    const[category, setCategory]=useState([]);
    const isFocused = useIsFocused();
    

    const fetchdataCategory = async() => {
        const result =await API.get('merchant/productcategory/',
        {
            headers:{
                'Content-Type': 'application/json',
                'x-access-token': userData.accessToken

            },
        });
        //console.log(result.data.information);
        setCategory(result.data.productCategories);
        //console.log(data);
    }
    useEffect(async() => {
        await fetchdataCategory();
    },[isFocused]);
    
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
                    <Text style={styles.returnText}>Danh mục sản phẩm</Text>
                </View>
                <View style={styles.addProduct}>
                    <TouchableOpacity style={{ alignItems: 'center' }} onPress={() => {navigation.navigate('addNewProductCategoryScreen',{userData: userData})}}>
                        <FontAwesome
                            name="plus"
                            color="#05375a"
                            size={30}
                        />
                    </TouchableOpacity>
                </View>
            </View>
            <View>
                <ScrollView style={{height: '90%'}}>
                    {
                        category.map((item)=>
                        <View key={item.id}>
                            <Card containerStyle={{backgroundColor: '#FF9933', borderRadius: 5}}>
                                <View style={{flexDirection: 'row'}}>
                                    <View style={{flex: 1}}>
                                        <Text>{item.catName}</Text>
                                    </View>
                                    <View>
                                        <TouchableOpacity onPress={()=>{}}>
                                            <FontAwesome
                                                name="trash"
                                                color="#05375a"
                                                size={20}
                                            />
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </Card>
                        </View>
                        )
                    }
                </ScrollView>
                
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
        flex: 7,
    },
    addProduct: {
        justifyContent: 'flex-end',
        flex: 2,
    },
});