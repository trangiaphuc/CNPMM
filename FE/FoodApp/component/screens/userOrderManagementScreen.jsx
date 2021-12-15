import React,{useState, useEffect} from "react";
import {View, Text, TextStyle, SafeAreaView, StyleSheet, ScrollView, FlatList, Dimensions,Image, TouchableOpacity, TextInput} from "react-native";
import axios from "axios";
import{
    Avatar,
    Title,
    Caption,
    TouchableRipple
} from 'react-native-paper';
import {Card} from "react-native-elements";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import API from "../services/api";
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import ConfirmingOrdersScreen from './Orders/ConfirmingOrdersScreen';
import DeliveryingOrdersScreen from './Orders/ConfirmingOrdersScreen';
import DoneOrdersScreen from './Orders/ConfirmingOrdersScreen';
import CancelOrdersScreen from './Orders/ConfirmingOrdersScreen';


export default function userOrderManagementScreen({navigation, route}){

    const {userData, orders} = route.params;
    const Tab = createMaterialTopTabNavigator();
    const orderStatus = ['Chờ duyệt', 'Đang giao', 'Đã giao', 'Hủy đơn']

    var ConfirmingOrders = [];
    var DeliveryingOrders = [];
    var DoneOrders = [];
    var CancelOrders =[];
    orders.forEach(order =>{
        if(order.isCancelled!=0){
            CancelOrders.push(order);
        }
        else if(order.isDone == 0){
            ConfirmingOrders.push(order);
        }
        else if(order.isDone == 2){
            DeliveryingOrders.push(order);
        }
        else if(order.isDone ==1){
            DoneOrders.push(order);
        }
    })

    var confirmingContent = "Confirming!";
    var deliveryContent = "Delivery!";
    var DoneContent = "Done";
    var CancelContent = "Cancel";

    return(
        <View style={styles.container}>
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
                <Text style={styles.returnText}>Đơn hàng</Text>    
            </View>


            <View style={styles.productFoodMargin}>
            <Tab.Navigator>
                    <Tab.Screen name="Chờ duyệt" component={ConfirmingOrdersScreen} initialParams={{userData, data: confirmingContent}} options={{headerShown: false}}/>
                    <Tab.Screen name="Đang giao" component={DeliveryingOrdersScreen} initialParams={{userData, data: deliveryContent}} options={{headerShown:false}}/>
                    <Tab.Screen name="Đã giao" component={DoneOrdersScreen} initialParams={{userData, data: DoneContent}} options={{headerShown: false}}/>
                    <Tab.Screen name="Hủy đơn" component={CancelOrdersScreen} initialParams={{userData, data: CancelContent}} options={{headerShown:false}}/>
                </Tab.Navigator>
            </View>

        </View>
    )

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop:30,
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