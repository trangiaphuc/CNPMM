import React from "react";
import { Text, View } from "react-native";

import { NavigationContainer } from "@react-navigation/native";

import BottomTabNavigate from "../root/bottomTabNavigate";


export default function darBoardScreen({route, navigation}) {
    const {response} = route.params;
    
    
    return(
        <BottomTabNavigate/>
    );
}