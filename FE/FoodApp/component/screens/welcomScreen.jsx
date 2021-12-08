import React, {useState, useEffect}from "react";
import {
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
    Dimensions,
    Platform,
    TextInput,
    Form,
    Alert
} from "react-native";
import{
    Avatar,
    Title,
    Caption,
    TouchableRipple
} from 'react-native-paper';
import API from "../services/api";
import darBoardScreen from "./darBoardScreen";
import FontAwesome from 'react-native-vector-icons/FontAwesome';
export default function welcomScreen({navigation, route}){
    const{response}=route.params;
    const[data, setData]=useState([]);
    const fetchdata = async() => {
        const result = await API.get(`user/information/${response.id}`,
        {
            headers:{
                'Content-Type': 'application/json',
                'x-access-token': response.accessToken
                
            },
        });
        //console.log(result.data.information);
        setData(result.data.information);
    }

    useEffect(() => {
        fetchdata();
    },[setData]);
    return (
        <View>
            <View style={styles.containerTitle}>
                <Avatar.Image source={{uri: data.userAvatar}}/>
                <View style={styles.title}>
                    <Text style={styles.textTitle}>{'Hello!, '+ data.firstname +' '+ data.lastname}</Text>
                </View>
            </View>
            <View>
                <Text style={styles.caption}>Bạn muốn nấu món gì hôm nay?</Text>
            </View>
            <View style={styles.containerButton}>
                <View style={styles.containerFood}>
                    <TouchableOpacity onPress={()=>{
                        navigation.navigate('darBoardScreen',{ response: response, screen: 'Food'});
                    }}>
                        <FontAwesome
                            name="bars"
                            color="#FF0000"
                            size={60}
                        />
                    </TouchableOpacity>
                </View>
                <View style={styles.containerShop}>
                    <TouchableOpacity onPress={()=>{
                        navigation.navigate('darBoardScreen',{ response: response});
                    }}>
                        <FontAwesome
                            name="shopping-cart"
                            color="#FF0000"
                            size={60}
                        />
                    </TouchableOpacity>
                </View>
            </View>
            <View style={styles.containerText}>
                <View style={styles.textCaption}>
                    <Text style={styles.textCaptionDetail}>Món Ngon</Text>
                </View>
                <View style ={styles.textCaption}>
                    <Text style={styles.textCaptionDetail}>Mua sắm ngay</Text>
                </View>
            </View>
        </View>
    );
}
const styles = StyleSheet.create({
    containerTitle:{
        marginTop: 50,
        flexDirection: 'row',
        marginLeft: 15,
    },
    textTitle:{
        fontSize: 25,
        fontWeight: 'bold',
        color: '#800000',
    },
    title: {
        marginLeft: 10,
        justifyContent: 'center',
    },
    caption:{
        marginTop:30,
        fontSize: 18,
        marginLeft: 20,
        color: '#FF0000'
    },
    containerButton:{
        marginTop: 20,
        marginLeft: 15,
        marginRight: 15,
        flexDirection: 'row',
        height: 90,
        
    },
    containerFood:{
        flex: 1,
        alignItems: 'center',
        borderWidth: 1,
        marginRight: 7,
        borderRadius: 15,
        borderColor: '#FF0000',
        justifyContent: 'center',
    },
    containerShop:{
        flex: 1,
        alignItems: 'center',
        borderWidth: 1,
        marginLeft: 7,
        borderRadius: 15,
        borderColor: '#FF0000',
        justifyContent: 'center',
    },
    containerText:{
        flexDirection: 'row',
        justifyContent: 'center',
  
    },
    textCaption:{
        flex: 1,
        alignItems: 'center',
    },
    textCaptionDetail:{
        fontWeight: 'bold',
        color: '#FF0000',
        fontSize: 20,
    }
    
});