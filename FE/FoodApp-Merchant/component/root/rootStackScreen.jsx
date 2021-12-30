import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';

import flashScreen from '../screens/flashScreen';
import signInScreen from '../screens/signInScreen';
import darBoardScreen from '../screens/darBoardScreen';
import productDetailScreen from '../screens/productDetailScreen';
import foodDetailScreen from '../screens/foodDetailScreen';
import welcomScreen from '../screens/welcomScreen';
import billScreen from '../screens/billScreen'
import updateUserProfile from '../screens/updateUseProfileScreen';
import userOrderManagementScreen from '../screens/userOrderManagementScreen'
import updateProductScreen from '../screens/updateProductScreen';
import ordersDetailBillScreen from '../screens/Orders/ordersDetailBillScreen';
import productCategoryScreen from '../screens/Product/productCategoryScreen';
import foodCategoryScreen from '../screens/Food/foodCategoryScreen';
import homeScreen from '../screens/homeScreen';
import foodScreen from '../screens/foodScreen';
import addNewProductScreen from '../screens/Product/addNewProductScreen';
import addFoodCategoryScreen from '../screens/Food/addFoodCategoryScreen';
import addNewFoodScreen from '../screens/Food/addNewFoodScreen';
import updateFoodScreen from '../screens/Food/updateFoodScreen';
import addNewProductCategoryScreen from '../screens/Product/addNewProductCategoryScreen';
import updateProductCategoryScreen from '../screens/Product/updateProductCategoryScreen'



const RootStack = createStackNavigator();

const rootStackScreen = () => (
    <RootStack.Navigator headerShown={false}>
        <RootStack.Screen name="flashScreen" component={flashScreen} options={{headerShown: false}} />
        <RootStack.Screen name="signInScreen" component={signInScreen} options={{headerShown: false}} />
        <RootStack.Screen name="darBoardScreen" component={darBoardScreen} options={{headerShown: false}}/>
        <RootStack.Screen name="productDetailScreen" component={productDetailScreen} options={{headerShown: false}}/>
        <RootStack.Screen name="foodDetailScreen" component={foodDetailScreen} options={{headerShown: false}}/>
        <RootStack.Screen name="welcomScreen" component={welcomScreen} options={{headerShown: false}}/>
        <RootStack.Screen name="billScreen" component={billScreen} options={{headerShown: false}}/>
        <RootStack.Screen name="updateUserProfileScreen" component={updateUserProfile} options={{headerShown: false}}/>
        <RootStack.Screen name="userOrderManagementScreen" component={userOrderManagementScreen} options={{headerShown: false}}/>
        <RootStack.Screen name="updateProductScreen" component={updateProductScreen} options={{headerShown: false}}/>
        <RootStack.Screen name="ordersDetailBillScreen" component={ordersDetailBillScreen} options={{headerShown: false}}/>
        <RootStack.Screen name="productCategoryScreen" component={productCategoryScreen} options={{headerShown: false}}/>
        <RootStack.Screen name="foodCategoryScreen" component={foodCategoryScreen} options={{headerShown: false}}/>
        <RootStack.Screen name ="homeScreen" component={homeScreen} options={{headerShown: false}}/>
        <RootStack.Screen name ="foodScreen" component={foodScreen} options={{headerShown: false}}/>
        <RootStack.Screen name ="addNewProductScreen" component={addNewProductScreen} options={{headerShown: false}}/>
        <RootStack.Screen name ="addFoodCategoryScreen" component={addFoodCategoryScreen} options={{headerShown: false}}/>
        <RootStack.Screen name ="addNewFoodScreen" component={addNewFoodScreen} options={{headerShown: false}}/>
        <RootStack.Screen name ="updateFoodScreen" component={updateFoodScreen} options={{headerShown: false}}/>
        <RootStack.Screen name ="addNewProductCategoryScreen" component={addNewProductCategoryScreen} options={{headerShown: false}}/>
        <RootStack.Screen name ="updateProductCategoryScreen" component={updateProductCategoryScreen} options={{headerShown: false}}/>
    </RootStack.Navigator>
);

export default rootStackScreen;