import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";

import { Avatar, Title, Caption, TouchableRipple } from "react-native-paper";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import API from "../services/api";
import { useIsFocused } from "@react-navigation/native";
export default function userScreen({ navigation, route }) {
  const { userData } = route.params;
  const [data, setData] = useState([]);
  const [orders, setOrders] = useState([]);
  const isFocused = useIsFocused();
  //console.log(orders);
  // const[lengthOrder, setLengthOrder] = useState([]);

  data.accessToken = userData.accessToken;

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

  const getUserOrder = async () => {
    const result = await API.get(`order/${userData.id}`, {
      headers: {
        "Content-Type": "application/json",
        "x-access-token": userData.accessToken,
      },
    });
    setOrders(result.data.orders);
    //console.log(result.data.orders);
  };

  useEffect(async () => {
    await fetchdata();
    await getUserOrder();
  }, [setData, setOrders, isFocused]);

  return (
    // <View>
    //     <Text>{JSON.stringify(data.username)}</Text>
    // </View>

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
        <Text style={styles.returnText}>Thông tin cá nhân</Text>
      </View>
      <ScrollView style={{ height: "95%" }}>
        <View style={styles.userInfoSection}>
          <View style={{ flexDirection: "row", marginTop: 15 }}>
            <Avatar.Image
              source={{
                uri: data.userAvatar,
              }}
              size={80}
            />
            <View style={{ marginLeft: 20 }}>
              <Title
                style={[
                  styles.title,
                  {
                    marginTop: 15,
                    marginBottom: 5,
                  },
                ]}
              >
                {data.firstname + " " + data.lastname}
              </Title>
              <Caption style={styles.caption}>@{data.username}</Caption>
            </View>
          </View>
        </View>
        <View style={styles.userInfoSection}>
          <View style={styles.row}>
            <Icon name="map-marker-radius" size={20} />
            <Text style={styles.text}>Viet Nam</Text>
          </View>
          <View style={styles.row}>
            <Icon name="phone" size={20} />
            <Text style={styles.text}>{data.phone}</Text>
          </View>
          <View style={styles.row}>
            <Icon name="email" size={20} />
            <Text style={styles.text}>{data.email}</Text>
          </View>
          <View style={styles.row}>
            <Icon name="calendar-account" size={20} />
            <Text style={styles.text}>{data.birthday}</Text>
          </View>
          <View style={styles.row}>
            <Icon name="map-marker" size={20} />
            <Text style={styles.text}>{data.address}</Text>
          </View>
        </View>
        <View style={{ borderWidth: 0.5, alignItems: "center" }}>
          <TouchableRipple
            onPress={() => {
              navigation.navigate("userOrderManagementScreen", {
                userData: userData,
                orders: orders,
                userInfo: data,
              });
            }}
            style={[
              styles.infoBox,
              {
                borderRightColor: "#dddddd",
                //borderRightWidth: 1,
              },
            ]}
          >
            <View style={{ alignItems: "center" }}>
              <Title>{orders.length}</Title>
              <Caption>Số đơn hàng</Caption>
            </View>
          </TouchableRipple>
        </View>
        <View style={styles.menuWrapper}>
          <TouchableRipple
            onPress={() => {
              navigation.navigate("updateFavoriteFoodScreen", {
                userData: userData,
              });
            }}
          >
            <View style={styles.menuItem}>
              <Icon name="heart-outline" color="#FE6347" size={25} />
              <Text style={styles.menuItemText}>Danh mục món ăn yêu thích</Text>
            </View>
          </TouchableRipple>
          <TouchableRipple
            onPress={() => {
              navigation.navigate("marketNoteScreen", { userData: userData });
            }}
          >
            <View style={styles.menuItem}>
              <Icon name="bookmark-outline" color="#FE6347" size={25} />
              <Text style={styles.menuItemText}>Quản lý ghi chú</Text>
            </View>
          </TouchableRipple>
          <TouchableRipple
            onPress={() => {
              navigation.navigate("updateUserProfileScreen", {
                userData: data,
              });
            }}
          >
            <View style={styles.menuItem}>
              <Icon name="cog-outline" color="#FE6347" size={25} />
              <Text style={styles.menuItemText}>
                Cập nhật thông tin cá nhân
              </Text>
            </View>
          </TouchableRipple>
          <TouchableRipple
            onPress={() => {
              navigation.navigate("changePasswordScreen", {
                userData: userData,
              });
            }}
          >
            <View style={styles.menuItem}>
              <Icon name="cog-outline" color="#FE6347" size={25} />
              <Text style={styles.menuItemText}>Đổi mật khẩu</Text>
            </View>
          </TouchableRipple>
          <TouchableRipple
            onPress={() => {
              navigation.navigate("signInScreen");
            }}
          >
            <View style={styles.menuItem}>
              <Icon name="logout" color="#FE6347" size={25} />
              <Text style={styles.menuItemText}>Sign Out</Text>
            </View>
          </TouchableRipple>
        </View>
      </ScrollView>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 30,
  },
  text: {
    marginLeft: 10,
  },
  userInfoSection: {
    paddingHorizontal: 30,
    marginBottom: 25,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
  },
  caption: {
    fontSize: 14,
    lineHeight: 14,
    fontWeight: "500",
  },
  row: {
    flexDirection: "row",
    marginBottom: 10,
  },
  infoBoxWrapper: {
    borderBottomColor: "#dddddd",
    borderBottomWidth: 1,
    borderTopColor: "#dddddd",
    borderTopWidth: 1,
    flexDirection: "row",
    height: 100,
  },
  infoBox: {
    width: "50%",
    alignItems: "center",
    justifyContent: "center",
  },
  menuWrapper: {
    marginTop: 10,
  },
  menuItem: {
    flexDirection: "row",
    paddingVertical: 15,
    paddingHorizontal: 30,
  },
  menuItemText: {
    color: "#777777",
    marginLeft: 20,
    fontWeight: "600",
    fontSize: 16,
    lineHeight: 26,
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
