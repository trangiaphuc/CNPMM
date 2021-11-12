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
const bottomTabNavigate=()=>{
    return(
       
            <Tab.Navigator>
                <Tab.Screen name="Home" component={homeScreen} options={{headerShown: false}} />
                <Tab.Screen name="Favourite" component={favouriteScreen} options={{headerShown:false}} />
                <Tab.Screen name="Profile" component={userScreen} options={{headerShown: false}} />
                <Tab.Screen name="History" component={historyScreen} options={{headerShown:false}} />
            </Tab.Navigator>
        
    );
}




export default bottomTabNavigate;