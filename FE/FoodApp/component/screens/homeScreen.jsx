import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  SafeAreaView,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Button,
  TextInput,
  Item,
  Alert,
} from "react-native";
import axios from "axios";
import { Card } from "react-native-elements";
import { LinearGradient } from "expo-linear-gradient";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import RNRestart from "react-native-restart";
import NumericInput from "react-native-numeric-input";
import API from "../services/api";

export default function homeScreen({ navigation, route }) {
  const { userData } = route.params;

  const [data, setData] = useState([]);
  const [productCategory, setProductCategory] = useState([]);
  const [quantityValue, setQuantityValue] = useState([]);
  const [dataSearch, setDataSearch] = React.useState({
    textSearch: "",
  });
  const [search, setSearch] = useState([]);
  const [click, setClick] = useState(false);
  //console.log(click);
  //console.log(userData);

  const fetchdata = async () => {
    const result = await API.get("productcategory/", {
      headers: {
        "Content-Type": "application/json",
        "x-access-token": userData.accessToken,
      },
    });
    //console.log(result);
    setData(result.data.productCategories);
    //console.log(data);
  };

  useEffect(() => {
    fetchdata();
  }, [setData]);

  const renderItem = ({ item }) => {
    const itemCategory = () => {
      API.get(`products/category/${item.id}`, {
        headers: {
          "Content-Type": "application/json",
          "x-access-token": userData.accessToken,
        },
      })
        .then((response) => {
          //console.log(response.data.products);
          setProductCategory(response.data.products);
          // setClick(true);
          // console.log(click);
        })
        .catch((error) => {
          alert("Error", error.response);
        });
    };

    return (
      <TouchableOpacity onPress={itemCategory}>
        <View style={styles.container_product}>
          <View
            style={[
              styles.item,
              {
                flex: 1,
                flexDirection: "row",
              },
            ]}
          >
            <Text style={styles.text_product}>{item.catName}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  const onChange = (value) => {
    setQuantityValue(value);
  };

  const textInputChange = (val) => {
    setDataSearch({
      ...dataSearch,
      textSearch: val,
    });
  };

  const searchProduct = () => {
    //alert(dataSearch.textSearch);

    API.post(
      `products/search`,
      { keyword: dataSearch.textSearch },
      {
        headers: {
          "Content-Type": "application/json",
          "x-access-token": userData.accessToken,
        },
      }
    )
      .then((res) => {
        //console.log(res.data.products);

        if (res.data.products.length !== 0);
        {
          setSearch(res.data.products);
          setClick(true);
        }
      })
      .catch((error) => {
        alert("Error", error.res);
      });
  };

  if (click === true) {
    //console.log(search);
    return (
      <View style={styles.productContainerSearch}>
        <View style={styles.return}>
          <View style={styles.returnIcon}>
            <TouchableOpacity
              onPress={() => {
                setClick(false);
              }}
            >
              <FontAwesome name="arrow-left" color="#ffffff" size={20} />
            </TouchableOpacity>
          </View>
          <Text style={styles.returnText}>Tìm kiếm</Text>
        </View>
        <ScrollView>
          <View>
            {search.map((item) => (
              <SafeAreaView key={item.id}>
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate("productDetailScreen", {
                      productId: item.id,
                      userData: userData,
                    });
                  }}
                >
                  <Card>
                    <Card.Title>{item.proName}</Card.Title>
                    <Card.Divider />
                    <Card.Image source={{ uri: item.productImage }} />

                    <View
                      style={{ flex: 1, flexDirection: "row", padding: 10 }}
                    >
                      <Text style={styles.price}>Giá:</Text>
                      <Text style={{ flex: 2 }}>{item.price}đ/kg</Text>
                    </View>
                    <Card.Divider />

                    <View style={styles.button}>
                      <View style={{ marginRight: 20 }}>
                        <NumericInput
                          minValue={1}
                          maxValue={50}
                          step={1}
                          totalHeight={40}
                          onChange={(value) => onChange(value)}
                          rounded
                        />
                      </View>
                      <View>
                        <TouchableOpacity
                          onPress={() => {
                            if (quantityValue !== 0) {
                              const listCartItems = [
                                { productId: item.id, quantity: quantityValue },
                              ];
                              API.post(
                                `cart/${userData.id}/addCartItem`,
                                { listCartItems: listCartItems },
                                {
                                  headers: {
                                    "Content-Type": "application/json",
                                    "x-access-token": userData.accessToken,
                                  },
                                }
                              )
                                .then((res) => {
                                  if (res.status === 201) {
                                    Alert.alert("Thông báo", res.data.message);

                                    //navigation.params.resetData();
                                    // RNRestart.Restart();
                                  }
                                })
                                .catch((error) => {
                                  //alert('Error', error.res);
                                  console.log(error.res);
                                });
                            } else {
                              alert("Vui lòng chọn số lượng sản phẩm");
                            }
                          }}
                        >
                          <LinearGradient
                            colors={["#FF4B3A", "#FF4B3A"]}
                            style={styles.signIn}
                          >
                            <FontAwesome
                              name="shopping-cart"
                              color="#FFFFFF"
                              size={20}
                            />
                            <Text style={styles.textSign}>
                              Thêm vào giỏ hàng
                            </Text>
                          </LinearGradient>
                        </TouchableOpacity>
                      </View>
                    </View>
                  </Card>
                </TouchableOpacity>
              </SafeAreaView>
            ))}
          </View>
        </ScrollView>
      </View>
    );
  }

  return (
    <View style={styles.productContainer}>
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
        <Text style={styles.returnText}>Mua sắm</Text>
      </View>
      <View>
        <View style={styles.search}>
          <TextInput
            placeholder="Nhập từ khóa"
            placeholderTextColor="#C0C0C0"
            autoCapitalize="none"
            style={styles.textInput}
            placeholderStyle={{ color: "#FF0000" }}
            onChangeText={(val) => textInputChange(val)}
          />
          <TouchableOpacity onPress={searchProduct}>
            <View style={styles.iconSearch}>
              <FontAwesome name="search" color="#05375a" size={20} />
            </View>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.productMargin}>
        <ScrollView>
          <FlatList
            horizontal={true}
            data={data}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
          />
        </ScrollView>
      </View>

      {/* <FlatList
                data={productCategory}
                renderItem={({}) =>(
                    <View
                        style={{
                        flex: 1,
                        flexDirection: 'column',
                        margin: 1
                        }}>
                        <Card>
                            <Card.Title>{item.proName}</Card.Title>
                        </Card>
                    </View>
                )}
                numColumns={2}
                keyExtractor = {(item) => item.id}/> */}

      <FlatList
        data={productCategory}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("productDetailScreen", {
                productId: item.id,
                userData: userData,
              });
            }}
          >
            <Card>
              <Card.Title>{item.proName}</Card.Title>
              <Card.Divider />
              <Card.Image source={{ uri: item.productImage }} />

              <View style={{ flex: 1, flexDirection: "row", padding: 10 }}>
                <Text style={styles.price}>Giá:</Text>
                <Text style={{ flex: 2 }}>{item.price}đ/kg</Text>
              </View>
              <Card.Divider />

              <View style={styles.button}>
                <View style={{ marginRight: 20 }}>
                  <NumericInput
                    minValue={1}
                    maxValue={50}
                    step={1}
                    totalHeight={40}
                    onChange={(value) => onChange(value)}
                    rounded
                  />
                </View>
                <View>
                  <TouchableOpacity
                    onPress={() => {
                      if (quantityValue !== 0) {
                        API.post(
                          `cart/${userData.id}/addCartItem`,
                          {
                            listCartItems: [
                              { productId: item.id, quantity: quantityValue },
                            ],
                          },
                          {
                            headers: {
                              "Content-Type": "application/json",
                              "x-access-token": userData.accessToken,
                            },
                          }
                        )
                          .then((res) => {
                            if (res.status === 201) {
                              Alert.alert("Thông báo", res.data.message);

                              //navigation.params.resetData();
                              // RNRestart.Restart();
                            }
                          })
                          .catch((error) => {
                            //alert('Error', error.res);
                            console.log(error.res);
                          });
                      } else {
                        Alert.alert(
                          "Thông báo",
                          "Vui lòng chọn số lượng sản phẩm"
                        );
                      }
                    }}
                  >
                    <LinearGradient
                      colors={["#FF4B3A", "#FF4B3A"]}
                      style={styles.signIn}
                    >
                      <FontAwesome
                        name="shopping-cart"
                        color="#FFFFFF"
                        size={20}
                      />
                      <Text style={styles.textSign}>Thêm vào giỏ hàng</Text>
                    </LinearGradient>
                  </TouchableOpacity>
                </View>
              </View>
            </Card>
          </TouchableOpacity>
        )}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  item: {
    padding: 5,
  },
  price: {
    flex: 1,
    marginLeft: 60,
  },
  container: {
    flex: 1,
  },
  row: {
    flexDirection: "row",
    marginBottom: 10,
  },
  container_product: {
    marginTop: 5,
    borderWidth: 1,
    borderColor: "#FF4B3A",
    borderRadius: 50,
    marginBottom: 2,
    marginLeft: 3,
  },
  button: {
    marginLeft: 30,
    flexDirection: "row",
  },
  signIn: {
    width: 170,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
    flexDirection: "row",
  },
  textSign: {
    color: "white",
    fontWeight: "bold",
    marginLeft: 5,
  },
  text_product: {
    color: "#FF4B3A",
    fontSize: 18,
  },
  productContainer: {
    marginBottom: 140,
  },
  productMargin: {
    marginLeft: 15,
    marginRight: 15,
  },
  search: {
    marginTop: 5,
    borderWidth: 0.5,
    borderRadius: 15,
    marginLeft: 15,
    marginRight: 15,
    flexDirection: "row",
    height: 35,
  },
  textInput: {
    flex: 1,
    paddingLeft: 15,
    color: "#05375a",
  },
  iconSearch: {
    marginTop: 5,
    marginRight: 15,
  },
  productView: {
    marginRight: 15,
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
  productContainerSearch: {
    marginBottom: 60,
  },
});
