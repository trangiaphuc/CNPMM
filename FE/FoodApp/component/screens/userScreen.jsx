import React from "react";
import {View, Text} from "react-native"
export default function userScreen({navigation, route}){
    const{response}=route.params;
    console.log(response);
    return(
        <View>
            <Text>Profile</Text>
        </View>
    );
}