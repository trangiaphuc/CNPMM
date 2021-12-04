import {
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
    Dimensions,
    Platform,
    TextInput,
    Form,
    Alert
} from "react-native";
import {Card} from "react-native-elements";
import axios from "axios";
import {LinearGradient} from 'expo-linear-gradient';
import React, {useState, useEffect} from "react";
import API from "../services/api";
import NumericInput from 'react-native-numeric-input';
export default function productDetailScreen({route, navigation}){
    const {productId, response}=route.params;
    //console.log(productId);
    const [productDetail, setProductDetail]=useState([]);
    const [quantityValue, setQuantityValue] =useState([]);
    
    const fetchdata = async() => {
        const result = await API.get(`products/detail/${productId}`,
        {
            headers:{
                'Content-Type': 'application/json',
                'x-access-token': response.accessToken
                
            },
        });
        //console.log(result);
        setProductDetail(result.data.product);
        //console.log(result.data.product);
        
    }

    useEffect(() => {
        fetchdata();
    },[setProductDetail]);




    
    const onChange=(value)=>{
        setQuantityValue(value);
    }


    return(
        <View style={styles.container}>
            <Card>
                <Card.Title>{productDetail.proName}</Card.Title>
                <Card.Divider/>
                <Card.Image source = {{uri:productDetail.productImage}} />
                
                <View style={styles.price}>
                    <Text style={{flex: 1}}>Giá:</Text>
                    <Text style={{flex: 1}}>{productDetail.price}đ/kg</Text>
                </View>
                <View style={styles.price}>
                    <Text style={{flex: 1}}>Còn lại:</Text>
                    <Text style={{flex: 1}}>{productDetail.quantityValue}</Text>
                </View>
                <View style={styles.price}>
                    <Text style={{flex: 1}}>Thương hiệu:</Text>
                    <Text style={{flex: 1}}>{productDetail.brand}</Text>
                </View>
                <View style={styles.price}>
                    <Text style={{flex: 1}}>Xuất xứ:</Text>
                    <Text style={{flex: 1}}>{productDetail.origin}</Text>
                </View>
                <View style={styles.price}>
                    <Text style={{flex: 1}}>Cách dùng:</Text>
                    <Text style={{flex: 1}}>{productDetail.manual}</Text>
                </View>
                <View style={styles.price}>
                    <Text style={{flex: 1}}>Hạn sử dụng:</Text>
                    <Text style={{flex: 1}}>{productDetail.preserve}</Text>
                </View>
                <View style={styles.price}>
                    <Text style={{flex: 1}}>chi tiết:</Text>
                    <Text style={{flex: 1}}>{productDetail.proDescription}</Text>
                </View>
                
                <Card.Divider/>
                <View style={styles.addQuantityToCart}>
                    <View style={{marginRight: 20}}>
                        <NumericInput
                            minValue={1}
                            maxValue={50}
                            step={1}
                            totalHeight={40}
                            onChange={(value) =>onChange(value)}
                            rounded/>
                    </View>
                    <View style={styles.button}>
                        <TouchableOpacity onPress={()=>{
                            API.post(`cart/${response.id}/addCartItem`,{listCartItems: [{productId: productDetail.id, quantity: quantityValue}]},
                            {
                                headers:{
                                    'Content-Type': 'application/json',
                                    'x-access-token': response.accessToken,
                                    
                                },
                            })
                            .then(res => {
                                if(res.status===201)
                                {
                                    alert(res.data.message);
                                    //navigation.params.resetData();
                                    // RNRestart.Restart();
                                }
                                
                            }).catch(error => {
                                    //alert('Error', error.res);
                                    console.log(error.res);
                                
                            });
                        }}>
                            <LinearGradient
                                colors={['#FF4B3A','#FF4B3A']}
                                style={styles.signIn}>
                                <Text style={styles.textSign}>Thêm vào giỏ hàng</Text>
                            </LinearGradient>
                        </TouchableOpacity>
                    </View>
                </View>
            </Card>
        </View>
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
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
    price: {
        flexDirection: 'row',
        marginLeft: 10,
        marginTop: 5,
        
    },
    addQuantityToCart:{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    }
})