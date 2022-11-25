import React, { useState, useEffect, useCallback } from "react";
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
  FlatList,
  ScrollView,
  SafeAreaView,
} from "react-native";
import { Avatar, Title, Caption, TouchableRipple } from "react-native-paper";
import API from "../../services/api";
import { getInfo } from "../../services/callAPI";
import { Card } from "react-native-elements";

import FontAwesome from "react-native-vector-icons/FontAwesome";
import { useIsFocused } from "@react-navigation/native";
export default function CLHomeScreen({ navigation, route }) {
  const { userData } = route.params;
  const [data, setData] = useState([]);
  const [dataFa, setDataFa] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const isFocused = useIsFocused();

  const [dataFavorites, setDataFavorites] = useState([]);

  const fetchdata = async () => {
    // const result = await API.get(`user/information/${userData.id}`, {
    //   headers: {
    //     "Content-Type": "application/json",
    //     "x-access-token": userData.accessToken,
    //   },
    // });
    const result = await getInfo(userData);
    if (result.status == 200) {
      setData(result.data.information);
      setDataFa(result.data.information.favoriteFoodCategory);
    }
    //console.log(result.data.information);

    if (result.data.information.favoriteFoodCategory.length > 0) {
      try {
        const listFavFood = await API.post(
          "foods/favorite",
          {
            listFavoriteFoodCategory:
              result.data.information.favoriteFoodCategory,
          },
          {
            headers: {
              "Content-Type": "application/json",
              "x-access-token": userData.accessToken,
            },
          }
        );
        setDataFavorites(listFavFood.data.favoriteFoods);
        //console.log(listFavFood.data.favoriteFoods);
      } catch (err) {
        //console.log(err);
      }
    }
  };

  useEffect(async () => {
    await fetchdata();
  }, [isFocused, setData, setDataFa]);

  if (dataFa.length === 0) {
    return (
      <View>
        <View style={styles.containerTitle}>
          <View
            style={{ justifyContent: "center", marginLeft: 20, marginTop: 20 }}
          >
            <Avatar.Image source={{ uri: data.userAvatar }} s />
          </View>
          <View style={styles.title}>
            <Text style={styles.textTitle}>
              {"Xin chào, " + data.firstname + " " + data.lastname + "!"}
            </Text>
            <Text style={styles.captionTitle}>
              Bạn muốn nấu món gì hôm nay?
            </Text>
          </View>
        </View>
        <View style={styles.ContainertextTitleButton}>
          <Text style={styles.textTitleButton}>Thao tác ngay!</Text>
        </View>
        <View style={styles.Button}>
          <View style={styles.containerButton}>
            <View style={styles.containerFood}>
              <TouchableOpacity
                onPress={() => {
                  navigation.jumpTo("Món ăn");
                }}
              >
                <FontAwesome name="bars" color="#ffffff" size={50} />
              </TouchableOpacity>
            </View>
            <View style={styles.containerShop}>
              <TouchableOpacity
                onPress={() => {
                  navigation.jumpTo("Sản phẩm");
                }}
              >
                <FontAwesome name="shopping-cart" color="#ffffff" size={50} />
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.containerText}>
            <View style={styles.textCaption}>
              <Text style={styles.textCaptionDetail}>Món Ngon</Text>
            </View>
            <View style={styles.textCaption}>
              <Text style={styles.textCaptionDetail}>Mua sắm ngay</Text>
            </View>
          </View>
        </View>
        <View style={{ marginLeft: 10, marginRight: 15 }}>
          <View style={styles.bordercaption}>
            <Text style={styles.caption}>Danh mục món ăn yêu thích</Text>
          </View>

          <TouchableOpacity
            onPress={() => {
              navigation.navigate("CLFavouriteFoodsScreen", {
                userData: userData,
              });
            }}
          >
            <View
              style={{
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text style={styles.addFavoriteFood}>Thêm món ăn yêu thích</Text>
              <View>
                <FontAwesome name="plus" color="#FF0000" size={20} />
              </View>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    );
  } else {
    return (
      <View>
        <View style={styles.containerTitle}>
          <View
            style={{ justifyContent: "center", marginLeft: 10, marginTop: 20 }}
          >
            <Avatar.Image source={{ uri: data.userAvatar }} />
          </View>
          <View style={styles.title}>
            <Text style={styles.textTitle}>
              {"Xin chào, " + data.firstname + " " + data.lastname + "!"}
            </Text>
            <Text style={styles.captionTitle}>
              Bạn muốn nấu món gì hôm nay?
            </Text>
          </View>
        </View>
        <View style={styles.ContainertextTitleButton}>
          <Text style={styles.textTitleButton}>Thao tác ngay!</Text>
        </View>
        <View style={styles.Button}>
          <View style={styles.containerButton}>
            <View style={styles.containerFood}>
              <TouchableOpacity
                onPress={() => {
                  navigation.jumpTo("Món ăn");
                }}
              >
                <FontAwesome name="bars" color="#ffffff" size={50} />
              </TouchableOpacity>
            </View>
            <View style={styles.containerShop}>
              <TouchableOpacity
                onPress={() => {
                  navigation.jumpTo("Sản phẩm");
                }}
              >
                <FontAwesome name="shopping-cart" color="#ffffff" size={50} />
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.containerText}>
            <View style={styles.textCaption}>
              <Text style={styles.textCaptionDetail}>Món Ngon</Text>
            </View>
            <View style={styles.textCaption}>
              <Text style={styles.textCaptionDetail}>Mua sắm ngay</Text>
            </View>
          </View>
        </View>
        <View style={styles.card}>
          <View style={styles.bordercaption}>
            <Text style={styles.caption}>Danh mục món ăn yêu thích</Text>
          </View>
          <View>
            <FlatList
              horizontal={true}
              data={dataFavorites}
              renderItem={({ item }) => (
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate("CLFoodsDetailScreen", {
                      userData: userData,
                      foodId: item.id,
                    });
                  }}
                >
                  <Card
                    containerStyle={{
                      marginTop: 35,
                      marginBottom: 10,
                      width: 220,
                      borderRadius: 20,
                      shadowColor: "#808080",
                      shadowOffset: { width: 5, height: 5 },
                      shadowOpacity: 0.5,
                      shadowRadius: 2,
                    }}
                  >
                    <View style={{ marginTop: 20 }}>
                      <Card.Image source={{ uri: item.foodImage }} />
                    </View>
                    <Card.Divider />

                    {/* <View style={styles.food}>
                      <Text style={styles.textFood}>{item.foodName}</Text>
                    </View> */}
                    <Card.Divider />
                    <Card.Title>{item.foodName}</Card.Title>
                  </Card>
                </TouchableOpacity>
              )}
              keyExtractor={(item) => item.id}
            />
          </View>
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  containerTitle: {
    height: 170,
    flexDirection: "row",
    borderRadius: 40,
    backgroundColor: "#FF4B3A",
    shadowColor: "#FF4B3A",
    shadowOffset: { width: 5, height: 10 },
    shadowOpacity: 0.5,
    shadowRadius: 2,
  },
  textTitle: {
    fontSize: 25,
    fontWeight: "bold",
    color: "#ffffff",
  },
  title: {
    marginTop: 20,
    marginLeft: 10,
    justifyContent: "center",
  },
  caption: {
    fontWeight: "bold",
    fontSize: 18,
    marginLeft: 20,
    color: "#ffffff",
    marginTop: 10,
    marginBottom: 10,
  },
  captionTitle: {
    fontSize: 18,
    color: "#ffffff",
  },
  bordercaption: {
    marginTop: 30,
    //borderWidth: 1,
    borderRadius: 5,
    backgroundColor: "#666666",
  },
  containerButton: {
    marginTop: 40,
    marginLeft: 60,
    marginRight: 60,
    flexDirection: "row",
    height: 90,
  },
  containerFood: {
    flex: 1,
    alignItems: "center",
    //borderWidth: 1,
    marginRight: 7,
    borderRadius: 15,
    backgroundColor: "#FF4B3A",
    justifyContent: "center",
  },
  containerShop: {
    flex: 1,
    alignItems: "center",
    //borderWidth: 1,
    marginLeft: 20,
    borderRadius: 15,
    backgroundColor: "#FF4B3A",
    justifyContent: "center",
  },
  containerText: {
    flexDirection: "row",
    marginLeft: 50,
    marginRight: 50,
  },
  textCaption: {
    flex: 1,
    alignItems: "center",
  },
  textCaptionDetail: {
    fontWeight: "bold",
    color: "#FF0000",
    fontSize: 20,
    marginTop: 10,
  },
  addFavoriteFood: {
    fontWeight: "bold",
    marginTop: 10,
    marginLeft: 30,
    color: "#FF0000",
  },
  food: {
    width: 220,
    alignItems: "center",
  },
  textFood: {
    fontWeight: "bold",
    marginLeft: 70,
  },
  card: {
    marginLeft: 15,
    marginRight: 15,
  },
  cardFood: {
    marginBottom: 1,
  },
  Button: {
    borderWidth: 2,
    borderRadius: 5,
    paddingBottom: 15,
    borderColor: "#666666",
    marginTop: 45,
    marginLeft: 5,
    marginRight: 5,
    zIndex: -1,
  },
  textTitleButton: {
    fontWeight: "bold",
    paddingTop: 5,
    marginBottom: 10,
    paddingLeft: 10,
    paddingRight: 10,
    fontSize: 20,
    color: "#ffffff",
    zIndex: 0,
  },
  ContainertextTitleButton: {
    position: "absolute",
    marginTop: 195,
    backgroundColor: "#666666",
    marginLeft: 15,
    width: 384,
    borderRadius: 5,

    justifyContent: "center",
    alignItems: "center",
  },
});
