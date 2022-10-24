import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import CLFoodsMaterial_Market from "./FoodsMaterial/CLFoodsMaterial_Market";
import CLFoodsMaterial_Note from "./FoodsMaterial/CLFoodsMaterial_Note";

const Tab = createMaterialTopTabNavigator();

export default function CLFoodsMaterialScreen({ navigation, route }) {
  const { foodId, userData } = route.params;
  //console.log(extractNote);

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
        <Text style={styles.returnText}>Nguyên liệu</Text>
      </View>
      <Tab.Navigator
        screenOptions={{
          tabBarStyle: { height: 50, justifyContent: "center" },
        }}
      >
        <Tab.Screen
          name="Nguyên liệu"
          component={CLFoodsMaterial_Note}
          initialParams={{ foodId, userData }}
          options={{ headerShown: false }}
        />
        <Tab.Screen
          name="Trong cửa hàng"
          component={CLFoodsMaterial_Market}
          initialParams={{ foodId, userData }}
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
