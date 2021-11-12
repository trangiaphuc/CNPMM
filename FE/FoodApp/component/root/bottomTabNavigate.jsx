import React from "react";
import { StyleSheet, View, Text, Button } from "react-native";
import {NavigationContainer} from '@react-navigation/native';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import homeScreen from "../screens/homeScreen";
import userScreen from "../screens/userScreen";
const Tab =createBottomTabNavigator();
const bottomTabNavigate=()=>{
    return(
       
            <Tab.Navigator>
                <Tab.Screen name="Home" component={homeScreen} options={{headerShown: false}} />
                <Tab.Screen name="Profile" component={userScreen} options={{headerShown: false}} />
            </Tab.Navigator>
        
    );
}
export default bottomTabNavigate;