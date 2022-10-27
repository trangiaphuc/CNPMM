import React, { useState, useEffect, useCallback } from "react";
import {
  View,
  Text,
  FlatList,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  Image,
  RefreshControl,
  ScrollView,
} from "react-native";

import { Card } from "react-native-elements";
import { deleteCartItem, getCartItem } from "../../services/callAPI";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { useIsFocused } from "@react-navigation/native";
import API from "../../services/api";
import { LinearGradient } from "expo-linear-gradient";
import { Avatar, Title, Caption, TouchableRipple } from "react-native-paper";

export default function historyScreen({ navigation, route }) {
  const { userData, status, listCart } = route.params;
  const [cart, setCart] = useState([]);
  const [quantityValue, setQuantityValue] = useState([]);
  const isFocused = useIsFocused();

  //console.log(listCart);

  // const onChange=(value, id)=>{

  //     //console.log(id);
  //     var listCartItem =[];
  //     listCartItem=cart;
  //     //var id=-1;
  //     //console.log(value);
  //     //console.log(listCartItem);
  //     for (let i=0; i<listCartItem.length; i++){
  //         //console.log(listCartItem[i]);
  //         if(listCartItem[i].id==id){
  //             listCartItem[i].quantity=value;
  //             //console.log(listCartItem[i])
  //         }

  //     }
  //     for (let i=0; i<listCartItem.length; i++){

  //         console.log(listCartItem[i].quantity);
  //     }
  //     setCart(listCartItem);
  //     //console.log(id)
  //     //console.log('ListCartItem',listCartItem[id].quantity);
  //     //console.log(value);
  //     //setCart(value);
  // }

  const fetchdata = async () => {
    const result = await getCartItem(userData);
    //console.log(result);
    if (result.status == 200) {
      setCart(result.data.cart.cartDetails);
    }
    //console.log('Before fetch data')
    // const result = await API.get(`cart/${userData.id}`, {
    //   headers: {
    //     "Content-Type": "application/json",
    //     "x-access-token": userData.accessToken,
    //   },
    // });
    // //console.log(result.data.cart.cartDetails.quantity);
    // setCart(result.data.cart.cartDetails);
    // //console.log('fetchdata');
    // //console.log(result.data.cart.cartDetails);
  };

  // const updateCartItem=()=>{
  //     console.log('update');
  //     if(status==true){
  //         //console.log(listCart);
  // API.post(`cart/${userData.id}/editCartItem/`,{listEditCartItemId: listCart},
  //                     {
  //                         headers:{
  //                             'Content-Type': 'application/json',
  //                             'x-access-token': userData.accessToken,
  //                         },
  //                     })
  //                     .then(res => {

  //                     }).catch(error => {
  //                             console.log(error.res);
  //                     });
  //     }
  // }
  useEffect(() => {
    //await updateCartItem();
    fetchdata();
  }, [setCart, isFocused]);

  return (
    <View>
      <View style={styles.return}>
        <View style={styles.returnIcon}>
          <TouchableOpacity
            onPress={() => {
              navigation.goBack();
            }}
          >
            <FontAwesome name="arrow-left" color="#ffffff" size={20} />
          </TouchableOpacity>
        </View>
        <Text style={styles.returnText}>Giỏ hàng</Text>
      </View>

      <ScrollView style={{ height: "92%" }}>
        {cart.map((item) => (
          <Card key={item.id}>
            <View style={styles.cardItem}>
              <View style={{ flex: 2 }}>
                <Avatar.Image
                  source={{ uri: item.product.productImage }}
                  size={80}
                />
              </View>
              <View style={{ flex: 4 }}>
                <Text style={{ fontWeight: "bold", marginBottom: 5 }}>
                  {item.product.proName}
                </Text>
                {/* <NumericInput
                                                    minValue={1}
                                                    maxValue={50}
                                                    step={1}
                                                    value={item.quantity}
                                                    totalHeight={40}
                                                    onChange={(value) =>onChange(value, item.id)}
                                                    rounded/> */}
                <Text>{"Số lượng: " + item.quantity}</Text>
              </View>
              <View style={styles.deleteItem}>
                <TouchableOpacity
                  onPress={async () => {
                    const result = await deleteCartItem(userData, item);
                    //console.log(result);
                    if (result.status == 200) {
                      fetchdata();
                    }
                    // const article = { title: "Delete Cart" };
                    // API.put(
                    //   `cart/${userData.id}/deleteCartItem/${item.id}`,
                    //   article,
                    //   {
                    //     headers: {
                    //       "Content-Type": "application/json",
                    //       "x-access-token": userData.accessToken,
                    //     },
                    //   }
                    // )
                    //   .then((res) => {
                    //     if (res.status === 200) {
                    //       fetchdata();
                    //     }
                    //   })
                    //   .catch((error) => {
                    //     //alert('Error', error.res);
                    //     console.log(error.res);
                    //   });
                  }}
                >
                  <Image
                    style={styles.recyclerImage}
                    source={require("../../images/recycle.png")}
                  />
                </TouchableOpacity>
              </View>
            </View>
          </Card>
        ))}
      </ScrollView>
      <View
        style={[
          styles.button,
          {
            position: "absolute",
            alignSelf: "flex-end",
            right: 30,
            bottom: "5%",
          },
        ]}
      >
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("CLBillScreen", {
              userData: userData,
              product: cart,
            });
          }}
        >
          <LinearGradient colors={["#FF4B3A", "#FF4B3A"]} style={styles.signIn}>
            <Text style={styles.textSign}>Đặt hàng</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  cardItem: {
    flexDirection: "row",
    alignItems: "center",
  },
  checkbox: {
    alignSelf: "center",
  },
  footer: {
    borderWidth: 1,
  },
  deleteItem: {
    flex: 0,
  },
  recyclerImage: {
    width: 20,
    height: 20,
  },
  return: {
    height: 80,
    backgroundColor: "#FF4B3A",
    flexDirection: "row",
    alignItems: "flex-end",
    paddingBottom: 10,
  },
  returnIcon: {
    flex: 0.7,
    marginLeft: 15,
    //borderWidth: 1,
  },
  returnText: {
    flex: 2,
    //borderWidth: 1,
    fontWeight: "bold",
    fontSize: 20,
    color: "#ffffff",
    marginRight: 75,
  },
  button: {
    alignItems: "center",
    marginTop: 10,
  },
  signIn: {
    width: 200,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 25,
    flexDirection: "row",
  },
  textSign: {
    color: "white",
    fontWeight: "bold",
    fontSize: 18,
  },
});
