import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextStyle,
  SafeAreaView,
  StyleSheet,
  ScrollView,
  Alert,
  Image,
  FlatList,
  VirtualizedList,
  TouchableOpacity,
} from "react-native";
import axios from "axios";
import { Avatar, Title, Caption, TouchableRipple } from "react-native-paper";
import { Card } from "react-native-elements";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import API from "../../services/api";
import * as ImagePicker from "expo-image-picker";
import { useIsFocused } from "@react-navigation/native";

export default function SVFoodDetail({ route, navigation }) {
  const { foodId, userData } = route.params;
  const [data, setData] = useState([]);
  const [meterial, setMeterial] = useState([]);
  const [step, setStep] = useState([]);
  const [image, setImage] = useState([]);
  let form = new FormData();
  const isFocused = useIsFocused();

  const fetchdata = async () => {
    const result = await API.get(`foods/detail/${foodId}`, {
      headers: {
        "Content-Type": "application/json",
        "x-access-token": userData.accessToken,
      },
    });
    //console.log(result.data.food);
    setData(result.data.food);
    setMeterial(result.data.food.foodMaterials);
    setStep(result.data.food.foodCookSteps);
    //console.log(result.data.food.foodMaterials);
    //console.log(meterial);
  };
  const UploadImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: false,
      aspect: [4, 3],
      quality: 1,
    });
    if (!result.cancelled) {
      //Alert.alert("Thông báo","Chọn hình thành công")
      //setImage(result.uri);
      let file = {
        name: "avatar.jpg",
        uri: result.uri,
        type: "image/jpeg",
      };
      form.append("file", file);
      API.post(`merchant/foods/update/image/${foodId}`, form, {
        headers: {
          "Content-Type": "multipart/form-data",
          "x-access-token": userData.accessToken,
        },
      })
        .then((res) => {
          if (res.status === 201) {
            fetchdata();
          }
          //navigation.goBack();
        })
        .catch((error) => {
          console.log("Error", error.res);
        });
    }
  };

  useEffect(() => {
    fetchdata();
  }, [setData, isFocused]);

  const ButtonSetFood = () => {
    if (data.isShowing == true) {
      return (
        <TouchableOpacity
          style={{ alignItems: "center" }}
          onPress={() => {
            API.post(
              `merchant/foods/update/${data.id}`,
              {
                foodName: data.foodName,
                foodDescription: data.foodDescription,
                foodCalories: data.foodCalories,
                isShowing: false,
                foodCategory: data.foodCategory,
                foodMaterials: data.foodMaterials,
                foodCookSteps: data.foodCookSteps,
              },
              {
                headers: {
                  "Content-Type": "application/json",
                  "x-access-token": userData.accessToken,
                },
              }
            )
              .then((res) => {
                Alert.alert("Thông báo", "Cập nhật thành công");
                fetchdata();
              })
              .catch((error) => {
                Alert.alert("Error", error.res);
              });
          }}
        >
          <Text
            style={{
              borderWidth: 0.5,
              paddingBottom: 3,
              paddingTop: 3,
              paddingLeft: 10,
              paddingRight: 10,
              backgroundColor: "#FF0000",
              color: "#FFFFFF",
            }}
          >
            Vô hiệu hóa
          </Text>
        </TouchableOpacity>
      );
    } else {
      return (
        <TouchableOpacity
          style={{ alignItems: "center" }}
          onPress={() => {
            API.post(
              `merchant/foods/update/${data.id}`,
              {
                foodName: data.foodName,
                foodDescription: data.foodDescription,
                foodCalories: data.foodCalories,
                isShowing: true,
                foodCategory: data.foodCategory,
                foodMaterials: data.foodMaterials,
                foodCookSteps: data.foodCookSteps,
              },
              {
                headers: {
                  "Content-Type": "application/json",
                  "x-access-token": userData.accessToken,
                },
              }
            )
              .then((res) => {
                Alert.alert("Thông báo", "Cập nhật thành công");
                fetchdata();
              })
              .catch((error) => {
                Alert.alert("Error", error.res);
              });
          }}
        >
          <Text
            style={{
              borderWidth: 0.5,
              paddingBottom: 3,
              paddingTop: 3,
              paddingLeft: 10,
              paddingRight: 10,
              backgroundColor: "#FF0000",
              color: "#FFFFFF",
            }}
          >
            Hiển thị lại
          </Text>
        </TouchableOpacity>
      );
    }
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
        <Text style={styles.returnText}>Chi tiết</Text>
      </View>
      <ScrollView style={{ height: "85%" }}>
        <View style={styles.image}>
          <Avatar.Image source={{ uri: data.foodImage }} size={300} />
        </View>
        <TouchableOpacity
          onPress={UploadImage}
          style={{ alignItems: "center" }}
        >
          <FontAwesome name="camera" color="#05375a" size={20} />
        </TouchableOpacity>
        <View style={styles.title}>
          <Text style={styles.textTitle}>{data.foodName}</Text>
        </View>
        <Text
          style={{
            marginLeft: 15,
            marginRight: 15,
            marginBottom: 10,
            marginTop: 15,
          }}
        >
          {data.foodDescription}
        </Text>
        <Text style={styles.textMeterial}>1. Nguyên liệu</Text>

        <View style={styles.cardMeterial}>
          {meterial.map((item) => (
            <View key={item.id}>
              <View style={{ flexDirection: "row" }}>
                <Text style={styles.textMeterialTitle}>
                  {"- " + item.foodMaterialName + " "}
                </Text>
                <Text>{item.quantityDescription}</Text>
              </View>
            </View>
          ))}
        </View>

        <Text style={[styles.textMeterial, { marginTop: 10 }]}>
          2. Các bước thực hiện
        </Text>

        <View style={{ marginBottom: 20 }}>
          {step.map((item) => {
            return (
              <SafeAreaView key={item.id}>
                <View style={styles.stepCook}>
                  <Card>
                    <Text style={styles.textStep}>
                      {"Bước" + " " + item.stepNumber + "" + ":"}
                    </Text>
                    <Text>{item.stepDescription}</Text>
                  </Card>

                  {/* <Text style={styles.textStep}>{'Bước' + ' ' + item.stepNumber + ''+':'}</Text>
                                    <Text>{item.stepDescription}</Text> */}
                </View>
              </SafeAreaView>
            );
          })}
        </View>
        <View style={{ marginBottom: 10 }}>{ButtonSetFood()}</View>
      </ScrollView>
      <TouchableOpacity
        style={{
          justifyContent: "center",
          alignItems: "center",
          borderWidth: 1,
          borderRadius: 10,
          marginTop: 10,
          marginLeft: 30,
          marginRight: 30,
          backgroundColor: "#FF4B3A",
        }}
        onPress={() => {
          navigation.navigate("SVUpdateFood", {
            userData: userData,
            foodId: foodId,
          });
        }}
      >
        <Text
          style={{
            fontWeight: "bold",
            fontSize: 17,
            paddingTop: 10,
            paddingBottom: 10,
            color: "#FFFFFF",
          }}
        >
          Chỉnh sửa
        </Text>
      </TouchableOpacity>
    </View>
  );
}
const styles = StyleSheet.create({
  image: {
    marginTop: 30,
    alignItems: "center",
  },
  textTitle: {
    fontSize: 30,
    fontWeight: "bold",
  },
  title: {
    alignItems: "center",
  },
  textMeterial: {
    marginLeft: 10,
    fontSize: 20,
  },
  textMeterialTitle: {
    fontWeight: "bold",
    marginLeft: 20,
  },
  weightMeterial: {
    flexDirection: "row",
  },
  textStep: {
    fontWeight: "bold",
  },
  stepCook: {
    marginLeft: 10,
    marginRight: 10,
  },
  cardMeterial: {
    marginLeft: 10,
    marginRight: 10,
  },
  stepCookView: {
    marginBottom: 30,
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
    flex: 2.5,
    //borderWidth: 1,
    fontWeight: "bold",
    fontSize: 20,
    color: "#ffffff",
    marginRight: 75,
  },
});
