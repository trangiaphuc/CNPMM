import React from "react";
import { StyleSheet, View, Text, Button } from "react-native";
import {NavigationContainer} from '@react-navigation/native';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import homeScreen from "../screens/homeScreen";
import userScreen from "../screens/userScreen";
import favouriteScreen from "../screens/favouriteScreen";
import historyScreen from "../screens/historyScreen";
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
const Tab =createBottomTabNavigator();
const darBoardScreen=({route, navigation})=>{
    const{response}=route.params;
    //console.log(response);
    return(
       
            <Tab.Navigator>
                <Tab.Screen name="Home" component={homeScreen} initialParams={{response}} options={{headerShown: false}} />
                <Tab.Screen name="Favourites" component={favouriteScreen} options={{headerShown:false}} />
                <Tab.Screen name="History" component={historyScreen} options={{headerShown:false}} />
                <Tab.Screen name="Profile" component={userScreen} initialParams={{response}} options={{headerShown: false}} />
            </Tab.Navigator>
        
    );
}




export default darBoardScreen;