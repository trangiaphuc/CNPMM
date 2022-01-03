import React,{useState, useEffect} from "react";
import {View, Text, StyleSheet, ScrollView, TouchableOpacity} from "react-native";
import FontAwesome from 'react-native-vector-icons/FontAwesome';

import {Card} from "react-native-elements";





export default function ordersDetailBillScreen({navigation, route}){
    
    const{orders, userData, userInfo}=route.params;
    //console.log(orders);
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
                <Text style={styles.returnText}>Chi tiết hóa đơn</Text>
            </View>
            <View>
                <View style={styles.address}>
                    <Text style={{marginLeft: 15, fontWeight: 'bold'}}>Thông tin nhận hàng:</Text>
                    <View style={{flexDirection: 'row'}}>
                        <Text style={styles.textAddress}>Tên: </Text>
                        <Text>{userInfo.firstname + ' ' + userInfo.lastname}</Text>
                    </View>
                    <View style={{flexDirection: 'row'}}>
                        <Text style={styles.textAddress}>Số điện thoại: </Text>
                        <Text>{userInfo.phone}</Text>
                    </View>
                    <View style={{flexDirection: 'row'}}>
                        <Text style={styles.textAddress}>Địa chỉ: </Text>
                        <Text>{userInfo.address}</Text>
                    </View>
                </View>
                <View style={styles.containerProduct}>
                            <Text style={{marginLeft:15, fontSize: 20, fontWeight: 'bold'}}>Danh sách sản phẩm</Text>
                            <ScrollView style={{height: 400}}>
                                {
                                    orders.orderDetails.map((item)=>
                                    <View key={item.id}>
                                        <Card>
                                                    <View style={{flexDirection: 'row'}}>
                                                        <View style={{flex: 3}}>
                                                            <Text style={{fontWeight: 'bold'}}>{item.product.proName}</Text>
                                                            <Text>{'Số lượng: ' + item.quantity}</Text>
                                                        </View>
                                                        <View style={{flex: 1, justifyContent: 'center'}}>
                                                            <Text>{item.price*item.quantity + 'đ'}</Text>
                                                        </View>
                                                    </View>

                                        </Card>
                                    </View>
                                    )
                                }
                            </ScrollView>
                                
                </View>
                <View style={{backgroundColor:'#DCDCDC', height: 280, borderRadius: 20}}>
                    <View style={styles.paymentMethod}>
                        <Text style={{marginLeft:15, fontSize: 20, fontWeight: 'bold'}}>Phương thức thanh toán</Text>
                        <Text style={{marginLeft: 40}}>{orders.paymentMethod.paymentType}</Text>
                    </View>
                    <View style={styles.paymentMethod}>
                        <Text style={{marginLeft:15, fontSize: 20, fontWeight: 'bold'}}>Hình thức giao hàng</Text>
                        <Text style={{marginLeft: 40}}>{orders.deliveryMethod.deliveryMethod}</Text>
                    </View>
                    <View style={{flexDirection: 'row'}}>
                        <Text style={{marginLeft:15, fontSize: 20, fontWeight: 'bold', flex: 2}}>Phí ship</Text>
                        <View  style={{flex:1, justifyContent: 'center'}}>
                            <Text style={{fontSize: 20, color: '#FF0000'}}>15000đ</Text>
                        </View>
                    </View>
                    <View style={{flexDirection: 'row'}}>
                        <Text style={{marginLeft:15, fontSize: 20, fontWeight: 'bold', flex: 2}}>Tổng tiền</Text>
                        <View  style={{flex:1, justifyContent: 'center'}}>
                            <Text style={{fontSize: 20, color: '#FF0000'}}>{orders.totalPrice+'đ'}</Text>
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