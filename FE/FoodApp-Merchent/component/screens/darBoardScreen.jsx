import React from "react";
import { StyleSheet, View, Text, Button } from "react-native";
import {NavigationContainer} from '@react-navigation/native';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import homeScreen from "../screens/homeScreen";
import userScreen from "../screens/userScreen";
import foodScreen from "./foodScreen";
import homeMainScreen from "./homeMainScreen";
import userOrderManagementScreen from '../screens/userOrderManagementScreen';



import Ionicons from 'react-native-vector-icons/Ionicons';
const Tab =createBottomTabNavigator();
const darBoardScreen=({route, navigation})=>{
    const{userData}=route.params;
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
                  } else if (route.name === 'Food') {
                    iconName = focused ? 'fast-food-sharp' : 'fast-food-outline';
                  } else if (route.name === 'Cart'){
                      iconName = focused ? 'cart-sharp': 'cart-outline';
                  }
                  else if (route.name === 'Profile'){
                    iconName = focused ? 'people-sharp': 'people-outline';
                }
                else if (route.name === 'Product'){
                  iconName = focused ? 'beaker-sharp': 'beaker-outline';
                }
      
                  
                  return <Ionicons name={iconName} size={size} color={color} />;
                },
                tabBarActiveTintColor: 'tomato',
                tabBarInactiveTintColor: 'gray',
              })}
            >

                <Tab.Screen name="Home" component={homeMainScreen} initialParams={{userData}} options={{headerShown: false}} />
                {/* <Tab.Screen name="Product" component={homeScreen} initialParams={{userData}} options={{headerShown: false}} /> */}
                {/* <Tab.Screen name="Food" component={foodScreen} initialParams={{userData}} options={{headerShown:false}} /> */}
                <Tab.Screen name="Profile" component={userScreen} initialParams={{userData}} options={{headerShown: false}} />
            </Tab.Navigator>
        
    );
}




export default darBoardScreen;