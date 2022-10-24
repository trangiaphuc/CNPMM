import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text, FlatList } from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import API from "../../../services/api";

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
  }, []);

  return (
    <View>
      <FlatList
        data={extractNote}
        renderItem={extractNoteData}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
}
