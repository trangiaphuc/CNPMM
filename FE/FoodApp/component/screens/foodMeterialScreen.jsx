import React, {useState, useEffect} from "react";
import {View, Text, TextStyle, SafeAreaView, StyleSheet, ScrollView, Image, FlatList, Alert, TouchableOpacity} from "react-native";
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import API from "../services/api";
import {Card} from "react-native-elements";
export default function foodMeterialScreen({navigation, route}){
    const {foodId, userData}=route.params;
    const[extractCart, setExtractCart] = useState([]);
    const[extractNote, setExtractNote] = useState([]);
    const[num, setnum]=useState(1);
    //console.log(foodId);

  

    const fetchExtract = async() => {
        const result = await API.get(`foods/foodextract/${foodId}`,
        {
            headers:{
                'Content-Type': 'application/json',
                'x-access-token': userData.accessToken
                
            },
        });
        //console.log("Cart", result.data.listCartItems);
        //console.log("Note",result.data.listMarketNoteItems);
        setExtractCart(result.data.listCartItems);
        setExtractNote(result.data.listMarketNoteItems);
        

    }
    useEffect(() => {
        fetchExtract();
    },[]);
    //console.log("HUY", extractCart.length);


    



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
                <View style={styles.containerText}>
                    <Text style={styles.returnText}>Nguyên liệu</Text>
                </View>
            </View>
            <View style={{flexDirection: 'column'}}>
                <View style={{height: '50%'}}>
                    <Text style={styles.textMeterial}>1. Nguyên liệu cần chuẩn bị</Text>
                    <ScrollView>
                        {
                            extractNote.map((item) =>
                                <View key={item.id}>
                                    <Card>
                                        <Text>{item.foodMaterialName +': '+ item.quantityDescription}</Text>
                                        <Text>{'Số lượng: '+num}</Text>
                                    </Card>
                                </View>
                            )
                        }
                    </ScrollView>
                </View>
                <TouchableOpacity style={{alignItems: 'center'}} onPress={() =>{
                    var marketNote = [];
                    var today = new Date();
                    var date = today.getDate()+'-'+(today.getMonth()+1)+'-'+today.getFullYear();
                    extractNote.forEach(item=>{
                        marketNote.push({
                            "marketNoteText": item.foodMaterialName,
                            "remindDate": date,
                            "isDone": false,
                            "isDelete": false
                        })
                    })
                    API.post(`marketnote/${userData.id}/add/`,{listMarketNoteItems: marketNote},
                        {
                             headers:{
                                    'Content-Type': 'application/json',
                                    'x-access-token': userData.accessToken,
                                },
                        })
                        .then(res => {
                            if(res.status===201)
                            {
                                Alert.alert("Thông báo","Thêm vào note thành công");
                            }
                        }).catch(error => {
                                alert('Error', error.res);
                        });
                }}>
                    <Text style={{borderWidth:0.5, paddingLeft: 30, paddingRight: 30,
                        paddingBottom: 2,
                        paddingTop:2,
                        backgroundColor: '#FF4B3A',
                        borderRadius: 3,
                        color: '#FFFFFF'}}>Thêm vào note</Text>
                </TouchableOpacity>
                <View style={{height: '42%'}}>
                    <Text style={styles.textMeterial}>2. Nguyên liệu có sẳn tại cửa hàng</Text>
                    <ScrollView>
                        {
                            extractCart.map((item) =>
                                <View key={item.id}>
                                    <Card>
                                        <Text>{item.foodMaterialName +': '+ item.quantityDescription}</Text>
                                        <Text>{'Số lượng: '+num}</Text>
                                    </Card>
                                </View>
                            )
                        }
                    </ScrollView>
                    <TouchableOpacity onPress={()=>{
                        var productFoodId=[];
                        extractCart.forEach(item =>{
                            productFoodId.push({
                                'productId': item.id,
                                'quantity': num,
                            });
                        });
                        

                        API.post(`cart/${userData.id}/addCartItem`,{listCartItems: productFoodId},
                        {
                             headers:{
                                    'Content-Type': 'application/json',
                                    'x-access-token': userData.accessToken,
                                },
                        })
                        .then(res => {
                            if(res.status===201)
                            {
                                Alert.alert("Thông báo","Thêm vào giỏ hàng thành công");
                            }
                        }).catch(error => {
                                alert('Error', error.res);
                        });
                    }}>
                        <View style={{alignItems: 'center',
                            borderRadius: 10,
                            backgroundColor: '#FF4B3A',
                            marginLeft: 15, 
                            marginRight: 15
                            }}>
                            <Text style={{
                            paddingBottom: 15,
                            paddingTop: 15,
                            fontWeight: 'bold',
                            color: '#FFFFFF',
                            fontSize: 20,
                            }}>Mua ngay</Text>
                        </View>
                    </TouchableOpacity>
                </View>
                
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
        flex: 3,
        marginBottom: 5,
        marginLeft: 10,
        justifyContent: 'flex-end',

    },
    returnText:{
        marginBottom: 5,
        fontWeight: 'bold',
        fontSize: 20,
        color: '#05375a',
    },
    containerText:{
        justifyContent: 'flex-end',
        flex: 6,
    },
    textMeterial:{
        marginLeft: 15,
        marginTop: 10,
        fontWeight: 'bold',
    }
});