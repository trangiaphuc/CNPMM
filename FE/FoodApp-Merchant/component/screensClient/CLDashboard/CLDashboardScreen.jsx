import React from "react";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import CLHomeScreen from "../CLHome/CLHomeScreen";
import CLFoodsScreen from "../CLFoods/CLFoodsScreen";
import CLProductScreen from "../CLProducts/CLProductScreen";
import CLCartScreen from "../CLCart/CLCartScreen";
import CLProfileScreen from "../CLProfile/CLProfileScreen";
// import userScreen from "../screens/userScreen";
// import foodScreen from "./foodScreen";
// import cartScreen from "./cartScreen";
// import welcomScreen from "./welcomScreen";

import Ionicons from "react-native-vector-icons/Ionicons";
const Tab = createBottomTabNavigator();
const CLDashboardScreen = ({ route, navigation }) => {
  const { userData } = route.params;
  //console.log(response);
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarStyle: {
          backgroundColor: "#FF4B3A",
        },
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === "Trang chủ") {
            iconName = focused ? "home-sharp" : "home-outline";
          } else if (route.name === "Món ăn") {
            iconName = focused ? "fast-food-sharp" : "fast-food-outline";
          } else if (route.name === "Giỏ hàng") {
            iconName = focused ? "cart-sharp" : "cart-outline";
          } else if (route.name === "Cá nhân") {
            iconName = focused ? "people-sharp" : "people-outline";
          } else if (route.name === "Sản phẩm") {
            iconName = focused ? "beaker-sharp" : "beaker-outline";
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: "#444444",
        tabBarInactiveTintColor: "#ffffff",
      })}
    >
      <Tab.Screen
        name="Trang chủ"
        component={CLHomeScreen}
        initialParams={{ userData }}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="Sản phẩm"
        component={CLProductScreen}
        initialParams={{ userData }}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="Món ăn"
        component={CLFoodsScreen}
        initialParams={{ userData }}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="Giỏ hàng"
        component={CLCartScreen}
        initialParams={{ userData }}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="Cá nhân"
        component={CLProfileScreen}
        initialParams={{ userData }}
        options={{ headerShown: false }}
      />
    </Tab.Navigator>
  );
};

export default CLDashboardScreen;
