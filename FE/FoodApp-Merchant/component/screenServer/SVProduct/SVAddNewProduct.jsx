import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  Platform,
  TextInput,
  Alert,
  Image,
  ScrollView,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Feather from "react-native-vector-icons/Feather";
import { Picker } from "@react-native-picker/picker";
import * as ImagePicker from "expo-image-picker";
import { Avatar, Button } from "react-native-paper";
import API from "../../services/api";

export default function SVAddNewProduct({ navigation, route }) {
  const { userData, category } = route.params;
  let form = new FormData();
  //console.log(category);
  const [selectedValueCatName, setSelectedCatName] = useState(1);
  const [image, setImage] = useState([]);
  const [linkImage, setLinkImage] = useState(null);
  const [dataAddNewPro, setDataAddNewPro] = React.useState({
    proName: "",
    quantity: "",
    price: "",
    brand: "",
    origin: "",
    manual: "",
    preserve: "",
    description: "",
    isSelling: true,
  });
  const handleProName = (val) => {
    setDataAddNewPro({
      ...dataAddNewPro,
      proName: val,
    });
  };
  const handleQuantity = (val) => {
    setDataAddNewPro({
      ...dataAddNewPro,
      quantity: val,
    });
  };
  const handlePrice = (val) => {
    setDataAddNewPro({
      ...dataAddNewPro,
      price: val,
    });
  };
  const handleBrand = (val) => {
    setDataAddNewPro({
      ...dataAddNewPro,
      brand: val,
    });
  };
  const handleOrigin = (val) => {
    setDataAddNewPro({
      ...dataAddNewPro,
      origin: val,
    });
  };
  const handleManual = (val) => {
    setDataAddNewPro({
      ...dataAddNewPro,
      manual: val,
    });
  };
  const handlePreserve = (val) => {
    setDataAddNewPro({
      ...dataAddNewPro,
      preserve: val,
    });
  };
  const handleDescription = (val) => {
    setDataAddNewPro({
      ...dataAddNewPro,
      description: val,
    });
  };
  const chooseImage = async () => {
    //let formImage =new FormData();
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: false,
      aspect: [4, 3],
      quality: 1,
    });
    if (!result.cancelled) {
      Alert.alert("Thông báo", "Chọn hình thành công");
      setLinkImage(result.uri);
      let file = {
        name: "avatar.jpg",
        uri: result.uri,
        type: "image/jpeg",
      };
      //formImage.append('file', file);
      setImage(result);
      //console.log(formImage);
    }
  };

  form.append("proName", dataAddNewPro.proName);
  form.append("proDescription", dataAddNewPro.description);
  form.append("quantityValue", dataAddNewPro.quantity);
  form.append("price", dataAddNewPro.price);
  form.append("brand", dataAddNewPro.brand);
  form.append("origin", dataAddNewPro.origin);
  form.append("manual", dataAddNewPro.manual);
  form.append("preserve", dataAddNewPro.preserve);
  form.append("productCategoryId", selectedValueCatName);
  form.append("file", image);
  form.append("isSelling", dataAddNewPro.isSelling);
  //console.log(form);

  const submitAddNewProduct = () => {
    if (
      dataAddNewPro.proName !== "" &&
      dataAddNewPro.description !== "" &&
      dataAddNewPro.quantity !== "" &&
      dataAddNewPro.brand !== "" &&
      dataAddNewPro.origin !== "" &&
      dataAddNewPro.manual !== "" &&
      dataAddNewPro.preserve !== "" &&
      dataAddNewPro.price !== ""
    ) {
      API.post("merchant/products/addnewproduct", form, {
        headers: {
          "Content-Type": "multipart/form-data",
          "x-access-token": userData.accessToken,
        },
      })
        .then((res) => {
          if (res.status === 201) {
            Alert.alert("Thông báo", "Thêm thành công");
          }
          //navigation.goBack();
        })
        .catch((error) => {
          console.log("Error", error.res);
        });
    } else {
      Alert.alert("Thông báo", "Vui lòng nhập đầy đủ thông tin");
    }
  };

  // const uploadImage = () => {
  //   //console.log(linkImage);
  //   return (
  //     <View>
  //       <Image
  //         source={{ uri: linkImage }}
  //         style={{ width: 100, height: 100 }}
  //       />
  //     </View>
  //   );
  // };
  const showImage = () => {
    if (linkImage) {
      return (
        <Image
          source={{ uri: linkImage }}
          style={{ width: 150, height: 150, marginBottom: 10 }}
        />
      );
    }
  };

  return (
    <View style={{ height: "100%" }}>
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
        <Text style={styles.returnText}>Thêm sản phẩm</Text>
      </View>

      <ScrollView style={styles.footer}>
        <View style={styles.action}>
          <TextInput
            placeholder="Tên sản phẩm"
            style={styles.textInput}
            autoCapitalize="none"
            // defaultValue = {userInformation.email}
            onChangeText={(val) => handleProName(val)}
          />
        </View>

        <View style={styles.action}>
          <TextInput
            placeholder="Số lượng"
            style={styles.textInput}
            autoCapitalize="none"
            // defaultValue = {userInformation.firstname}
            onChangeText={(val) => handleQuantity(val)}
          />
        </View>

        <View style={styles.action}>
          <TextInput
            placeholder="Giá"
            style={styles.textInput}
            autoCapitalize="none"
            // defaultValue ={userInformation.lastname}
            onChangeText={(val) => handlePrice(val)}
          />
        </View>
        <View style={styles.action}>
          <TextInput
            placeholder="Thương hiệu"
            style={styles.textInput}
            autoCapitalize="none"
            // keyboardType= "number-pad"
            // defaultValue = {userInformation.phone}
            onChangeText={(val) => handleBrand(val)}
          />
        </View>

        <View style={styles.action}>
          <TextInput
            placeholder="Xuất xứ"
            style={styles.textInput}
            autoCapitalize="none"
            // defaultValue = {userInformation.address}
            onChangeText={(val) => handleOrigin(val)}
          />
        </View>
        <View style={styles.action}>
          <TextInput
            placeholder="Hướng dẫn sử dụng"
            style={styles.textInput}
            autoCapitalize="none"
            // defaultValue = {userInformation.address}
            onChangeText={(val) => handleManual(val)}
          />
        </View>
        <View style={styles.action}>
          <TextInput
            placeholder="Cách bảo quản"
            style={styles.textInput}
            autoCapitalize="none"
            // defaultValue = {userInformation.address}
            onChangeText={(val) => handlePreserve(val)}
          />
        </View>
        <View style={styles.action}>
          <TextInput
            placeholder="Mô tả"
            style={styles.textInputDes}
            autoCapitalize="none"
            multiline={true}
            // defaultValue = {userInformation.address}
            onChangeText={(val) => handleDescription(val)}
          />
        </View>
        <View style={styles.actionPicker}>
          <Picker
            style={styles.picker}
            selectedValue={selectedValueCatName}
            onValueChange={(itemValue) => setSelectedCatName(itemValue)}
          >
            {category.map((item) => (
              <Picker.Item
                key={item.id}
                label={item.catName}
                value={item.id}
                style={{ color: "#05375a" }}
              />
            ))}
          </Picker>
        </View>
        <View>
          <View
            style={{
              padding: 10,
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <Text style={{ fontSize: 15 }}>Chọn ảnh đại diện</Text>
            <TouchableOpacity style={styles.upload} onPress={chooseImage}>
              <View>
                <Text style={styles.uploadText}>Upload</Text>
              </View>
            </TouchableOpacity>
          </View>
          <View>{showImage()}</View>
        </View>
        <View style={{ alignItems: "center", marginBottom: 20 }}>
          <TouchableOpacity onPress={submitAddNewProduct}>
            <Text
              style={{
                fontSize: 18,
                fontWeight: "bold",
                backgroundColor: "#FF0000",
                paddingHorizontal: 60,
                paddingVertical: 10,
                color: "#ffffff",
              }}
            >
              Lưu
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
      {/* 
      <View style={styles.button}>
        <TouchableOpacity
          onPress={submitAddNewProduct}
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
                fontSize: 25,
              },
            ]}
          >
            Thêm
          </Text>
        </TouchableOpacity>
      </View> */}
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flex: 1,
    justifyContent: "flex-end",
    paddingHorizontal: 20,
    paddingBottom: 50,
  },
  footer: {
    //paddingVertical: 30,
    paddingHorizontal: 20,
  },
  textheader: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 30,
  },
  textfooter: {
    color: "#05735a",
    fontSize: 18,
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
  textInputDes: {
    flex: 1,
    paddingLeft: 10,
    color: "#05375a",
    borderWidth: 0.5,
    height: 100,
  },
  button: {
    alignItems: "center",
    backgroundColor: "#FF4B3A",
    margin: 5,
  },
  signIn: {
    width: "100%",
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
  },
  textSign: {
    fontSize: 18,
    fontWeight: "bold",
  },
  textSignIn: {
    fontSize: 15,
    marginTop: 15,
  },
  gender: {
    flexDirection: "row",
    alignItems: "center",
  },
  genderImage: {
    width: 20,
    height: 20,
    marginRight: 10,
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
  containerText: {
    justifyContent: "flex-end",
    flex: 7,
  },
  addText: {
    justifyContent: "center",
  },
  nameAddText: {
    color: "#05375a",
  },
  picker: {
    color: "#05375a",
  },
  actionPicker: {
    borderWidth: 0.5,
  },
  upload: {
    alignItems: "center",
    padding: 10,
  },
  uploadText: {
    borderWidth: 1,
    borderRadius: 5,
    backgroundColor: "#CCCCCC",
    paddingLeft: 25,
    paddingRight: 25,
    paddingTop: 3,
    paddingBottom: 3,
  },
});
