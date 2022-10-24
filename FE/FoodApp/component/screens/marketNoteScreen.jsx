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

import API from "../services/api";
import { useIsFocused } from "@react-navigation/native";
import { Card } from "react-native-elements";

export default function marketNoteScreen({ navigation, route }) {
  const isFocused = useIsFocused();
  const { userData } = route.params;
  const [marketNoteList, setMarketNoteList] = useState([]);

  const fetchDataMarketNoteList = async () => {
    const result = await API.get(`marketnote/${userData.id}`, {
      headers: {
        "Content-Type": "application/json",
        "x-access-token": userData.accessToken,
      },
    });
    //console.log(result.data.marketNotes);
    setMarketNoteList(result.data.marketNotes);
  };

  useEffect(() => {
    fetchDataMarketNoteList();
  }, [setMarketNoteList, isFocused]);

  const deleteNote = (id) => {
    var article = "Delete";
    API.put(`marketnote/${userData.id}/delete/${id}`, article, {
      headers: {
        "x-access-token": userData.accessToken,
      },
    })
      .then((res) => {
        fetchDataMarketNoteList();
      })
      .catch((error) => {
        alert("Error", error.res);
      });
  };

  const SetCardNote = (item) => {
    if (item.isDone == 0) {
      return (
        <Card containerStyle={{ borderRadius: 10 }}>
          <View style={{ flexDirection: "row" }}>
            <View style={{ flex: 7 }}>
              <Text style={{ fontSize: 15, fontWeight: "bold" }}>
                {item.marketNoteText}
              </Text>
              <Text>{"Ngày thêm: " + item.remindDate}</Text>
            </View>
            <TouchableOpacity
              style={{ flex: 1.5, justifyContent: "center" }}
              onPress={() => {
                API.post(
                  `marketnote/${userData.id}/edit/${item.id}`,
                  { isDone: true },
                  {
                    headers: {
                      "Content-Type": "application/json",
                      "x-access-token": userData.accessToken,
                    },
                  }
                )
                  .then((res) => {
                    fetchDataMarketNoteList();
                  })
                  .catch((error) => {
                    alert("Error", error.res);
                  });
              }}
            >
              <FontAwesome name="check" color="#05375a" size={20} />
            </TouchableOpacity>
            <TouchableOpacity
              style={{ flex: 0, justifyContent: "center" }}
              onPress={() => {
                deleteNote(item.id);
              }}
            >
              <FontAwesome name="trash" color="#05375a" size={20} />
            </TouchableOpacity>
          </View>
        </Card>
      );
    } else {
      return (
        <Card containerStyle={{ backgroundColor: "#FF4B3A", borderRadius: 10 }}>
          <View style={{ flexDirection: "row" }}>
            <View style={{ flex: 7 }}>
              <Text style={{ fontSize: 15, fontWeight: "bold" }}>
                {item.marketNoteText}
              </Text>
              <Text>{"Ngày thêm: " + item.remindDate}</Text>
            </View>
            <TouchableOpacity
              style={{ flex: 1.5, justifyContent: "center" }}
              onPress={() => {
                API.post(
                  `marketnote/${userData.id}/edit/${item.id}`,
                  { isDone: false },
                  {
                    headers: {
                      "Content-Type": "application/json",
                      "x-access-token": userData.accessToken,
                    },
                  }
                )
                  .then((res) => {
                    fetchDataMarketNoteList();
                  })
                  .catch((error) => {
                    alert("Error", error.res);
                  });
              }}
            >
              <FontAwesome name="times-circle" color="#05375a" size={20} />
            </TouchableOpacity>
            <TouchableOpacity
              style={{ flex: 0, justifyContent: "center" }}
              onPress={() => {
                deleteNote(item.id);
              }}
            >
              <FontAwesome name="trash" color="#05375a" size={20} />
            </TouchableOpacity>
          </View>
        </Card>
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
        <Text style={styles.returnText}>Ghi chú</Text>
      </View>
      <ScrollView style={{ height: "92%" }}>
        {marketNoteList.map((item) => (
          <SafeAreaView key={item.id}>{SetCardNote(item)}</SafeAreaView>
        ))}
      </ScrollView>
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
  containerText: {
    justifyContent: "flex-end",
    flex: 6,
  },
});
