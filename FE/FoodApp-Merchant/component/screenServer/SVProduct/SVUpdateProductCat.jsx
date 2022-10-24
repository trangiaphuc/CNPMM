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
import { Card } from "react-native-elements";
import API from "../../services/api";

export default function SVUpdateProductCat({ navigation, route }) {
  const { userData, category } = route.params;
  //console.log(category);

  const [dataUpdateCat, setDataUpdateCat] = useState();
  const handleUpdateCategory = (val) => {
    if (val.length > 0) {
      setDataUpdateCat(val);
    }
  };

  const addCategory = () => {
    API.post(
      `merchant/productcategory/update/${category.id}`,
      { catName: dataUpdateCat },
      {
        headers: {
          "Content-Type": "application/json",
          "x-access-token": userData.accessToken,
        },
      }
    )
      .then((res) => {
        if (res.status === 201) {
          Alert.alert("Thông báo", "Cập nhật thành công");
        }
        //navigation.goBack();
      })
      .catch((error) => {
        console.log("Error", error.res);
      });
  };

  return (
    <View>
      <View style={{ height: "92%" }}>
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
          <Text style={styles.returnText}>Cập nhật danh mục sản phẩm</Text>
        </View>
        <Card>
          <Text style={{ fontWeight: "bold" }}>Tên danh mục</Text>
          <View style={styles.action}>
            <TextInput
              placeholder="Tên danh mục"
              style={styles.textInput}
              autoCapitalize="none"
              defaultValue={category.catName}
              onChangeText={(val) => handleUpdateCategory(val)}
            />
          </View>
        </Card>
      </View>
      <View style={styles.button}>
        <TouchableOpacity
          onPress={addCategory}
          style={[
            styles.signIn,
            {
              borderColor: "#ff4700",
              borderWidth: 1,
              margin: 10,
            },
          ]}
        >
          <Text
            style={[
              styles.textSign,
              {
                color: "#ffffff",
                fontSize: 20,
              },
            ]}
          >
            Thêm
          </Text>
        </TouchableOpacity>
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
    flex: 0.5,
    marginLeft: 15,
    //borderWidth: 1,
  },
  returnText: {
    flex: 3,
    //borderWidth: 1,
    fontWeight: "bold",
    fontSize: 20,
    color: "#ffffff",
    marginRight: 75,
  },
  containerText: {
    justifyContent: "flex-end",
    flex: 8,
  },
  action: {
    flexDirection: "row",
    marginTop: 10,
    paddingBottom: 5,
  },
  textInput: {
    flex: 1,
    paddingLeft: 10,
    color: "#05375a",
    borderWidth: 0.5,
    height: 40,
  },
  button: {
    alignItems: "center",
    backgroundColor: "#FF4B3A",
    margin: 5,
    borderRadius: 10,
  },
  signIn: {
    width: "100%",
    height: 30,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
  },
  textSign: {
    fontSize: 18,
    fontWeight: "bold",
  },
});
