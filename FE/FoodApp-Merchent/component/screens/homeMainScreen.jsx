import React,{useState, useEffect} from "react";
import {
    View,
    Text,
    TextStyle,
    SafeAreaView,
    StyleSheet,
    ScrollView,
    FlatList,
    Dimensions,
    Image,
    TouchableOpacity,
    TextInput
} from "react-native";
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import API from "../services/api";
export default function homeMainScreen({navigation, route}){
    const{userData}=route.params;
    const [userInfo, setUserInfo]=useState([]);

    const fetchdata = async() => {
        const result = await API.get(`user/information/${userData.id}`,
        {
            headers:{
                'Content-Type': 'application/json',
                'x-access-token': userData.accessToken
                
            },
        });
        //console.log(result.data.information);
        setUserInfo(result.data.information);
        //console.log(data);
        
    }
    useEffect(() => {
        fetchdata();
        
    },[setUserInfo]);
    return(
        <SafeAreaView>
            <View style={styles.return}>
                <View style={styles.returnIcon}>
                    <TouchableOpacity onPress={()=>{navigation.goBack();}}>
                        <FontAwesome
                            name="arrow-left"
                            color="#05375a"
                            size={20}
                        />
                    </TouchableOpacity>
                </View>
                <View style={styles.containerText}>
                    <Text style={styles.returnText}>Trang chủ</Text>
                </View>
            </View>
            <View >
                <View style={{flexDirection: 'row'}}>
                    <TouchableOpacity style={styles.button} onPress={()=>{navigation.navigate('productCategoryScreen',{userData: userData})}}>
                        <View >
                            <Text style={styles.buttonText}>Quản lý danh mục sản phẩm</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity  style={styles.button} onPress={()=>{navigation.navigate('homeScreen',{userData: userData})}}>
                        <View>
                            <Text style={styles.buttonText}>Quản lý sản phẩm</Text>
                        </View>
                    </TouchableOpacity>
                </View>
                <View style={{flexDirection: 'row'}}>
                    <TouchableOpacity style={styles.button} onPress={()=>{navigation.navigate('foodCategoryScreen',{userData: userData})}}>
                        <View >
                            <Text style={styles.buttonText}>Quản lý danh mục món ăn</Text>
                        </View>
                    </TouchableOpacity>
                    <View style={styles.button}>
                        <Text style={styles.buttonText}>Quản lý món ăn</Text>
                    </View>
                </View>
            </View>
            <View>
                <TouchableOpacity onPress={()=>{navigation.navigate('userOrderManagementScreen',{userData: userData, userInfo: userInfo})}}>
                    <View style={styles.buttonBill}>
                        <Text style={styles.buttonText}>Quản lý đơn hàng</Text>
                    </View>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}
const styles = StyleSheet.create({
    return: {

        height: 60,
        backgroundColor: '#FFFFFF',
        flexDirection: 'row',

    },
    returnIcon:{
        flex: 3,
        marginBottom: 5,
        marginLeft: 10,
        justifyContent: 'flex-end',

    },
    returnText:{
        marginBottom: 5,

        fontWeight: 'bold',
        fontSize: 20,
        color: '#05375a',
    },
    containerText:{
        justifyContent: 'flex-end',
        flex: 5,
    },
    button:{
        flex: 1,
        alignItems: 'center',
        borderWidth: 0.5,
        marginTop: 20,
        borderRadius: 10,
        marginLeft: 10,
        marginRight: 10,
        backgroundColor: '#FF6600'
    },
    buttonText:{
        paddingTop: 40,
        paddingBottom: 40,
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
        color: '#FFFFFF'
    },
    buttonBill:{
        borderWidth: 0.5,
        borderRadius: 10,
        marginTop: 20,
        marginLeft: 10,
        marginRight: 10,
        alignItems: 'center',
        backgroundColor: '#FF6600'
    }
});