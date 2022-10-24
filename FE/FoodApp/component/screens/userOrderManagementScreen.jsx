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
import axios from "axios";

import FontAwesome from "react-native-vector-icons/FontAwesome";

import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import ConfirmingOrdersScreen from "./Orders/ConfirmingOrdersScreen";
import DeliveryingOrdersScreen from "./Orders/DeliveryingOrdersScreen";
import DoneOrdersScreen from "./Orders/DoneOrdersScreen";
import CancelOrdersScreen from "./Orders/CancelOrdersScreen";
const Tab = createMaterialTopTabNavigator();

export default function userOrderManagementScreen({ navigation, route }) {
  const { userData, orders, userInfo } = route.params;
  // console.log(userData);
  // console.log(orders);

  //const orderStatus = ['Chờ duyệt', 'Đang giao', 'Đã giao', 'Hủy đơn']

  var ConfirmingOrders = [];
  var DeliveryingOrders = [];
  var DoneOrders = [];
  var CancelOrders = [];

  orders.forEach((order) => {
    if (order.isCanceled !== 0) {
      CancelOrders.push(order);
    } else if (order.isDone == 0) {
      ConfirmingOrders.push(order);
    } else if (order.isDone == 2) {
      DeliveryingOrders.push(order);
    } else if (order.isDone == 1) {
      DoneOrders.push(order);
    }
  });
  // console.log("Confirm",ConfirmingOrders);
  // console.log("Deli",DeliveryingOrders);
  // console.log("Done",DoneOrders);
  // console.log("Cancel",CancelOrders);
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
        <Text style={styles.returnText}>Quản lý đơn hàng</Text>
      </View>
      <Tab.Navigator
        screenOptions={{
          tabBarStyle: { height: 50, justifyContent: "center" },
        }}
      >
        <Tab.Screen
          name="Chờ duyệt"
          component={ConfirmingOrdersScreen}
          initialParams={{ ConfirmingOrders, userData, userInfo }}
          options={{ headerShown: false }}
        />
        <Tab.Screen
          name="Đang giao"
          component={DeliveryingOrdersScreen}
          initialParams={{ DeliveryingOrders, userData, userInfo }}
          options={{ headerShown: false }}
        />
        <Tab.Screen
          name="Đã giao"
          component={DoneOrdersScreen}
          initialParams={{ DoneOrders, userData, userInfo }}
          options={{ headerShown: false }}
        />
        <Tab.Screen
          name="Hủy đơn"
          component={CancelOrdersScreen}
          initialParams={{ CancelOrders, userData, userInfo }}
          options={{ headerShown: false }}
        />
      </Tab.Navigator>
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
  container: {
    height: "100%",
  },
});
