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
  Alert,
} from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import API from "../../services/api";
import { Card } from "react-native-elements";
import { useIsFocused } from "@react-navigation/native";
import {
  getMerchantProductCat,
  updateMerchantProductCat,
} from "../../services/callServerAPI";
export default function SVManageProductCat({ navigation, route }) {
  const { userData } = route.params;
  const [category, setCategory] = useState([]);
  const isFocused = useIsFocused();

  const fetchdataCategory = async () => {
    const result = await getMerchantProductCat(userData);
    if (result.status == 200) {
      setCategory(result.data.productCategories);
    }
  };
  useEffect(async () => {
    await fetchdataCategory();
  }, [isFocused]);

  const ButtonSet = (item) => {
    if (item.isShowing == true) {
      return (
        <TouchableOpacity
          onPress={async () => {
            const result = await updateMerchantProductCat(
              userData,
              item,
              false
            );
            //console.log(result.status);
            if (result.status == 201) {
              fetchdataCategory();
            }
          }}
        >
          <FontAwesome name="eye" color="#ffffff" size={40} />
        </TouchableOpacity>
      );
    } else {
      return (
        <TouchableOpacity
          onPress={async () => {
            const result = await updateMerchantProductCat(userData, item, true);
            //console.log(result.status);
            if (result.status == 201) {
              fetchdataCategory();
            }
          }}
        >
          <FontAwesome name="eye-slash" color="#000000" size={40} />
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
          <Text style={styles.returnTextDetail}>Danh mục sản phẩm</Text>
        </View>
        <TouchableOpacity
          style={styles.returnPlus}
          onPress={() => {
            navigation.navigate("SVAddNewProductCat", {
              userData: userData,
            });
          }}
        >
          <FontAwesome name="plus" color="#ffffff" size={30} />
        </TouchableOpacity>
      </View>
      <View>
        <ScrollView style={{ height: "90%" }}>
          {category.map((item) => (
            <TouchableOpacity
              key={item.id}
              onPress={() => {
                navigation.navigate("SVUpdateProductCat", {
                  userData: userData,
                  category: item,
                });
              }}
            >
              <Card
                containerStyle={{ backgroundColor: "#00FFFF", borderRadius: 5 }}
              >
                <View style={{ flexDirection: "row" }}>
                  <View style={{ flex: 1, justifyContent: "center" }}>
                    <Text style={{ fontWeight: "bold", fontSize: 18 }}>
                      {item.catName}
                    </Text>
                  </View>
                  <View>{ButtonSet(item)}</View>
                </View>
              </Card>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
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
    flex: 8,
  },
  addProduct: {
    justifyContent: "flex-end",
    flex: 0,
  },
});
