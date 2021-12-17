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
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import ConfirmingOrdersScreen from './Orders/ConfirmingOrdersScreen';
import DeliveryingOrdersScreen from './Orders/DeliveryingOrdersScreen';
import DoneOrdersScreen from './Orders/DoneOrdersScreen';
import CancelOrdersScreen from './Orders/CancelOrdersScreen';
const Tab =createMaterialTopTabNavigator();

export default function userOrderManagementScreen({navigation, route}){

    const {userData, orders, userInfo} = route.params;
    // console.log(userData);
    // console.log(orders);
    
    
    //const orderStatus = ['Chờ duyệt', 'Đang giao', 'Đã giao', 'Hủy đơn']

    var ConfirmingOrders = [];
    var DeliveryingOrders = [];
    var DoneOrders = [];
    var CancelOrders =[];
    
    orders.forEach(order =>{
        
        if(order.isCanceled !==0){
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
    // console.log("Confirm",ConfirmingOrders);
    // console.log("Deli",DeliveryingOrders);
    // console.log("Done",DoneOrders);
    // console.log("Cancel",CancelOrders);
    return(
      
        <Tab.Navigator
        screenOptions={{
            tabBarStyle: { height: 70, justifyContent:'flex-end'}
        }}>
            <Tab.Screen name="Chờ duyệt" component={ConfirmingOrdersScreen} initialParams={{ConfirmingOrders, userData, userInfo}} options={{headerShown: false}}/>
            <Tab.Screen name="Đang giao" component={DeliveryingOrdersScreen} initialParams={{DeliveryingOrders, userData, userInfo}} options={{headerShown:false}}/>
            <Tab.Screen name="Đã giao" component={DoneOrdersScreen} initialParams={{DoneOrders, userData, userInfo}} options={{headerShown: false}}/>
            <Tab.Screen name="Hủy đơn" component={CancelOrdersScreen} initialParams={{CancelOrders, userData, userInfo}} options={{headerShown:false}}/>
        </Tab.Navigator>


    )

}

const styles = StyleSheet.create({
   
});