import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';

import flashScreen from './flashScreen';
import signInScreen from './signInScreen';
import signUpScreen from './signUpScreen';

const RootStack = createStackNavigator();

const rootStackScreen = () => (
    <RootStack.Navigator headerShown={false}>
        <RootStack.Screen name="flashScreen" component={flashScreen}/>
        <RootStack.Screen name="signInScreen" component={signInScreen}/>
        <RootStack.Screen name="signUpScreen" component={signUpScreen}/>
        
    </RootStack.Navigator>
);

export default rootStackScreen;