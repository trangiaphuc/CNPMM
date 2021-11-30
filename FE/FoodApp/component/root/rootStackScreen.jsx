import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';

import flashScreen from '../screens/flashScreen';
import signInScreen from '../screens/signInScreen';
import signUpScreen from '../screens/signUpScreen';
import darBoardScreen from '../screens/darBoardScreen';
import productDetailScreen from '../screens/productDetailScreen';
import foodDetailScreen from '../screens/foodDetailScreen';
import cartScreen from '../screens/cartScreen';


const RootStack = createStackNavigator();

const rootStackScreen = () => (
    <RootStack.Navigator headerShown={false}>
        <RootStack.Screen name="flashScreen" component={flashScreen} options={{headerShown: false}} />
        <RootStack.Screen name="signInScreen" component={signInScreen} options={{headerShown: false}} />
        <RootStack.Screen name="signUpScreen" component={signUpScreen} options={{headerShown: false}} />
        <RootStack.Screen name="darBoardScreen" component={darBoardScreen} options={{headerShown: false}} />
        <RootStack.Screen name="productDetailScreen" component={productDetailScreen} options={{headerShown: false}} />
        <RootStack.Screen name="foodDetailScreen" component={foodDetailScreen} options={{headerShown: false}} />
        <RootStack.Screen name="cartScreen" component={cartScreen} options={{headerShown: false}} />
    </RootStack.Navigator>
);

export default rootStackScreen;