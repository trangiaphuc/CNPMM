import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';

import flashScreen from '../screens/flashScreen';
import signInScreen from '../screens/signInScreen';
import signUpScreen from '../screens/signUpScreen';
import darBoardScreen from '../screens/darBoardScreen';


const RootStack = createStackNavigator();

const rootStackScreen = () => (
    <RootStack.Navigator headerShown={false}>
        <RootStack.Screen name="flashScreen" component={flashScreen} options={{headerShown: false}} />
        <RootStack.Screen name="signInScreen" component={signInScreen} options={{headerShown: false}} />
        <RootStack.Screen name="signUpScreen" component={signUpScreen} options={{headerShown: false}} />
        <RootStack.Screen name="darBoardScreen" component={darBoardScreen} options={{headerShown: false}} />
    </RootStack.Navigator>
);

export default rootStackScreen;