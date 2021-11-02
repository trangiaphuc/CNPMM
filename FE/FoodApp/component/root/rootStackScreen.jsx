import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';

import flashScreen from '../screens/flashScreen';
import signInScreen from '../screens/signInScreen';
import signUpScreen from '../screens/signUpScreen';
import darBoardScreen from '../screens/darBoardScreen';

const RootStack = createStackNavigator();

const rootStackScreen = () => (
    <RootStack.Navigator headerShown={false}>
        <RootStack.Screen name="flashScreen" component={flashScreen}/>
        <RootStack.Screen name="signInScreen" component={signInScreen}/>
        <RootStack.Screen name="signUpScreen" component={signUpScreen}/>
        <RootStack.Screen name="darBoardScreen" component={darBoardScreen}/>
        
    </RootStack.Navigator>
);

export default rootStackScreen;