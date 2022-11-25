import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
} from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { getInfo, getOrder } from "../../services/callAPI";
import { LinearGradient } from "expo-linear-gradient";
import { Avatar, Title, Caption, TouchableRipple } from "react-native-paper";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { useIsFocused } from "@react-navigation/native";

export default function userScreen({ navigation, route }) {
  const { userData } = route.params;
  const [data, setData] = useState([]);
  const [orders, setOrders] = useState([]);
  const isFocused = useIsFocused();
  const [loading, setLoading] = useState(true);
  //console.log(orders);
  // const[lengthOrder, setLengthOrder] = useState([]);

  //   data.accessToken = userData.accessToken;

  const fetchdata = async () => {
    const result = await getInfo(userData);
    if (result.status == 200) {
      setData(result.data.information);
    }
  };

  const getUserOrder = async () => {
    const result = await getOrder(userData);
    if (result.status == 200) {
      setOrders(result.data.orders);
    }
  };

  useEffect(() => {
    fetchdata();
    getUserOrder();
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
        {/* <View>
         <Image
                    source={{ uri: data.userAvatar }}
                    style={{ width: 70, height: 70 }}
                  />
        </View> */}
        <View>
          <View
            style={{
              borderRadius: 15,
              margin: 10,
              backgroundColor: "#FE6347",
            }}
          >
            <View
              style={{
                borderWidth: 2,
                margin: 10,
                borderRadius: 20,
                borderColor: "#ffffff",
                backgroundColor: "#FE6347",
              }}
            >
              <View style={styles.userInfoSection}>
                <View
                  style={{
                    flexDirection: "row",
                    marginTop: 15,
                    marginBottom: 10,
                  }}
                >
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
                  <Icon name="map-marker-radius" size={20} color="#ffffff" />
                  <Text style={styles.text}>Viet Nam</Text>
                </View>
                <View style={styles.row}>
                  <Icon name="phone" size={20} color="#ffffff" />
                  <Text style={styles.text}>{data.phone}</Text>
                </View>
                <View style={styles.row}>
                  <Icon name="email" size={20} color="#ffffff" />
                  <Text style={styles.text}>{data.email}</Text>
                </View>
                <View style={styles.row}>
                  <Icon name="calendar-account" size={20} color="#ffffff" />
                  <Text style={styles.text}>{data.birthday}</Text>
                </View>
                <View style={styles.row}>
                  <Icon name="map-marker" size={20} color="#ffffff" />
                  <Text style={styles.text}>{data.address}</Text>
                </View>
              </View>
            </View>
          </View>
        </View>
        <View style={{ borderWidth: 0.5, alignItems: "center" }}>
          <TouchableRipple
            onPress={() => {
              //navigation.navigate("CLOrderManagementScreen");
              navigation.navigate("CLOrderManagementScreen", {
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
              //console.log(userData.roles);
              if (userData.roles.includes("ROLE_MERCHANT")) {
                navigation.navigate("SVHomeScreen", { userData: userData });
              } else {
                Alert.alert("Thông báo", "Tài khoản của bạn không có quyền");
              }

              //navigation.navigate("CLMarketNoteScreen", { userData: userData });
            }}
          >
            <View style={styles.menuItem}>
              <Icon name="cart-outline" color="#FE6347" size={25} />
              <Text style={styles.menuItemText}>Quản lý bán hàng</Text>
            </View>
          </TouchableRipple>
          <TouchableRipple
            onPress={() => {
              navigation.navigate("CLFavouriteFoodsScreen", {
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
              navigation.navigate("CLMarketNoteScreen", { userData: userData });
            }}
          >
            <View style={styles.menuItem}>
              <Icon name="bookmark-outline" color="#FE6347" size={25} />
              <Text style={styles.menuItemText}>Quản lý ghi chú</Text>
            </View>
          </TouchableRipple>
          <TouchableRipple
            onPress={() => {
              navigation.navigate("CLUpdateProfileScreen", {
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
              navigation.navigate("CLUpdatePasswordScreen", {
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
    color: "#ffffff",
  },
  userInfoSection: {
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#ffffff",
  },
  caption: {
    fontSize: 14,
    lineHeight: 14,
    fontWeight: "500",
    color: "#ffffff",
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
