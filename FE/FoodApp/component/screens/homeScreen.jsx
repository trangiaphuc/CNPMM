import React, {useState, useEffect} from "react";
import {View, Text, FlatList, SafeAreaView, StyleSheet, ScrollView, TouchableOpacity} from "react-native";
import axios from "axios";
export default function homeScreen({navigation, route}){
    const{response}=route.params;
    //var products=[];
    const[data, setData]=useState([]);
    const[productCategory, setProductCategory]=useState([]);
    //console.log(response);



    const fetchdata = async() => {
        const result = await axios.get("http://192.168.1.4:8080/api/productcategory/",
        {
            headers:{
                'Content-Type': 'application/json',
                'x-access-token': response.accessToken
                
            },
        });
        //console.log(result.data);
        setData(result.data);
        console.log(data);
        
    }

    useEffect(() => {
        fetchdata();
    },[setData]);

    const renderItem=({item})=> {
        
        return(
            <TouchableOpacity onPress={()=>{alert(item.id)}}>
                <View style={[styles.item, {
                    flex: 1,
                    flexDirection: 'row',
                }]}>
                <Text>{item.catName}</Text>
            </View>
            </TouchableOpacity>
            
        );
    }

    return(
        
        <SafeAreaView>
            
            <ScrollView>
                <FlatList
                horizontal={true}
                data={data}
                renderItem={renderItem}
                keyExtractor={(item) =>item.id}/>
            </ScrollView>
        </SafeAreaView>


    );
}
const styles = StyleSheet.create({
    item: {
        padding: 5,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
    container: {
        flex: 1,
    },
    row: {
        flexDirection: 'row',
        marginBottom: 10,
    }
});