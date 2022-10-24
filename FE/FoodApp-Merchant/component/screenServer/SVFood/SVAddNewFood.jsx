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
  Button,
} from "react-native";
import { Avatar } from "react-native-paper";
import { Card } from "react-native-elements";
import API from "../../services/api";
import * as ImagePicker from "expo-image-picker";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { Picker } from "@react-native-picker/picker";

export default function SVAddNewFood({ navigation, route }) {
  const { userData } = route.params;
  const [category, setCategory] = useState([]);
  const [image, setImage] = useState([]);
  const [linkImage, setLinkImage] = useState(null);
  //const [initImage, setInitImage]=useState([]);
  const [num, setNum] = useState(1);
  const [selectedValueCatName, setSelectedCatName] = useState(1);
  const [selectedValueProduct, setSelectedValueProduct] = useState(1);
  let form = new FormData();
  const [foodName, setFoodName] = useState([]);
  const [foodDescription, setFoodDescription] = useState([]);
  const [foodCalories, setFoodCalories] = useState(null);
  const [searchProduct, setSearchPeoduct] = useState([]);

  for (let i = 0; i < searchProduct.length; i++) {
    //console.log(searchProduct[i].proName);
  }

  const fetchdataCategory = async () => {
    const result = await API.get("merchant/foodcategory/", {
      headers: {
        "Content-Type": "application/json",
        "x-access-token": userData.accessToken,
      },
    });
    //console.log(result.data.information);
    setCategory(result.data.foodCategories);
    //console.log(data);
  };
  useEffect(() => {
    fetchdataCategory();
  }, [setCategory]);

  const [inputFields, setInputFields] = useState([
    {
      stepNumber: "",
      stepDescription: "",
    },
  ]);
  const [inputFieldsMaterial, setInputFieldsMaterial] = useState([
    {
      quantityValue: "",
      foodMaterialName: "",
      productId: null,
      quantityDescription: "",
      quantityId: null,
    },
  ]);

  const addFieldStep = () => {
    const values = [...inputFields];
    values.push({ stepNumber: "", stepDescription: "" });
    setInputFields(values);
  };
  const addFieldMaterial = () => {
    const values = [...inputFieldsMaterial];
    values.push({
      quantityValue: "",
      foodMaterialName: "",
      productId: null,
      quantityDescription: "",
      quantityId: null,
    });
    setInputFieldsMaterial(values);
  };

  const handleStepDes = (index, val, name) => {
    //console.log(index, val, name);
    const values = [...inputFields];
    if (name === "step") {
      values[index].stepNumber = val;
    } else {
      values[index].stepDescription = val;
    }
    setInputFields(values);
  };

  const handleMaterial = (index, val, name) => {
    const valuesMaterial = [...inputFieldsMaterial];
    if (name === "foodMaterialName") {
      valuesMaterial[index].foodMaterialName = val;
    } else {
      valuesMaterial[index].quantityDescription = val;
    }
    setInputFieldsMaterial(valuesMaterial);
  };

  const handleFoodName = (val) => {
    setFoodName(val);
  };
  const handleDesFood = (val) => {
    setFoodDescription(val);
  };
  const uploadImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: false,
      aspect: [4, 3],
      quality: 1,
    });
    if (!result.cancelled) {
      Alert.alert("Thông báo", "Chọn hình thành công");
      //setImage(result.uri);
      setLinkImage(result.uri);
      let file = {
        name: "avatar.jpg",
        uri: result.uri,
        type: "image/jpeg",
      };
      //formImage.append('file', file);
      setImage(file);
      //console.log(formImage);
    }
  };
  form.append("file", image);
  form.append("foodName", foodName);
  form.append("foodDescription", foodDescription);
  form.append("foodCalories", null);
  form.append("foodCategoryId", selectedValueCatName);
  //form.append('foodMaterials', inputFieldsMaterial);
  //form.append('foodCookSteps', inputFields);
  const addNewFood = () => {
    //console.log(JSON.stringify(form));
    //console.log('foodMaterials',inputFieldsMaterial);
    const data = {
      foodMaterials: inputFieldsMaterial,
      foodCookSteps: inputFields,
    };
    //console.log(data);
    API.post("merchant/foods/addnewfood", form, {
      headers: {
        "Content-Type": "multipart/form-data",
        "x-access-token": userData.accessToken,
      },
    })
      .then((res) => {
        //console.log(res.data);
        if (res.status === 201) {
          API.post(
            `merchant/foods/addnewfood/detail/${res.data.data.id}`,
            data,
            {
              headers: {
                "Content-Type": "application/json",
                "x-access-token": userData.accessToken,
              },
            }
          )
            .then((res) => {
              //console.log(res)
              Alert.alert("Thông báo", "Thêm thành công");
            })
            .catch((error) => {
              console.log("Error", error.res);
            });
        }
        //navigation.goBack();
      })
      .catch((error) => {
        console.log("Error", error.res);
      });
  };
  const onValueChange = (itemValue) => {
    //console.log(itemValue);
  };
  const showImage = () => {
    if (linkImage) {
      return (
        <Image
          source={{ uri: linkImage }}
          style={{ width: 150, height: 150, marginTop: 10 }}
        />
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
        <Text style={styles.returnText}>Thêm món ăn</Text>
      </View>
      <ScrollView style={{ height: "91%" }}>
        <Card>
          <View style={{ marginTop: 5, flexDirection: "row" }}>
            <View style={{ justifyContent: "center" }}>
              <Text style={{ fontWeight: "bold", fontSize: 15 }}>Hình ảnh</Text>
            </View>
            <TouchableOpacity
              style={{ marginLeft: 20, justifyContent: "center" }}
              onPress={uploadImage}
            >
              <Text
                style={{
                  backgroundColor: "#DDDDDD",
                  borderWidth: 0.5,
                  paddingLeft: 20,
                  paddingRight: 20,
                  paddingTop: 2,
                  paddingBottom: 2,
                  borderRadius: 5,
                }}
              >
                Upload
              </Text>
            </TouchableOpacity>

            {/* <View style={{marginLeft: 30}}>
                            <Avatar.Image size={70} src={{uri: initImage}}/>
                        </View> */}
          </View>
          <View>{showImage()}</View>
        </Card>
        <Card>
          <Text style={{ fontWeight: "bold", fontSize: 15 }}>Tên món ăn</Text>
          <TextInput
            multiline={true}
            placeholder="Tên món ăn"
            autoCapitalize="none"
            style={{ borderWidth: 0.5, height: 40, paddingLeft: 10 }}
            onChangeText={(val) => handleFoodName(val)}
          />
        </Card>
        <Card>
          <Text style={{ fontWeight: "bold", fontSize: 15 }}>Mô tả</Text>
          <TextInput
            multiline={true}
            placeholder="Mô tả"
            autoCapitalize="none"
            style={{ borderWidth: 0.5, height: 80, paddingLeft: 10 }}
            onChangeText={(val) => handleDesFood(val)}
          />
        </Card>
        <Card>
          <Text style={{ fontWeight: "bold", fontSize: 15 }}>
            Danh mục món ăn
          </Text>
          <View style={{ borderWidth: 0.5 }}>
            <Picker
              //style={styles.picker}
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
        </Card>
        <Card>
          <Text style={{ fontWeight: "bold", fontSize: 15 }}>Nguyên liệu</Text>
          {inputFieldsMaterial.map((inputFieldsMaterial, index) => (
            <View style={{ marginTop: 10 }} key={index}>
              <View style={{ flexDirection: "row" }}>
                <View style={{ flex: 5, marginRight: 2 }}>
                  <TextInput
                    placeholder="Nguyên liệu"
                    autoCapitalize="none"
                    style={{ borderWidth: 0.5, height: 40, paddingLeft: 10 }}
                    //value={inputFields.id}
                    onChangeText={(val) =>
                      handleMaterial(index, val, "foodMaterialName")
                    }
                  />
                </View>
                <View style={{ flex: 3 }}>
                  <TextInput
                    multiline={true}
                    placeholder="Số lượng"
                    autoCapitalize="none"
                    style={{ borderWidth: 0.5, height: 40, paddingLeft: 10 }}
                    //defaultValue = {inputFields.step.toString()}
                    onChangeText={(val) =>
                      handleMaterial(index, val, "quantity")
                    }
                  />
                </View>
                <TouchableOpacity
                  style={{
                    flex: 1,
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                  onPress={addFieldMaterial}
                >
                  <FontAwesome name="plus" color="#05375a" size={20} />
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </Card>
        <Card>
          <Text style={{ fontWeight: "bold", fontSize: 15 }}>
            Các bước nấu ăn
          </Text>
          {inputFields.map((inputFields, index) => (
            <View style={{ marginTop: 10 }} key={index}>
              <View style={{ flexDirection: "row" }}>
                <View style={{ flex: 1.5, marginRight: 2 }}>
                  <TextInput
                    name="step"
                    placeholder="Bước"
                    autoCapitalize="none"
                    style={{ borderWidth: 0.5, height: 40, paddingLeft: 10 }}
                    //value={inputFields.id}
                    onChangeText={(val) => handleStepDes(index, val, "step")}
                  />
                </View>
                <View style={{ flex: 7 }}>
                  <TextInput
                    name="des"
                    multiline={true}
                    placeholder="Chi tiết"
                    autoCapitalize="none"
                    style={{ borderWidth: 0.5, height: 40, paddingLeft: 10 }}
                    //defaultValue = {inputFields.step.toString()}
                    onChangeText={(val) => handleStepDes(index, val, "des")}
                  />
                </View>

                <TouchableOpacity
                  style={{
                    flex: 1,
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                  onPress={addFieldStep}
                >
                  <FontAwesome name="plus" color="#05375a" size={20} />
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </Card>
        <View style={{ alignItems: "center", marginTop: 10 }}>
          <TouchableOpacity onPress={addNewFood}>
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
      {/* <View style={styles.button}>
        <TouchableOpacity
          onPress={addNewFood}
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
      </View> */}
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
    flex: 2.5,
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
