import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  Platform,
  TextInput,
  Form,
  Alert,
} from "react-native";
import { Card } from "react-native-elements";

import { LinearGradient } from "expo-linear-gradient";
import React, { useState, useEffect } from "react";
import API from "../services/api";
import NumericInput from "react-native-numeric-input";
import FontAwesome from "react-native-vector-icons/FontAwesome";
export default function productDetailScreen({ route, navigation }) {
  const { productId, userData } = route.params;
  //console.log(productId);
  const [productDetail, setProductDetail] = useState([]);
  const [quantityValue, setQuantityValue] = useState([]);

  const fetchdata = async () => {
    const result = await API.get(`products/detail/${productId}`, {
      headers: {
        "Content-Type": "application/json",
        "x-access-token": userData.accessToken,
      },
    });
    //console.log(result);
    setProductDetail(result.data.product);
    //console.log(result.data.product);
  };

  useEffect(() => {
    fetchdata();
  }, [setProductDetail]);

  const onChange = (value) => {
    setQuantityValue(value);
  };

  return (
    <View style={styles.container}>
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
        <Text style={styles.returnText}>Mua sắm</Text>
      </View>
      <Card>
        <Card.Title>{productDetail.proName}</Card.Title>
        <Card.Divider />
        <Card.Image source={{ uri: productDetail.productImage }} />

        <View style={styles.price}>
          <Text style={{ flex: 1 }}>Giá:</Text>
          <Text style={{ flex: 1 }}>{productDetail.price}đ/kg</Text>
        </View>
        <View style={styles.price}>
          <Text style={{ flex: 1 }}>Còn lại:</Text>
          <Text style={{ flex: 1 }}>{productDetail.quantityValue}</Text>
        </View>
        <View style={styles.price}>
          <Text style={{ flex: 1 }}>Thương hiệu:</Text>
          <Text style={{ flex: 1 }}>{productDetail.brand}</Text>
        </View>
        <View style={styles.price}>
          <Text style={{ flex: 1 }}>Xuất xứ:</Text>
          <Text style={{ flex: 1 }}>{productDetail.origin}</Text>
        </View>
        <View style={styles.price}>
          <Text style={{ flex: 1 }}>Cách dùng:</Text>
          <Text style={{ flex: 1 }}>{productDetail.manual}</Text>
        </View>
        <View style={styles.price}>
          <Text style={{ flex: 1 }}>Hạn sử dụng:</Text>
          <Text style={{ flex: 1 }}>{productDetail.preserve}</Text>
        </View>
        <View style={styles.price}>
          <Text style={{ flex: 1 }}>chi tiết:</Text>
          <Text style={{ flex: 1 }}>{productDetail.proDescription}</Text>
        </View>

        <Card.Divider />
        <View style={styles.addQuantityToCart}>
          <View style={{ marginRight: 20 }}>
            <NumericInput
              minValue={1}
              maxValue={50}
              step={1}
              totalHeight={40}
              onChange={(value) => onChange(value)}
              rounded
            />
          </View>
          <View style={styles.button}>
            <TouchableOpacity
              onPress={() => {
                API.post(
                  `cart/${userData.id}/addCartItem`,
                  {
                    listCartItems: [
                      { productId: productDetail.id, quantity: quantityValue },
                    ],
                  },
                  {
                    headers: {
                      "Content-Type": "application/json",
                      "x-access-token": userData.accessToken,
                    },
                  }
                )
                  .then((res) => {
                    if (res.status === 201) {
                      alert(res.data.message);
                      //navigation.params.resetData();
                      // RNRestart.Restart();
                    }
                  })
                  .catch((error) => {
                    //alert('Error', error.res);
                    console.log(error.res);
                  });
              }}
            >
              <LinearGradient
                colors={["#FF4B3A", "#FF4B3A"]}
                style={styles.signIn}
              >
                <Text style={styles.textSign}>Thêm vào giỏ hàng</Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </View>
      </Card>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  button: {
    alignItems: "flex-end",
  },
  signIn: {
    width: 170,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
    flexDirection: "row",
  },
  textSign: {
    color: "white",
    fontWeight: "bold",
  },
  price: {
    flexDirection: "row",
    marginLeft: 10,
    marginTop: 5,
  },
  addQuantityToCart: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
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
});
