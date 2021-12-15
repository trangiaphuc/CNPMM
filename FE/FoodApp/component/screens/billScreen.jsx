import React,{useState, useEffect} from "react";
import {View, Text, SafeAreaView, StyleSheet, ScrollView, TouchableOpacity, Image} from "react-native";
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import axios from "axios";
import{
    Avatar,
    Title,
    Caption,
    TouchableRipple
} from 'react-native-paper';
import API from "../services/api";
import {Card} from "react-native-elements";
import {Picker} from '@react-native-picker/picker';
import {LinearGradient} from 'expo-linear-gradient';




export default function billScreen({navigation, route}){
    const[data, setData]=useState([]);
    const[paymentMethod, setPaymentMethod]=useState([]);
    const[deliveryMethod, setDeliveryMethod]=useState([]);
    const{response, product}=route.params;
    const[pickerValue, setPickerValue]=useState(1);
    const[pickerValueDelivery, setPickerValueDelivery]=useState(1);
    //console.log(product.product.price);
    //console.log(paymentMethod);
    // if(product.length !==0){
    //     console.log(product.product.price);
    //     console.log(product.quantity);

    // }
    var a=[];
    for(let i=0; i< product.length; i++){
        a.push(product[i].product.price*product[i].quantity);
        
    }
    let tong=0;
    for(let i=0; i< a.length; i++){
        tong=tong + a[i];
    }
   
    
 

    
        const fetchdata = async() => {
            const result = await API.get(`user/information/${response.id}`,
            {
                headers:{
                    'Content-Type': 'application/json',
                    'x-access-token': response.accessToken

                },
            });
            //console.log(result.data.information);
            setData(result.data.information);
        }

        

        const fetchdataPaymentMethod = async() => {
            const result = await API.get("payment-method/",
            {
                headers:{
                    'Content-Type': 'application/json',
                    'x-access-token': response.accessToken
                },
            });
            setPaymentMethod(result.data.methods);
            
        }
        const fetchdataDeliveryMethod = async() => {
            const result = await API.get("delivery-method/",
            {
                headers:{
                    'Content-Type': 'application/json',
                    'x-access-token': response.accessToken
                },
            });
            setDeliveryMethod(result.data.deliveries);
            
        }

        useEffect(() => {
            fetchdata();
            fetchdataPaymentMethod();
            fetchdataDeliveryMethod();
        },[setData]);
       

        const orders =()=> {
            //console.log(ordersDetail);
            for(let i=0; i<product.length; i++) {

                //console.log(product[i].product.price);
                API.post(`order/${response.id}`,
                {addressDelivery: data.address,
                    paymentMethodId: pickerValue,
                        deliveryMethodId: pickerValueDelivery,
                            orderDetails: [{quantity: product[i].quantity, productId: product[i].productId, price: product[i].product.price}]},
                {
                    headers:{
                        'Content-Type': 'application/json',
                        'x-access-token': response.accessToken,
                    },
                })
                .then(res => {
                    if (res.status===200){
                        alert("Đặt hàng thành công");
                    }

                }).catch(error => {
                        alert('Error', error.res);
                });
            }
            
        }

    return (
        <View>
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
                <Text style={styles.returnText}>Hóa đơn</Text>
            </View>
           <View>
                <View style={styles.container}>
                        <View style={styles.address}>
                                <Text style={{marginLeft: 15, fontWeight: 'bold'}}>Thông tin nhận hàng:</Text>
                                <View style={{flexDirection: 'row'}}>
                                    <Text style={styles.textAddress}>Tên: </Text>
                                    <Text>{data.firstname + ' ' + data.lastname}</Text>
                                </View>
                                <View style={{flexDirection: 'row'}}>
                                    <Text style={styles.textAddress}>Số điện thoại: </Text>
                                    <Text>{data.phone}</Text>
                                </View>
                                <View style={{flexDirection: 'row'}}>
                                    <Text style={styles.textAddress}>Địa chỉ: </Text>
                                    <Text>{data.address}</Text>
                                </View>
                                
                            </View>
                            <View style={styles.containerProduct}>
                            <Text style={{marginLeft:15, fontSize: 20, fontWeight: 'bold'}}>Danh sách sản phẩm</Text>
                                <ScrollView style={{height: 400}}>
                                {
                                    product.map((item) => 
                                        <SafeAreaView key={item.id}>
                                            
                                                <Card>
                                                    <View style={{flexDirection: 'row'}}>
                                                        <View style={{flex: 3}}>
                                                            <Text style={{fontWeight: 'bold'}}>{item.product.proName}</Text>
                                                            <Text>{'Số lượng: ' + item.quantity}</Text>
                                                        </View>
                                                        <View style={{flex: 1, justifyContent: 'center'}}>
                                                            <Text>{item.product.price*item.quantity + 'đ'}</Text>
                                                        </View>
                                                    </View>

                                                </Card>
                                        </SafeAreaView>
                                    )
                                }
                                </ScrollView>
                            </View>
                            
                            <View style={{backgroundColor:'#DCDCDC', height: 280, borderRadius: 20}}>
                                <View style={styles.paymentMethod}>
                                    <Text style={{marginLeft:15, fontSize: 20, fontWeight: 'bold'}}>Phương thức thanh toán</Text>
                                    <Picker
                                        style={styles.picker}
                                        selectedValue={pickerValue}
                                        onValueChange={(itemValue)=>setPickerValue(itemValue)}
                                    >
                                        
                                        {
                                            paymentMethod.map((item)=>
                                                
                                                    <Picker.Item key={item.id} label={item.paymentType} value={item.id}/>
                                                
                                            )
                                        }
                                        
                                        
                                    </Picker>
                                </View>
                                <View style={styles.paymentMethod}>
                                    <Text style={{marginLeft:15, fontSize: 20, fontWeight: 'bold'}}>Hình thức giao hàng</Text>
                                    <Picker
                                        style={styles.picker}
                                        selectedValue={pickerValueDelivery}
                                        onValueChange={(itemValue)=>setPickerValueDelivery(itemValue)}
                                    >
                                        
                                        {
                                            deliveryMethod.map((item)=>
                                                <Picker.Item key={item.id} label={item.deliveryMethod} value={item.id}/>
                                            )
                                        }
                                        
                                        
                                    </Picker>
                                </View>
                                <View style={{flexDirection: 'row'}}>
                                    <Text style={{marginLeft:15, fontSize: 20, fontWeight: 'bold', flex: 2}}>Tổng tiền</Text>
                                    <View  style={{flex:1, justifyContent: 'center'}}>
                                        <Text style={{fontSize: 20}}>{tong+'đ'}</Text>
                                    </View>
                                </View>
                                <View style={styles.footer}>
                        
                                    <View style={styles.button}>
                                                    <TouchableOpacity onPress={orders}>
                                                        <LinearGradient
                                                            colors={['#FF4B3A','#FF4B3A']}
                                                            style={styles.signIn}>
                                                            <Text style={styles.textSign}>Đặt hàng</Text>
                                                        </LinearGradient>
                                                    </TouchableOpacity>
                                    </View>
                                </View>
                            </View>
                </View>
                
                
           </View>
           
        </View>
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
    button: {
        alignItems: 'center',
    },
    footer:{
        marginTop: 10,
        marginRight: 15,
        
        justifyContent: 'center',
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
    returnText:{
        marginTop: 25,
        marginLeft: 127,
        fontWeight: 'bold',
        fontSize: 20,
        color: '#05375a'
    },
    address:{
        height: 80,
        justifyContent: 'center',
        backgroundColor: '#E8E8E8',
        
    }, textAddress:{
        marginLeft: 30,
    },
    container:{
        marginLeft: 2,
        marginRight: 2,
        borderLeftWidth: 2,
        borderRightWidth: 2,
    },
    containerProduct:{
        
        marginTop: 10,
    },
    paymentMethod:{
        marginTop: 10,
        
    },
    picker:{
        marginLeft: 15,
        marginRight: 15,
    }
});