import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextStyle,
  SafeAreaView,
  StyleSheet,
  ScrollView,
  FlatList,
  Dimensions,
  Image,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { Avatar } from "react-native-paper";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import API from "../../services/api";
import { Card } from "react-native-elements";
import { useIsFocused } from "@react-navigation/native";
import {
  getMerchantFoodCat,
  updateMerchantFoodCat,
} from "../../services/callServerAPI";

export default function SVManageFoodCat({ navigation, route }) {
  const { userData } = route.params;
  const [category, setCategory] = useState([]);
  const isFocused = useIsFocused();

  let form = new FormData();

  const fetchdataCategory = async () => {
    const result = await getMerchantFoodCat(userData);
    if (result.status == 200) {
      setCategory(result.data.foodCategories);
    }
    //console.log(result.data.information);

    //console.log(data);
  };
  useEffect(() => {
    fetchdataCategory();
  }, [setCategory, isFocused]);

  const ButtonSet = (item) => {
    if (item.isShowing == true) {
      return (
        <TouchableOpacity
          onPress={async () => {
            //setshow(false);
            const result = await updateMerchantFoodCat(userData, item, false);
            //console.log(result.status);
            if (result.status == 201) {
              fetchdataCategory();
            }
          }}
        >
          <View>
            <FontAwesome name="eye" color="#ffffff" size={40} />
            {/* <Text
              style={{
                borderWidth: 0.5,
                paddingLeft: 10,
                paddingRight: 10,
                paddingTop: 5,
                paddingBottom: 5,
                fontWeight: "bold",
                backgroundColor: "#FF0000",
                color: "#FFFFFF",
              }}
            >
              Vô hiệu hóa
            </Text> */}
          </View>
        </TouchableOpacity>
      );
    } else {
      return (
        <TouchableOpacity
          onPress={async () => {
            const result = await updateMerchantFoodCat(userData, item, true);
            //console.log(result.status);
            if (result.status == 201) {
              fetchdataCategory();
            }
          }}
        >
          <View>
            {/* <Text
              style={{
                borderWidth: 0.5,
                paddingLeft: 10,
                paddingRight: 10,
                paddingTop: 5,
                paddingBottom: 5,
                fontWeight: "bold",
                backgroundColor: "#FF0000",
                color: "#FFFFFF",
              }}
            >
              Hiển thị lại
            </Text> */}
            <FontAwesome name="eye-slash" color="#000000" size={40} />
          </View>
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
        <View style={styles.returnText}>
          <Text style={styles.returnTextDetail}>Danh mục món ăn</Text>
        </View>
        <TouchableOpacity
          style={styles.returnPlus}
          onPress={() => {
            navigation.navigate("SVAddNewFoodCat", {
              userData: userData,
            });
          }}
        >
          <FontAwesome name="plus" color="#ffffff" size={30} />
        </TouchableOpacity>
      </View>

      <ScrollView style={{ height: "92%" }}>
        {category.map((item) => (
          <View key={item.id}>
            <Card
              containerStyle={{ backgroundColor: "#00FFFF", borderRadius: 5 }}
            >
              <View style={{ flexDirection: "row" }}>
                <View style={{ marginRight: 10 }}>
                  {/* <Image
                    source={{ uri: item.catIcon }}
                    style={{ width: 70, height: 70 }}
                  /> */}
                  <Avatar.Image source={{ uri: item.catIcon }} size={70} />
                </View>
                <View style={{ flex: 1, justifyContent: "center" }}>
                  <Text style={{ fontWeight: "bold", fontSize: 18 }}>
                    {item.catName}
                  </Text>
                </View>
                <View style={{ justifyContent: "center" }}>
                  {ButtonSet(item)}
                </View>
              </View>
            </Card>
          </View>
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
    flex: 1,
    marginLeft: 15,
    //borderWidth: 1,
  },
  returnText: {
    flex: 4,
  },
  returnTextDetail: {
    fontWeight: "bold",
    fontSize: 20,
    color: "#ffffff",
  },
  returnPlus: {
    flex: 0.7,
  },
  containerText: {
    justifyContent: "flex-end",
    flex: 5,
  },
  addProduct: {
    justifyContent: "flex-end",
    flex: 2,
  },
});
