import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Alert,
} from "react-native";
import API from "../../../services/api";
import { Card } from "react-native-elements";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { addCartItem } from "../../../services/callAPI";
export default function CLFoodsMaterial_Market({ navigation, route }) {
  const { foodId, userData } = route.params;
  //const [extractNote, setExtractNote] = useState([]);
  const [extractCart, setExtractCart] = useState([]);

  const fetchExtract = async () => {
    const result = await API.get(`foods/foodextract/${foodId}`, {
      headers: {
        "Content-Type": "application/json",
        "x-access-token": userData.accessToken,
      },
    });
    //console.log("Cart", result.data.listCartItems);
    //console.log("Note", result.data.listMarketNoteItems);
    setExtractCart(result.data.listCartItems);
    //setExtractNote(result.data.listMarketNoteItems);
  };
  const MTAddToCart = async () => {
    var listItem = [];
    extractCart.forEach((item) => {
      listItem.push({ productId: item.productId, quantity: 1 });
    });
    const result = await addCartItem(userData, listItem);
    if (result.status == 201) {
      Alert.alert("Thông báo", "Thêm nguyên liệu vào giỏ hàng thành công");
    }
    //console.log(listItem);
  };

  const extractCartData = ({ item }) => {
    return (
      <View>
        {
          <Card>
            <Text>
              {item.foodMaterialName + ": " + item.quantityDescription}
            </Text>
            {/* <Text>{"Số lượng: " + num}</Text> */}
          </Card>
        }
      </View>
    );
  };
  useEffect(() => {
    fetchExtract();
  }, [setExtractCart]);

  return (
    <View style={{ height: "100%" }}>
      <FlatList
        data={extractCart}
        renderItem={extractCartData}
        keyExtractor={(item) => item.id}
      />
      <View
        style={{
          position: "absolute",
          alignSelf: "flex-end",
          bottom: 0,
          paddingBottom: 50,
          paddingRight: 50,
        }}
      >
        <TouchableOpacity onPress={MTAddToCart}>
          <View
            style={{
              paddingVertical: 15,
              paddingHorizontal: 20,
              borderRadius: 10,
              backgroundColor: "#ff0000",
            }}
          >
            <Text
              style={{ fontWeight: "bold", fontSize: 16, color: "#ffffff" }}
            >
              Thêm vào giỏ hàng
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
}
