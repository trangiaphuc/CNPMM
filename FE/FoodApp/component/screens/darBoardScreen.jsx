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
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import Ionicons from 'react-native-vector-icons/Ionicons';
const Tab =createBottomTabNavigator();
const darBoardScreen=({route, navigation})=>{
    const{response}=route.params;
    //console.log(response);
    return(
       
            <Tab.Navigator
            
            screenOptions={({ route }) => ({
                
                tabBarIcon: ({ focused, color, size }) => {
                  let iconName;
      
                  if (route.name === 'Home') {
                    iconName = focused
                      ? 'home-sharp'
                      : 'home-outline';
                  } else if (route.name === 'Favourite') {
                    iconName = focused ? 'heart-sharp' : 'heart-outline';
                  } else if (route.name === 'Cart'){
                      iconName = focused ? 'cart-sharp': 'cart-outline';
                  }
                  else if (route.name === 'Profile'){
                    iconName = focused ? 'people-sharp': 'people-outline';
                }
      
                  // You can return any component that you like here!
                  return <Ionicons name={iconName} size={size} color={color} />;
                },
                tabBarActiveTintColor: 'tomato',
                tabBarInactiveTintColor: 'gray',
              })}
            >
                <Tab.Screen name="Home" component={homeScreen} initialParams={{response}} options={{headerShown: false}} />
                <Tab.Screen name="Favourite" component={favouriteScreen} options={{headerShown:false}} />
                <Tab.Screen name="Cart" component={historyScreen} options={{headerShown:false}} />
                <Tab.Screen name="Profile" component={userScreen} initialParams={{response}} options={{headerShown: false}} />
            </Tab.Navigator>
        
    );
}




export default darBoardScreen;