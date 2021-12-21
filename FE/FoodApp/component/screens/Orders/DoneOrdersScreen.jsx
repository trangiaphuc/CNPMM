import React,{useState, useEffect} from "react";
import {View, Text, TextStyle, SafeAreaView, StyleSheet, ScrollView, FlatList, Dimensions,Image, TouchableOpacity, TextInput} from "react-native";
import API from "../../services/api";
import {useIsFocused } from '@react-navigation/native';
import {Card} from "react-native-elements";





export default function DoneOrdersTab({navigation, route}){

    const{userData, userInfo} = route.params;
    //console.log(userData);
    const[done, setDone] = useState([]);
    const isFocused = useIsFocused();
    
    var DoneOrders = [];
    
    const getUserOrder = async () =>{
        const result = await API.get(`order/${userData.id}`, 
        {
            headers:{
                'Content-Type': 'application/json',
                'x-access-token': userData.accessToken
            },
        });
        setDone(result.data.orders)
        //console.log(result.data.orders);
        
    }
    useEffect(() => {
        getUserOrder();
    },[isFocused]);

    
    done.forEach(order =>{
      
        if(order.isDone ==1){
            DoneOrders.push(order);
        }
    })

    return(
        <View style={styles.container}>
           
            <ScrollView>
            {
                   DoneOrders.map((item)=>
                       <SafeAreaView key={item.id}>
                           <TouchableOpacity onPress={()=>{navigation.navigate('ordersDetailBillScreen',{orders: item, userData: userData, userInfo: userInfo})}}>
                            <Card containerStyle={{backgroundColor:'#CCFF99'}}>
                                    <View style={{flexDirection: 'row'}}>
                                        <Text style={{fontWeight: 'bold'}}>Mã đơn hàng: </Text>
                                        <Text>{item.id}</Text>
                                    </View>
                                    <View style={{flexDirection: 'row'}}>
                                        <Text style={{fontWeight: 'bold'}}>Phương thức thanh toán: </Text>
                                        <Text>{item.paymentMethod.paymentType}</Text>
                                    </View>
                                    <View style={{flexDirection: 'row'}}>
                                        <Text style={{fontWeight: 'bold'}}>Phương thức giao hàng: </Text>
                                        <Text>{item.deliveryMethod.deliveryMethod}</Text>
                                    </View>
                                    <View style={{flexDirection: 'row'}}>
                                        <Text style={{fontWeight: 'bold'}}>Ngày nhận: </Text>
                                        <Text>{item.deliveryAt}</Text>
                                    </View>
                                    <View style={{flexDirection: 'row'}}>
                                        <Text style={{fontWeight: 'bold'}}>Tổng tiền: </Text>
                                        <Text>{item.totalPrice + 'đ'}</Text>
                                    </View>
                                    <View style={{flexDirection: 'row'}}>
                                        <Text style={{fontWeight: 'bold'}}>Địa chỉ: </Text>
                                        <Text style={{marginRight: 30}}>{item.addressDelivery}</Text>
                                    </View>
                                    <View style={{flexDirection: 'row'}}>
                                        <Text style={{fontWeight: 'bold'}}>Tình trạng đơn hàng: </Text>
                                        <Text>Đã giao</Text>
                                    </View>
                            </Card>
                           </TouchableOpacity>
                       </SafeAreaView>
                   )
               }
            </ScrollView>
           
           
        </View>
    )

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        
    },
    text: {
        marginLeft: 10,
    },
    userInfoSection: {
        paddingHorizontal: 30,
        marginBottom: 25,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
    },
    caption: {
        fontSize: 14,
        lineHeight: 14,
        fontWeight: '500',
    },
    row: {
        flexDirection: 'row',
        marginBottom: 10,
    },
    infoBoxWrapper: {
        borderBottomColor: '#dddddd',
        borderBottomWidth: 1,
        borderTopColor: '#dddddd',
        borderTopWidth: 1,
        flexDirection: 'row',
        height: 100,
    },
    infoBox: {
        width: '50%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    menuWrapper: {
        marginTop: 10,
    },
    menuItem: {
        flexDirection: 'row',
        paddingVertical: 15,
        paddingHorizontal: 30,
    },
    menuItemText: {
        color: '#777777',
        marginLeft: 20,
        fontWeight: '600',
        fontSize: 16,
        lineHeight: 26,
    },
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
        marginLeft: 80,
        fontWeight: 'bold',
        fontSize: 20,
        color: '#05375a'
    }
    
});