import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Alert,
} from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import axios from "axios";
import { Avatar, Title, Caption, TouchableRipple } from "react-native-paper";
import API from "../services/api";
import { Card } from "react-native-elements";
import { Picker } from "@react-native-picker/picker";
import { LinearGradient } from "expo-linear-gradient";

export default function billScreen({ navigation, route }) {
  const [data, setData] = useState([]);
  const [paymentMethod, setPaymentMethod] = useState([]);
  const [deliveryMethod, setDeliveryMethod] = useState([]);
  const { userData } = route.params;
  const [product, setProduct] = useState([]);
  //console.log(product);
  const [pickerValue, setPickerValue] = useState(1);
  const [pickerValueDelivery, setPickerValueDelivery] = useState(1);
  var order = [];
  var productId = [];
  for (let i = 0; i < product.length; i++) {
    productId.push(product[i].id);
  }
  //console.log(productId);

  var itemPrice = [];
  for (let i = 0; i < product.length; i++) {
    itemPrice.push(product[i].product.price * product[i].quantity);
  }
  let tong = 15000;
  for (let i = 0; i < itemPrice.length; i++) {
    tong = tong + itemPrice[i];
  }

  const fetchdata = async () => {
    const result = await API.get(`user/information/${userData.id}`, {
      headers: {
        "Content-Type": "application/json",
        "x-access-token": userData.accessToken,
      },
    });
    //console.log(result.data.information);
    setData(result.data.information);
  };

  const fetchdataPaymentMethod = async () => {
    const result = await API.get("payment-method/", {
      headers: {
        "Content-Type": "application/json",
        "x-access-token": userData.accessToken,
      },
    });
    setPaymentMethod(result.data.methods);
  };
  const fetchdataDeliveryMethod = async () => {
    const result = await API.get("delivery-method/", {
      headers: {
        "Content-Type": "application/json",
        "x-access-token": userData.accessToken,
      },
    });
    setDeliveryMethod(result.data.deliveries);
  };
  const fetchdataProduct = async () => {
    const result = await API.get(`cart/${userData.id}`, {
      headers: {
        "Content-Type": "application/json",
        "x-access-token": userData.accessToken,
      },
    });
    //console.log(result.data.cart.cartDetails.quantity);
    setProduct(result.data.cart.cartDetails);
    //console.log(result.data.cart.cartDetails);
  };

  useEffect(() => {
    fetchdata();
    fetchdataProduct();
    fetchdataPaymentMethod();
    fetchdataDeliveryMethod();
  }, [setData]);

  const orders = () => {
    for (let i = 0; i < product.length; i++) {
      order.push({
        quantity: product[i].quantity,
        productId: product[i].productId,
        price: product[i].product.price,
      });
    }

    API.post(
      `order/${userData.id}`,
      {
        addressDelivery: data.address,
        paymentMethodId: pickerValue,
        deliveryMethodId: pickerValueDelivery,
        orderDetails: order,
      },
      {
        headers: {
          "Content-Type": "application/json",
          "x-access-token": userData.accessToken,
        },
      }
    )
      .then((res) => {
        if (res.status === 200) {
          var listCart = [];
          productId.forEach((item) => {
            listCart.push({
              id: item,
              isBuy: true,
            });
          });
          API.post(
            `cart/${userData.id}/editCartItem/`,
            { listEditCartItemId: listCart },
            {
              headers: {
                "Content-Type": "application/json",
                "x-access-token": userData.accessToken,
              },
            }
          )
            .then((res) => {
              console.log(res.data);
            })
            .catch((error) => {
              console.log(error.res);
            });

          Alert.alert("Thông báo", "Đặt hàng thành công");
          //navigation.navigate('darBoardScreen',{screen: 'Cart', userData: userData, status: true, listCart: listCart})
        }
      })
      .catch((error) => {
        Alert.alert("Thông báo", "Đặt hàng thất bại");
      });
  };

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
        <Text style={styles.returnText}>Đặt hàng</Text>
      </View>
      <View>
        <View style={styles.container}>
          <View style={styles.address}>
            <Text style={{ marginLeft: 15, fontWeight: "bold" }}>
              Thông tin nhận hàng:
            </Text>
            <View style={{ flexDirection: "row" }}>
              <Text style={styles.textAddress}>Tên: </Text>
              <Text>{data.firstname + " " + data.lastname}</Text>
            </View>
            <View style={{ flexDirection: "row" }}>
              <Text style={styles.textAddress}>Số điện thoại: </Text>
              <Text>{data.phone}</Text>
            </View>
            <View style={{ flexDirection: "row" }}>
              <Text style={styles.textAddress}>Địa chỉ: </Text>
              <Text style={{ flex: 1 }}>{data.address}</Text>
            </View>
          </View>
          <View style={styles.containerProduct}>
            <Text style={{ marginLeft: 15, fontSize: 20, fontWeight: "bold" }}>
              Danh sách sản phẩm
            </Text>
            <ScrollView style={{ height: "43%" }}>
              {product.map((item) => (
                <SafeAreaView key={item.id}>
                  <Card>
                    <View style={{ flexDirection: "row" }}>
                      <View style={{ flex: 3 }}>
                        <Text style={{ fontWeight: "bold" }}>
                          {item.product.proName}
                        </Text>
                        <Text>{"Số lượng: " + item.quantity}</Text>
                      </View>
                      <View style={{ flex: 1, justifyContent: "center" }}>
                        <Text>{item.product.price * item.quantity + "đ"}</Text>
                      </View>
                    </View>
                  </Card>
                </SafeAreaView>
              ))}
            </ScrollView>
          </View>

          <View
            style={{
              backgroundColor: "#DCDCDC",
              height: "38.7%",
              borderRadius: 25,
            }}
          >
            <View>
              <View style={styles.paymentMethod}>
                <Text
                  style={{
                    marginLeft: 15,
                    fontSize: 18,
                    fontWeight: "bold",
                    marginTop: 10,
                  }}
                >
                  Phương thức thanh toán
                </Text>

                <Picker
                  style={styles.picker}
                  selectedValue={pickerValue}
                  itemStyle={{
                    height: 80,
                    fontSize: 15,
                  }}
                  onValueChange={(itemValue) => setPickerValue(itemValue)}
                >
                  {paymentMethod.map((item) => (
                    <Picker.Item
                      key={item.id}
                      label={item.paymentType}
                      value={item.id}
                    />
                  ))}
                </Picker>
              </View>

              <View style={styles.paymentMethod}>
                <Text
                  style={{ marginLeft: 15, fontSize: 18, fontWeight: "bold" }}
                >
                  Hình thức giao hàng
                </Text>
                <Picker
                  style={styles.picker}
                  selectedValue={pickerValueDelivery}
                  itemStyle={{ height: 80, fontSize: 15 }}
                  onValueChange={(itemValue) =>
                    setPickerValueDelivery(itemValue)
                  }
                >
                  {deliveryMethod.map((item) => (
                    <Picker.Item
                      key={item.id}
                      label={item.deliveryMethod}
                      value={item.id}
                    />
                  ))}
                </Picker>
              </View>
            </View>

            <View style={{ flexDirection: "row" }}>
              <Text
                style={{
                  marginLeft: 15,
                  fontSize: 18,
                  fontWeight: "bold",
                  flex: 2,
                }}
              >
                Đơn hàng
              </Text>
              <View
                style={{
                  flex: 1,
                  justifyContent: "center",
                  alignItems: "flex-end",
                  marginRight: 15,
                }}
              >
                <Text
                  style={{
                    fontSize: 20,
                    color: "#FF0000",
                  }}
                >
                  {tong + "đ"}
                </Text>
              </View>
            </View>
            <View style={{ flexDirection: "row" }}>
              <Text
                style={{
                  marginLeft: 15,
                  fontSize: 18,
                  fontWeight: "bold",
                  flex: 2,
                  marginTop: 5,
                }}
              >
                Phí ship
              </Text>
              <View
                style={{
                  flex: 1,
                  justifyContent: "center",
                  alignItems: "flex-end",
                  marginRight: 15,
                }}
              >
                <Text style={{ fontSize: 20, color: "#FF0000" }}>15000đ</Text>
              </View>
            </View>
            <View style={{ flexDirection: "row" }}>
              <Text
                style={{
                  marginLeft: 15,
                  fontSize: 18,
                  fontWeight: "bold",
                  flex: 2,
                  marginTop: 5,
                }}
              >
                Tổng tiền
              </Text>
              <View
                style={{
                  flex: 1,
                  justifyContent: "center",
                  alignItems: "flex-end",
                  marginRight: 15,
                }}
              >
                <Text style={{ fontSize: 20, color: "#FF0000" }}>
                  {tong + 15000 + "đ"}
                </Text>
              </View>
            </View>
            <View style={styles.footer}>
              <View style={styles.button}>
                <TouchableOpacity onPress={orders}>
                  <LinearGradient
                    colors={["#FF4B3A", "#FF4B3A"]}
                    style={styles.signIn}
                  >
                    <Text style={styles.textSign}>Đặt hàng</Text>
                  </LinearGradient>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
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
  },
  footer: {
    marginTop: 5,
    marginRight: 15,

    justifyContent: "center",
    alignItems: "flex-end",
  },
  signIn: {
    width: 150,
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

  address: {
    height: 90,
    justifyContent: "center",
    backgroundColor: "#E8E8E8",
  },
  textAddress: {
    marginLeft: 30,
  },
  container: {
    marginLeft: 2,
    marginRight: 2,
    borderLeftWidth: 2,
    borderRightWidth: 2,
  },
  containerProduct: {
    marginTop: 5,
  },
  paymentMethod: {
    marginTop: 2,
  },
  picker: {
    marginLeft: 15,
    marginRight: 15,
  },
});
