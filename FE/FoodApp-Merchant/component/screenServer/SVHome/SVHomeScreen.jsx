import { LinearGradient } from "expo-linear-gradient";
import React, { useState, useEffect } from "react";
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
  TextInput,
} from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";

import API from "../../services/api";
import { getInfo } from "../../services/callAPI";
import { getUserMerchantOrder } from "../../services/callServerAPI";
import { useIsFocused } from "@react-navigation/native";
export default function SVHomeScreen({ navigation, route }) {
  const { userData } = route.params;
  const [userInfo, setUserInfo] = useState([]);
  const [dataLengthConfirm, setDataLengthConfirm] = useState([]);
  const [dataLengthDelivery, setDataLengthDelivery] = useState([]);

  const isFocused = useIsFocused();
  var ConfirmingOrders = [];
  var DeliveryingOrders = [];
  var today = new Date();
  // var month = today.getMonth() + 1;
  var date =
    today.getDate() + "-" + (today.getMonth() + 1) + "-" + today.getFullYear();

  const fetchdata = async () => {
    const result = await getInfo(userData);
    if (result.status == 200) {
      setUserInfo(result.data.information);
    }
    //console.log(result.data.information);

    //console.log(data);
  };
  const getUserOrder = async () => {
    const result = await getUserMerchantOrder(userData);
    //console.log(result.status);
    if (result.status == 200) {
      //console.log(result);
      result.data.orders.forEach((order) => {
        if (order.isDone == 0 && order.isCanceled == 0) {
          ConfirmingOrders.push(order);
        }
      });
      result.data.orders.forEach((order) => {
        if (order.isDone == 2 && order.isCanceled == 0) {
          DeliveryingOrders.push(order);
        }
      });
      setDataLengthConfirm(ConfirmingOrders.length);
      setDataLengthDelivery(DeliveryingOrders.length);
    }

    //setDataConfirm(result.data.orders);
    //console.log(result.data.orders);
  };
  useEffect(() => {
    fetchdata();
    getUserOrder();
  }, [setUserInfo, isFocused, setDataLengthConfirm, setDataLengthDelivery]);
  return (
    <View>
      <LinearGradient
        colors={["#ffffff", "#1E90FF"]}
        start={[1, 0]}
        style={styles.return}
      >
        <View
          style={{
            alignItems: "center",
            flexDirection: "row",
            marginLeft: 10,
            marginBottom: 42,
          }}
        >
          <Image
            source={require("../../images/logo1.png")}
            style={{ width: 70, height: 70 }}
          />
          <View>
            <Text
              style={{
                fontWeight: "bold",
                fontSize: 30,
                paddingLeft: 20,
                color: "#ffffff",
              }}
            >
              {userInfo.firstname + " " + userInfo.lastname}
            </Text>
            <View style={{ alignItems: "center" }}>
              <Text style={{ color: "#ffffff", fontSize: 17 }}>{date}</Text>
            </View>
          </View>
        </View>
        {/* <View style={styles.returnIcon}>
          <TouchableOpacity
            onPress={() => {
              navigation.goBack();
            }}
          >
            <FontAwesome name="arrow-left" color="#ffffff" size={20} />
          </TouchableOpacity>
        </View>
        <Text style={styles.returnText}>Quản lý cửa hàng</Text> */}
      </LinearGradient>
      <ScrollView
        style={{
          position: "absolute",
          marginTop: 114,
          zIndex: -1,
          height: "40%",
          //showsHorizontalScrollIndicator: true,
          //showsVerticalScrollIndicator: true,
        }}
      >
        <View
          style={{
            backgroundColor: "#FF4B3A",
            height: 160,
            width: 350,
            marginRight: 35,
            marginLeft: 35,
            borderRadius: 20,
            justifyContent: "center",
            shadowColor: "#FF4B3A",
            shadowOffset: { width: 5, height: 8 },
            shadowOpacity: 0.5,
            shadowRadius: 2,
          }}
        >
          <View
            style={{ flexDirection: "row", justifyContent: "space-around" }}
          >
            <View style={{ alignItems: "center" }}>
              <Text
                style={{ color: "#ffffff", fontWeight: "bold", fontSize: 15 }}
              >
                Doanh thu tháng
              </Text>
              <Text style={{ color: "#ffffff" }}>0</Text>
            </View>
            <TouchableOpacity
              onPress={() => {
                //console.log(date);
              }}
            >
              <View>
                <Text style={{ color: "#1E90FF" }}>Xem chi tiet</Text>
              </View>
            </TouchableOpacity>
          </View>
          <View style={{ alignItems: "center" }}>
            <Text style={{ color: "#ffffff" }}>
              ----------------------------------------
            </Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-around",
              marginTop: 15,
            }}
          >
            <View style={{ alignItems: "center" }}>
              <Text style={{ color: "#ffffff" }}>Đơn hàng mới</Text>
              <Text style={{ color: "#ffffff" }}>0</Text>
            </View>
            <View style={{ alignItems: "center" }}>
              <Text style={{ color: "#ffffff" }}>Đơn hủy</Text>
              <Text style={{ color: "#ffffff" }}>0</Text>
            </View>
            <View style={{ alignItems: "center" }}>
              <Text style={{ color: "#ffffff" }}>Đơn hoàn thành</Text>
              <Text style={{ color: "#ffffff" }}>0</Text>
            </View>
          </View>
        </View>
      </ScrollView>
      <View style={{ marginTop: 65 }}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            paddingTop: 40,
          }}
        >
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("SVManageProductCat", {
                userData: userData,
              });
            }}
          >
            <View style={{ alignItems: "center", paddingRight: 30 }}>
              <View style={styles.borderIcon}>
                <Image
                  source={require("../../images/productcat.png")}
                  style={{ width: 50, height: 50 }}
                />
              </View>
              <View style={{ justifyContent: "center", alignItems: "center" }}>
                <Text>Danh mục</Text>
                <Text>sản phẩm</Text>
              </View>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("SVManageProduct", { userData: userData });
            }}
          >
            <View style={{ alignItems: "center", paddingLeft: 30 }}>
              <View style={styles.borderIcon}>
                <Image
                  source={require("../../images/product.png")}
                  style={{ width: 50, height: 50 }}
                />
              </View>
              <View style={{ justifyContent: "center", alignItems: "center" }}>
                <Text>Quản lý</Text>
                <Text>sản phẩm</Text>
              </View>
            </View>
          </TouchableOpacity>
        </View>
        <View style={{ flexDirection: "row", justifyContent: "center" }}>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("SVManageFoodCat", { userData: userData });
            }}
          >
            <View style={{ alignItems: "center", paddingRight: 30 }}>
              <View style={styles.borderIcon}>
                <Image
                  source={require("../../images/foodcat.png")}
                  style={{ width: 50, height: 50 }}
                />
              </View>
              <View style={{ justifyContent: "center", alignItems: "center" }}>
                <Text>Danh mục</Text>
                <Text>món ăn</Text>
              </View>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("SVFoodManage", { userData: userData });
            }}
          >
            <View style={{ alignItems: "center", paddingLeft: 30 }}>
              <View style={styles.borderIcon}>
                <Image
                  source={require("../../images/food.png")}
                  style={{ width: 50, height: 50 }}
                />
              </View>
              <View style={{ justifyContent: "center", alignItems: "center" }}>
                <Text>Quản lý</Text>
                <Text>món ăn</Text>
              </View>
            </View>
          </TouchableOpacity>
        </View>
      </View>
      <View>
        <View
          style={{
            //borderWidth: 1,
            marginRight: 35,
            borderRadius: 20,
            backgroundColor: "#FF6600",
            position: "absolute",
            width: 350,
            height: 160,
            marginRight: 35,
            marginLeft: 35,
            marginTop: 70,
          }}
        >
          <TouchableOpacity>
            <View
              style={{
                padding: 14,
                flexDirection: "row",
                alignItems: "center",
                //borderBottomWidth: 1,
              }}
            >
              <View style={{ flex: 1.5 }}>
                <FontAwesome name="clock-o" color="#ffffff" size={30} />
              </View>
              <View style={{ flex: 5 }}>
                <Text style={styles.txtOrder}>Chờ xác nhận</Text>
              </View>
              <View style={{ flex: 1 }}>
                <Text style={styles.txtOrder}>{dataLengthConfirm}</Text>
              </View>
              <View style={{ flex: 1 }}>
                <FontAwesome name="angle-right" color="#ffffff" size={30} />
              </View>
            </View>
          </TouchableOpacity>
          <View style={{ backgroundColor: "#ffffff", height: 1 }}></View>
          <TouchableOpacity>
            <View
              style={{
                padding: 14,
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <View style={{ flex: 1.5 }}>
                <FontAwesome name="bicycle" color="#ffffff" size={30} />
              </View>
              <View style={{ flex: 5 }}>
                <Text style={styles.txtOrder}>Chờ giao</Text>
              </View>
              <View style={{ flex: 1 }}>
                <Text style={styles.txtOrder}>{dataLengthDelivery}</Text>
              </View>
              <View style={{ flex: 1 }}>
                <FontAwesome name="angle-right" color="#ffffff" size={30} />
              </View>
            </View>
          </TouchableOpacity>
          <View style={{ backgroundColor: "#ffffff", height: 1 }}></View>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("SVOrderManagement", {
                userData: userData,
                userInfo: userInfo,
              });
            }}
          >
            <View
              style={{
                alignItems: "center",
                padding: 12,
              }}
            >
              <Text style={{ color: "#1E90FF" }}>Xem chi tiết</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
      <LinearGradient
        colors={["#ffffff", "#1E90FF"]}
        start={[0, 1.3]}
        style={styles.returnBottom}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "flex-end",
            justifyContent: "center",
            marginBottom: 10,
          }}
        >
          <FontAwesome name="copyright" color="#ffffff" size={30} />
          <Text
            style={{
              color: "#ffffff",
              marginLeft: 5,
              fontStyle: "italic",
            }}
          >
            Made by Huy
          </Text>
        </View>
      </LinearGradient>
    </View>
  );
}
const styles = StyleSheet.create({
  return: {
    height: 200,
    //backgroundColor: "#1E90FF",
    flexDirection: "row",
    paddingBottom: 10,
    borderRadius: 20,
    zIndex: -1,
  },
  returnBottom: {
    height: 200,
    backgroundColor: "#1E90FF",
    flexDirection: "row",
    paddingBottom: 10,
    borderRadius: 20,
    zIndex: -1,
    justifyContent: "center",
    marginTop: 163,
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
  containerText: {
    justifyContent: "flex-end",
    flex: 5,
  },
  button: {
    flex: 1,
    alignItems: "center",
    borderWidth: 0.5,
    marginTop: 20,
    borderRadius: 10,
    marginLeft: 10,
    marginRight: 10,
    backgroundColor: "#FF6600",
  },
  buttonText: {
    paddingTop: 40,
    paddingBottom: 40,
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    color: "#FFFFFF",
  },
  buttonBill: {
    borderWidth: 0.5,
    borderRadius: 10,
    marginTop: 20,
    marginLeft: 10,
    marginRight: 10,
    alignItems: "center",
    backgroundColor: "#FF6600",
  },
  borderIcon: {
    //borderWidth: 1,
    marginTop: 15,
    width: 80,
    height: 80,
    justifyContent: "center",
    alignItems: "center",
    //borderColor: "#1E90FF",
    borderRadius: 50,
    backgroundColor: "#66CCFF",
  },
  txtOrder: {
    color: "#ffffff",
  },
});
