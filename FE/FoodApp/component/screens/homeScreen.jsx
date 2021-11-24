import React, {useState, useEffect} from "react";
import {View, Text, FlatList, SafeAreaView, StyleSheet, ScrollView, TouchableOpacity, Button} from "react-native";
import axios from "axios";
import {Card} from "react-native-elements";
import {LinearGradient} from 'expo-linear-gradient';

export default function homeScreen({navigation, route}){
    const{response}=route.params;
    //var products=[];
    const[data, setData]=useState([]);
    const[productCategory, setProductCategory]=useState([]);
    //console.log(response);



    const fetchdata = async() => {
        const result = await axios.get("http://192.168.1.34:8080/api/productcategory/",
        {
            headers:{
                'Content-Type': 'application/json',
                'x-access-token': response.accessToken
                
            },
        });
        //console.log(result);
        setData(result.data.productCategories);
        //console.log(data);
        
    }

    useEffect(() => {
        fetchdata();
    },[setData]);

    const renderItem=({item})=> {
        const itemCategory=()=> {
            axios.get(`http://192.168.1.34:8080/api/products/category/${item.id}`,
                {
                    headers:{
                        'Content-Type': 'application/json',
                        'x-access-token': response.accessToken,
                        
                    },
                })
                .then(response => {
                    //console.log(response.data.products);
                    setProductCategory(response.data.products)
                    console.log(productCategory);
                }).catch(error => {
                        alert('Error', error.response);
                    
                });
        }


        return(
            <TouchableOpacity onPress={itemCategory}>
                <View style={styles.container_product}>
                    <View style={[styles.item, {
                            
                            flex: 1,
                            flexDirection: 'row',
                        }]}>
                        <Text style={styles.text_product}>{item.catName}</Text>
                    </View>
                </View>
            </TouchableOpacity>
            
        );
    }
   

    return(
        
        <SafeAreaView style={styles.productContainer}>



            
            <View style={styles.productMargin}>
                <ScrollView>
                    <FlatList
                    horizontal={true}
                    data={data}
                    renderItem={renderItem}
                    keyExtractor={(item) =>item.id}/>
                </ScrollView>
            </View>



            
                
                <FlatList
                    data={productCategory}
                    renderItem={({item})=>
                        
                            <View>
                                <Card>
                                <Card.Title>{item.proName}</Card.Title>
                                <Card.Divider/>
                                <Card.Image source = {{uri:item.productImage}} />

                                <View style={{flex: 1, flexDirection: 'row', padding:10}}>
                                    <Text style={{flex: 1}}>Số lượng</Text>
                                    <Text style={{flex: 1}}>{item.quantityValue}</Text>
                                </View>
                                <View style={{flex: 1, flexDirection: 'row', padding:10}}>
                                    <Text style={{flex: 1}}>Giá</Text>
                                    <Text style={{flex: 1}}>{item.price}đ</Text>
                                </View>
                                <View style={{flex: 1, flexDirection: 'row', padding:10}}>
                                    <Text style={{flex: 1}}>Chi nhánh</Text>
                                    <Text style={{flex: 1}}>{item.brand}</Text>
                                </View>
                                <View style={{flex: 1, flexDirection: 'row', padding:10}}>
                                    <Text style={{flex: 1}}>Xuất xứ:</Text>
                                    <Text style={{flex: 1}}>{item.origin}</Text>
                                </View>
                                <View style={{flex: 1, flexDirection: 'row', padding:10}}>
                                    <Text style={{flex: 1}}>Cách sử dụng:</Text>
                                    <Text style={{flex: 1}}>{item.manual}</Text>
                                </View>
                                <View style={{flex: 1, flexDirection: 'row', padding:10}}>
                                    <Text style={{flex: 1}}>Hạn sử dụng</Text>
                                    <Text style={{flex: 1}}>{item.preserve}</Text>
                                </View>
                                <View style={{flex: 1, flexDirection: 'row', padding:10}}>
                                    <Text style={{flex: 1}}>Chi tiết</Text>
                                    <Text style={{flex: 1}}>{item.proDescription}</Text>
                                </View>
                                <Card.Divider/>
                                <View style={styles.button}>
                                    <TouchableOpacity onPress={()=>{}}>
                                            <LinearGradient
                                                colors={['#FF4B3A','#FF4B3A']}
                                                style={styles.signIn}>
                                                <Text style={styles.textSign}>Thêm vào giỏ hàng</Text>
                                            </LinearGradient>
                                    </TouchableOpacity>
                                </View>
                            </Card>
                            </View>
                    
                    }
                    keyExtractor = {(item) => item.id}/>
            
                
        </SafeAreaView>
        


    );
}
const styles = StyleSheet.create({
    item: {
        padding: 5,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
    container: {
        flex: 1,
    },
    row: {
        flexDirection: 'row',
        marginBottom: 10,
    },
    container_product:{
        marginTop: 30,
        borderWidth: 1,
        borderColor: '#FF4B3A',
        borderRadius: 50,
        marginBottom: 2,
        marginLeft: 3,
    },
    button: {
        alignItems: 'flex-end',
    },
    signIn: {
        width: 150,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 50,
        flexDirection: 'row'
    },
      textSign: {
        color: 'white',
        fontWeight: 'bold'
    },
    text_product: {
        color: '#FF4B3A',
        fontSize: 18
    },
    productContainer:{
        marginBottom: 65,
    },
    productMargin:{
        marginLeft: 15,
        marginRight: 15
    }
});