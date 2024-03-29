import React, { useState, useEffect } from "react";
import { View, Text, FlatList, SafeAreaView, StyleSheet, ScrollView, TouchableOpacity, Button, TextInput, Item, Alert } from "react-native";
import axios from "axios";
import { Card } from "react-native-elements";
import { LinearGradient } from 'expo-linear-gradient';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import RNRestart from 'react-native-restart';
import NumericInput from 'react-native-numeric-input';
import API from "../services/api";
import { useIsFocused } from '@react-navigation/native';

export default function homeScreen({ navigation, route }) {
    const { userData } = route.params;

    const [data, setData] = useState([]);
    const [productCategory, setProductCategory] = useState([]);


    const [quantityValue, setQuantityValue] = useState([]);
    const [dataSearch, setDataSearch] = React.useState({
        textSearch: '',
    });
    const [search, setSearch] = useState([]);
    const [click, setClick] = useState(false);
    const isFocused = useIsFocused();

    const fetchdata = async () => {
        const result = await API.get("merchant/productcategory/",
            {
                headers: {
                    'Content-Type': 'application/json',
                    'x-access-token': userData.accessToken

                },
            });
        //console.log(result);
        setData(result.data.productCategories);
        //console.log(data);

    }



    const renderItem = ({ item }) => {
        const itemCategory = () => {
            API.get(`merchant/products/category/${item.id}`,
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'x-access-token': userData.accessToken,
                    },
                })
                .then(response => {
                    //console.log(response.data.products);
                    setProductCategory(response.data.products)
                    // setClick(true);
                    // console.log(click);

                }).catch(error => {
                    alert('Error', error.response);
                });
        }
        return (
            <TouchableOpacity onPress={itemCategory}>
                <View style={styles.container_product}>
                    <View style={[styles.item, {

                        flex: 1,
                        flexDirection: 'row',
                    }]}>
                        <Text style={styles.text_product}>{item.catName}</Text>
                    </View>
                </View>
            </TouchableOpacity>

        );
    }
    useEffect(() => {
        fetchdata();

    }, [setData, isFocused]);



    const textInputChange = (val) => {

        setDataSearch({
            ...dataSearch,
            textSearch: val,
        });

    }


    const ButtonSet = (item) => {

        //console.log(item)
        if (item.isSelling === true) {
            return (
                <TouchableOpacity onPress={() => {
                    API.post(`merchant/products/update/${item.id}`, { isSelling: false },
                        {
                            headers: {
                                'Content-Type': 'application/json',
                                'x-access-token': userData.accessToken,
                            },
                        })
                        .then(res => {
                            //console.log(res.data);
                            if (res.status === 200) {
                                Alert.alert("Thông báo", "Cập nhật thành công");

                            }
                        }).catch(error => {
                            alert('Error', error.res);
                        });
                }} isFocused={isFocused}>
                    <LinearGradient
                        colors={['#FF4B3A', '#FF4B3A']}
                        style={styles.signIn}>

                        <Text style={styles.textSign}>Dừng bán</Text>

                    </LinearGradient>
                </TouchableOpacity>
            );
        }
        else {
            return (
                <TouchableOpacity onPress={() => {
                    API.post(`merchant/products/update/${item.id}`, { isSelling: true },
                        {
                            headers: {
                                'Content-Type': 'application/json',
                                'x-access-token': userData.accessToken,
                            },
                        })
                        .then(res => {
                            //console.log(res.data);
                            if (res.status === 200) {
                                Alert.alert("Thông báo", "Cập nhật thành công")
                            }
                        }).catch(error => {
                            alert('Error', error.res);
                        });
                }}>
                    <LinearGradient
                        colors={['#00FF00', '#00FF00']}
                        style={styles.signIn}>

                        <Text style={styles.textSign}>Bán lại</Text>

                    </LinearGradient>
                </TouchableOpacity>
            );
        }



    }



    const searchProduct = () => {
        //alert(dataSearch.textSearch);

        API.post(`merchant/products/search`, { keyword: dataSearch.textSearch },
            {
                headers: {
                    'Content-Type': 'application/json',
                    'x-access-token': userData.accessToken,
                },
            })
            .then(res => {
                //console.log(res.data.products);

                if (res.data.products.length !== 0);
                {
                    setSearch(res.data.products);
                    setClick(true);
                }


            }).catch(error => {
                alert('Error', error.res);
            });
    }

    if (click === true) {
        //console.log(search);
        return (
            <SafeAreaView style={styles.productContainerSearch}>
                <View style={styles.return}>
                    <View style={styles.returnIcon}>
                        <TouchableOpacity onPress={() => { setClick(false); }}>
                            <FontAwesome
                                name="arrow-left"
                                color="#05375a"
                                size={20}
                            />
                        </TouchableOpacity>
                    </View>
                    <Text style={styles.returnText}>Tìm kiếm</Text>
                </View>
                <ScrollView>
                    <View>
                        {
                            search.map(item =>

                                <SafeAreaView key={item.id}>
                                    <TouchableOpacity onPress={() => { navigation.navigate('productDetailScreen', { productId: item.id, userData: userData }) }}>

                                        <Card>
                                            <Card.Title>{item.proName}</Card.Title>
                                            <Card.Divider />
                                            <Card.Image source={{ uri: item.productImage }} />


                                            <View style={{ flex: 1, flexDirection: 'row', padding: 10 }}>
                                                <Text style={styles.price}>Giá:</Text>
                                                <Text style={{ flex: 2 }}>{item.price}đ/kg</Text>
                                            </View>
                                            <Card.Divider />

                                            <View style={{ alignItems: 'flex-end' }}>
                                                <View style={{ alignItems: 'center' }}>
                                                    {
                                                        ButtonSet(item)
                                                    }
                                                </View>
                                            </View>
                                        </Card>
                                    </TouchableOpacity>

                                </SafeAreaView>

                            )
                        }
                    </View>
                </ScrollView>

            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView style={styles.productContainer}>
            <View style={styles.return}>
                <View style={styles.returnIcon}>
                    <TouchableOpacity onPress={() => { navigation.goBack(); }}>
                        <FontAwesome
                            name="arrow-left"
                            color="#05375a"
                            size={20}
                        />
                    </TouchableOpacity>
                </View>
                <View style={styles.containerText}>
                    <Text style={styles.returnText}>Sản phẩm</Text>
                </View>
                <View style={styles.addProduct}>
                    <TouchableOpacity style={{ alignItems: 'center' }} onPress={() => { navigation.navigate('addNewProductScreen', { userData: userData, category: data }) }}>
                        <FontAwesome
                            name="plus"
                            color="#05375a"
                            size={30}
                        />
                    </TouchableOpacity>
                </View>
            </View>


            <View>
                <View style={styles.search}>
                    <TextInput
                        placeholder="Search here"
                        autoCapitalize='none'
                        style={styles.textInput}
                        placeholderStyle={{ color: '#FF0000' }}
                        onChangeText={(val) => textInputChange(val)}

                    />
                    <TouchableOpacity onPress={searchProduct}>
                        <View style={styles.iconSearch}>
                            <FontAwesome
                                name="search"
                                color="#05375a"
                                size={20}
                            />
                        </View>
                    </TouchableOpacity>

                </View>
            </View>
            <View style={styles.productMargin}>
                <ScrollView>
                    <FlatList
                        horizontal={true}
                        data={data}
                        renderItem={renderItem}
                        keyExtractor={(item) => item.id} />
                </ScrollView>
            </View>
            <ScrollView>
                {
                    productCategory.map((item) =>
                        <SafeAreaView key={item.id}>
                            <TouchableOpacity onPress={() => { navigation.navigate('productDetailScreen', { productId: item.id, userData: userData }) }}>
                                <Card>
                                    <Card.Title>{item.proName}</Card.Title>
                                    <Card.Divider />
                                    <Card.Image source={{ uri: item.productImage }} />


                                    <View style={{ flex: 1, flexDirection: 'row', padding: 10 }}>
                                        <Text style={styles.price}>Giá:</Text>
                                        <Text style={{ flex: 2 }}>{item.price}đ/kg</Text>
                                    </View>
                                    <Card.Divider />

                                    <View style={styles.button}>
                                        <View style={{ alignItems: 'center' }}>
                                            {
                                                ButtonSet(item)
                                            }

                                        </View>

                                    </View>

                                </Card>

                            </TouchableOpacity>
                        </SafeAreaView>
                    )
                }
            </ScrollView>
        </SafeAreaView>



    );
}
const styles = StyleSheet.create({
    item: {
        padding: 5,
    },
    price: {
        flex: 1,
        marginLeft: 60
    },
    container: {
        flex: 1,
    },
    row: {
        flexDirection: 'row',
        marginBottom: 10,
    },
    container_product: {
        marginTop: 5,
        borderWidth: 1,
        borderColor: '#FF4B3A',
        borderRadius: 50,
        marginBottom: 2,
        marginLeft: 3,
    },
    button: {
        alignItems: 'flex-end'
        //flexDirection: 'row',
    },
    signIn: {
        width: 150,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 50,
        flexDirection: 'row'
    },
    textSign: {
        color: 'white',
        fontWeight: 'bold',
        marginLeft: 5
    },
    text_product: {
        color: '#FF4B3A',
        fontSize: 18,

    },
    productContainer: {
        marginBottom: 140,
    },
    productMargin: {
        marginLeft: 15,
        marginRight: 15
    },
    search: {
        marginTop: 5,
        borderWidth: 0.5,
        borderRadius: 15,
        marginLeft: 15,
        marginRight: 15,
        flexDirection: 'row',
        height: 35
    },
    textInput: {
        flex: 1,
        paddingLeft: 15,
        color: '#05375a',
    },
    iconSearch: {
        marginTop: 5,
        marginRight: 15
    },
    productView: {
        marginRight: 15
    },
    return: {

        height: 60,
        backgroundColor: '#FFFFFF',
        flexDirection: 'row',

    },
    returnIcon: {
        flex: 4,
        marginBottom: 5,
        marginLeft: 10,
        justifyContent: 'flex-end',


    },
    returnText: {
        marginBottom: 5,
        fontWeight: 'bold',
        fontSize: 20,
        color: '#05375a',
    },
    containerText: {
        justifyContent: 'flex-end',
        flex: 5,
    },
    addProduct: {
        justifyContent: 'flex-end',
        flex: 2,
    },
    productContainerSearch: {
        marginBottom: 60,
    }

});