import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Alert,
} from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import API from "../../../services/api";
import { addNoteItem } from "../../../services/callAPI";
import { Card } from "react-native-elements";
export default function CLFoodsMaterial_Note({ navigation, route }) {
  const { foodId, userData } = route.params;
  const [extractNote, setExtractNote] = useState([]);
  const fetchExtract = async () => {
    const result = await API.get(`foods/foodextract/${foodId}`, {
      headers: {
        "Content-Type": "application/json",
        "x-access-token": userData.accessToken,
      },
    });
    //console.log("Cart", result.data.listCartItems);
    //console.log("Note", result.data.listMarketNoteItems);
    //setExtractCart(result.data.listCartItems);
    setExtractNote(result.data.listMarketNoteItems);
  };
  const MTAddToNote = async () => {
    var listItem = [];
    extractNote.forEach((item) => {
      listItem.push({
        marketNoteText: item.foodMaterialName,
        remindDate: null,
        isDone: false,
        isDelete: false,
      });
    });
    const result = await addNoteItem(userData, listItem);
    if (result.status == 201) {
      Alert.alert("Thông báo", "Thêm nguyên liệu vào ghi chu thành công");
    }
    //console.log(listItem);
  };

  const extractNoteData = ({ item }) => {
    return (
      <View>
        {
          <Card>
            <Text>
              {item.foodMaterialName + ": " + item.quantityDescription}
            </Text>
            {/* <Text>{"Số lượng: " + num}</Text> */}
          </Card>
        }
      </View>
    );
  };
  useEffect(() => {
    fetchExtract();
  }, [setExtractNote]);

  return (
    <View style={{ height: "100%" }}>
      <FlatList
        data={extractNote}
        renderItem={extractNoteData}
        keyExtractor={(item) => item.id}
      />
      <View
        style={{
          position: "absolute",
          alignSelf: "flex-end",
          bottom: 0,
          paddingBottom: 50,
          paddingRight: 50,
        }}
      >
        <TouchableOpacity onPress={MTAddToNote}>
          <View
            style={{
              paddingVertical: 15,
              paddingHorizontal: 20,
              borderRadius: 10,
              backgroundColor: "#ff0000",
            }}
          >
            <Text
              style={{ fontWeight: "bold", fontSize: 16, color: "#ffffff" }}
            >
              Thêm vào ghi chu
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
}
