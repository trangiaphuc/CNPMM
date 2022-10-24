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
import SVOrderConfirm from "./SVOrderConfirm";
import SVOrderDelivery from "./SVOrderDelivery";
import SVOrderDone from "./SVOrderDone";
import SVOrderCancel from ".//SVOrderCancel";
const Tab = createMaterialTopTabNavigator();

export default function SVOrderManagement({ navigation, route }) {
  const { userData, userInfo } = route.params;
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
          component={SVOrderConfirm}
          initialParams={{ userData, userInfo }}
          options={{ headerShown: false }}
        />
        <Tab.Screen
          name="Đang giao"
          component={SVOrderDelivery}
          initialParams={{ userData, userInfo }}
          options={{ headerShown: false }}
        />
        <Tab.Screen
          name="Đã giao"
          component={SVOrderDone}
          initialParams={{ userData, userInfo }}
          options={{ headerShown: false }}
        />
        <Tab.Screen
          name="Hủy đơn"
          component={SVOrderCancel}
          initialParams={{ userData, userInfo }}
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
