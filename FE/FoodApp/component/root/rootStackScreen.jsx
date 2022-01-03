import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';

import flashScreen from '../screens/flashScreen';
import signInScreen from '../screens/signInScreen';
import signUpScreen from '../screens/signUpScreen';
import darBoardScreen from '../screens/darBoardScreen';
import productDetailScreen from '../screens/productDetailScreen';
import foodDetailScreen from '../screens/foodDetailScreen';
import cartScreen from '../screens/cartScreen';
import welcomScreen from '../screens/welcomScreen';
import updateFavoriteFoodScreen from '../screens/updateFavoriteFoodScreen';
import billScreen from '../screens/billScreen'
import updateUserProfile from '../screens/updateUseProfileScreen';
import userOrderManagementScreen from '../screens/userOrderManagementScreen';
import ordersDetailBillScreen from '../screens/Orders/orderDetailBillScreen';
import foodMaterialsScreen from '../screens/foodMeterialScreen';
import changePasswordScreen from '../screens/changePasswordScreen';

const RootStack = createStackNavigator();

const rootStackScreen = () => (
    <RootStack.Navigator headerShown={false}>
        <RootStack.Screen name="flashScreen" component={flashScreen} options={{headerShown: false}} />
        <RootStack.Screen name="signInScreen" component={signInScreen} options={{headerShown: false}} />
        <RootStack.Screen name="signUpScreen" component={signUpScreen} options={{headerShown: false}} />
        <RootStack.Screen name="darBoardScreen" component={darBoardScreen} options={{headerShown: false}}/>
        <RootStack.Screen name="productDetailScreen" component={productDetailScreen} options={{headerShown: false}}/>
        <RootStack.Screen name="foodDetailScreen" component={foodDetailScreen} options={{headerShown: false}}/>
        <RootStack.Screen name="cartScreen" component={cartScreen} options={{headerShown: false}}/>
        <RootStack.Screen name="welcomScreen" component={welcomScreen} options={{headerShown: false}}/>
        <RootStack.Screen name="updateFavoriteFoodScreen" component={updateFavoriteFoodScreen} options={{headerShown: false}}/>
        <RootStack.Screen name="billScreen" component={billScreen} options={{headerShown: false}}/>
        <RootStack.Screen name="updateUserProfileScreen" component={updateUserProfile} options={{headerShown: false}}/>
        <RootStack.Screen name="userOrderManagementScreen" component={userOrderManagementScreen} options={{headerShown: false}}/>
        <RootStack.Screen name="ordersDetailBillScreen" component={ordersDetailBillScreen} options={{headerShown: false}}/>
        <RootStack.Screen name="foodMaterialsScreen" component={foodMaterialsScreen} options={{headerShown: false}}/>
        <RootStack.Screen name="changePasswordScreen" component={changePasswordScreen} options={{headerShown: false}}/>
    </RootStack.Navigator>
);

export default rootStackScreen;