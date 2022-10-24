import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { Avatar, Title, Caption, TouchableRipple } from "react-native-paper";
import { Card } from "react-native-elements";

import FontAwesome from "react-native-vector-icons/FontAwesome";
import API from "../../services/api";

export default function CLFoodsDetailScreen({ route, navigation }) {
  const { foodId, userData } = route.params;

  //console.log("HUY111111",foodId);

  const [data, setData] = useState([]);
  const [meterial, setMeterial] = useState([]);
  const [step, setStep] = useState([]);

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

  useEffect(() => {
    fetchdata();
  }, [setData]);

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
      <ScrollView style={{ height: "92%" }}>
        <View style={styles.image}>
          <Avatar.Image source={{ uri: data.foodImage }} size={300} />
        </View>
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
        <View style={{ flexDirection: "row" }}>
          <View style={{ flex: 2 }}>
            <View
              style={{
                backgroundColor: "#888888",
              }}
            >
              <Text style={styles.textMeterial}>
                1. Nguyên liệu (Cho 1 phần ăn)
              </Text>
            </View>
            <View style={styles.cardMeterial}>
              {meterial.map((item) => (
                <View key={item.id}>
                  <View style={{ flexDirection: "row" }}>
                    <View
                      style={{
                        flex: 2,
                        justifyContent: "center",
                        borderBottomWidth: 0.5,
                        marginLeft: 10,
                      }}
                    >
                      <Text style={styles.textMeterialTitle}>
                        {"- " + item.foodMaterialName + " "}
                      </Text>
                    </View>
                    <View
                      style={{
                        flex: 1,
                        borderBottomWidth: 0.5,
                        marginRight: 10,
                        justifyContent: "center",
                      }}
                    >
                      <Text>{item.quantityDescription}</Text>
                    </View>
                  </View>
                </View>
              ))}
            </View>
          </View>
        </View>

        <View
          style={{
            backgroundColor: "#888888",
            marginTop: 10,
          }}
        >
          <Text style={styles.textMeterial}>2. Các bước thực hiện</Text>
        </View>

        <View style={{ marginBottom: 70 }}>
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
      </ScrollView>
      <View
        style={{
          position: "absolute",
          alignSelf: "flex-end",
          bottom: 0,
          paddingBottom: 30,
          paddingRight: 50,
        }}
      >
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("CLFoodsMaterialScreen", {
              userData: userData,
              foodId: foodId,
            });
          }}
        >
          <View
            style={{
              alignItems: "center",
              backgroundColor: "#FF4B3A",
              borderRadius: 10,
            }}
          >
            <Text
              style={{
                padding: 10,
                fontWeight: "bold",
                fontSize: 15,
                color: "#FFFFFF",
              }}
            >
              Chuẩn bị nguyên liệu
            </Text>
          </View>
        </TouchableOpacity>
      </View>
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
    margin: 5,
    fontSize: 20,
    color: "#ffffff",
    fontWeight: "bold",
  },
  textMeterialTitle: {
    fontWeight: "bold",
    marginLeft: 10,
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
    marginTop: 10,
    borderLeftWidth: 2,
    borderBottomWidth: 2,
    borderRightWidth: 2,
    borderRadius: 5,
    borderColor: "#666666",
  },
  stepCookView: {
    marginBottom: 10,
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
