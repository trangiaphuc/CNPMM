import React,{useState, useEffect} from "react";
import {View, Text, TextStyle, SafeAreaView, StyleSheet, ScrollView, Image, FlatList, VirtualizedList, TouchableOpacity} from "react-native";
import axios from "axios";
import{
    Avatar,
    Title,
    Caption,
    TouchableRipple
} from 'react-native-paper';
import {Card} from "react-native-elements";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import API from "../services/api";

export default function foodDetailScreen({route, navigation}){
    const {foodId, response}=route.params;
    const[data, setData]=useState([]);
    const[meterial, setMeterial]=useState([]);
    const[step, setStep]=useState([]);

  

    const fetchdata = async() => {
        const result = await API.get(`foods/detail/${foodId}`,
        {
            headers:{
                'Content-Type': 'application/json',
                'x-access-token': response.accessToken
                
            },
        });
        //console.log(result.data.food);
        setData(result.data.food);
        setMeterial(result.data.food.foodMaterials);
        setStep(result.data.food.foodCookSteps);
        //console.log(result.data.food.foodMaterials);
        //console.log(meterial);
        
    }

    useEffect(() => {
        fetchdata();
    },[setData]);

   
    
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
                <Text style={styles.returnText}>Chi tiết</Text>
            </View>
            <ScrollView>
            <View style={styles.image}>
                <Avatar.Image source={{uri: data.foodImage}} size={300}/>
            </View>
            <View style={styles.title}>
                <Text style={styles.textTitle}>{data.foodName}</Text>
            </View>
           <Text style={{marginLeft: 15, marginRight: 15, marginBottom: 10, marginTop: 15}}>{data.foodDescription}</Text>
           <Text style={styles.textMeterial}>1. Nguyên liệu</Text>
            
            
            <View style={styles.cardMeterial}>
                {
                    meterial.map((item) => 
                        <View key={item.id}>
                            <View style={{flexDirection: 'row'}}>
                                <Text style={styles.textMeterialTitle}>{'- '+item.foodMaterialName+ ' '}</Text>
                                <Text>{item.quantityDescription}</Text>
                            </View>

                        </View>
                    )
                }
            </View>
            {/* <FlatList
                
                data={meterial}
                renderItem={({item})=>
                   
                        <View>
                            <View>
                                <Text style={styles.textMeterialTitle}>{'- '+item.foodMaterialName }</Text>
                            </View>
                            <View style={styles.weightMeterial}>
                                <Text style={{marginLeft: 40}}>Khối lượng: </Text>
                                <Text>{item.quantityDescription}</Text>
                            </View>
                        </View>
                   
                }
                keyExtractor={(item) =>item.id}/> */}
            
            
            <Text style={[styles.textMeterial,{marginTop: 10}]}>2. Các bước thực hiện</Text>

            <View style={{marginBottom: 70}}>
                {
                    step.map((item) => {
                        return (
                            <SafeAreaView key={item.id}>
                                <View style={styles.stepCook}>
                                    <Card>
                                        <Text style={styles.textStep}>{'Bước' + ' ' + item.stepNumber + ''+':'}</Text>
                                        <Text>{item.stepDescription}</Text>
                                    </Card>


                                    {/* <Text style={styles.textStep}>{'Bước' + ' ' + item.stepNumber + ''+':'}</Text>
                                    <Text>{item.stepDescription}</Text> */}
                                </View>
                            </SafeAreaView>
                        
                        )
                    })

                }
            </View>
            </ScrollView>
           
       </SafeAreaView>
       

    );
}
const styles = StyleSheet.create({
    image: {
        marginTop: 30,
        alignItems: 'center',
    },
    textTitle:{
        fontSize: 30,
        fontWeight: 'bold',
    },
    title:{
        alignItems: 'center',
    },
    textMeterial:{
        marginLeft: 10,
        fontSize: 20,
    },
    textMeterialTitle:{
        fontWeight: 'bold',
        marginLeft: 20,
    },
    weightMeterial:{
        flexDirection: 'row',
    },
    textStep:{
        fontWeight: 'bold',
    },
    stepCook:{
        marginLeft: 10,
        marginRight: 10,
        
    },
    cardMeterial:{
        marginLeft: 10,
        marginRight: 10,
    },
    stepCookView:{
        marginBottom: 30,
    },
    return: {

        height: 60,
        backgroundColor: '#FFFFFF',
        flexDirection: 'row',
        
    },
    returnIcon:{
        marginLeft: 15,
        marginTop: 30,
        
    },
    returnText:{
        marginTop: 25,
        fontWeight: 'bold',
        fontSize: 20,
        color: '#05375a',
        marginLeft: 130,
    }

});