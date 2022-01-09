import React,{useState, useEffect} from "react";
import {View, Text, SafeAreaView, StyleSheet, ScrollView, TouchableOpacity} from "react-native";
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import axios from "axios";
import{
    Avatar,
    Title,
    Caption,
    TouchableRipple
} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import API from "../services/api";
import {useIsFocused } from '@react-navigation/native';
import {Card} from "react-native-elements";


export default function marketNoteScreen({navigation, route}){
    const isFocused = useIsFocused();
    const{userData}=route.params;
    const[marketNoteList, setMarketNoteList] =useState([]);

    const fetchDataMarketNoteList = async() => {
        const result = await API.get(`marketnote/${userData.id}`,
        {
            headers:{
                'Content-Type': 'application/json',
                'x-access-token': userData.accessToken
                
            },
        });
        //console.log(result.data.marketNotes);
        setMarketNoteList(result.data.marketNotes);
        
    }

    useEffect(() => {
        fetchDataMarketNoteList();
    },[setMarketNoteList, isFocused]);

    const deleteNote =(id) => {
        var article="Delete";
        API.put(`marketnote/${userData.id}/delete/${id}`,article,
                {
                    headers:{
                        'x-access-token': userData.accessToken,
                    },
                })
                .then(res => {
                    fetchDataMarketNoteList();
                }).catch(error => {
                        alert('Error', error.res);
                });
    }
    

    const SetCardNote=(item)=>{
        if(item.isDone==0){
            return(
                <Card containerStyle={{borderRadius: 10}}>
                    <View style={{flexDirection: 'row'}}>
                        <View style={{flex: 7}}>
                            <Text style={{fontSize: 15, fontWeight: 'bold'}}>{item.marketNoteText}</Text>
                            <Text>{'Ngày thêm: '+item.remindDate}</Text>
                        </View>
                        <TouchableOpacity style={{flex: 1.5, justifyContent: 'center'}} onPress={()=>{
                            API.post(`marketnote/${userData.id}/edit/${item.id}`,{isDone: true},
                            {
                                headers:{
                                    'Content-Type': 'application/json',
                                    'x-access-token': userData.accessToken,
                                },
                            })
                            .then(res => {
                                fetchDataMarketNoteList();
                            }).catch(error => {
                                    alert('Error', error.res);
                            });
                        }}>
                            <FontAwesome
                                name="check"
                                color="#05375a"
                                size={20}
                            />
                        </TouchableOpacity>
                        <TouchableOpacity style={{flex: 0, justifyContent: 'center'}} onPress={()=>{deleteNote(item.id)}}>
                            <FontAwesome
                                name="trash"
                                color="#05375a"
                                size={20}
                            />
                        </TouchableOpacity>
                    </View>
                </Card>
            );
        }
        else{
            return(
                <Card containerStyle={{backgroundColor: '#FF4B3A', borderRadius: 10}}>
                    <View style={{flexDirection: 'row'}}>
                        <View style={{flex: 7}}>
                            <Text style={{fontSize: 15, fontWeight: 'bold'}}>{item.marketNoteText}</Text>
                            <Text>{'Ngày thêm: '+item.remindDate}</Text>
                        </View>
                        <TouchableOpacity style={{flex: 1.5, justifyContent: 'center'}} onPress={()=>{
                            API.post(`marketnote/${userData.id}/edit/${item.id}`,{isDone: false},
                            {
                                headers:{
                                    'Content-Type': 'application/json',
                                    'x-access-token': userData.accessToken,
                                },
                            })
                            .then(res => {
                                fetchDataMarketNoteList();
                            }).catch(error => {
                                alert('Error', error.res);
                            });
                        }}>
                            <FontAwesome
                                name="times-circle"
                                color="#05375a"
                                size={20}
                            />
                        </TouchableOpacity>
                        <TouchableOpacity style={{flex: 0, justifyContent: 'center'}} onPress={()=>{deleteNote(item.id)}}>
                            <FontAwesome
                                name="trash"
                                color="#05375a"
                                size={20}
                            />
                        </TouchableOpacity>
                    </View>
                </Card>
            );
        }
    }
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
                    <Text style={styles.returnText}>Ghi chú</Text>
                </View>
            </View>
            <ScrollView style={{height: '92%'}}>
                {
                    marketNoteList.map(item=>
                        <SafeAreaView key={item.id}>
                            {SetCardNote(item)}
                        </SafeAreaView>
                        )
                }
            </ScrollView>
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
        flex: 4,
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
        flex: 6,
    }
})