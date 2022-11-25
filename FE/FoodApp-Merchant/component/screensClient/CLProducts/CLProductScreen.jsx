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

import { Card } from "react-native-elements";
import { LinearGradient } from "expo-linear-gradient";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { getProductCat, getItemProductCat } from "../../services/callAPI";
import NumericInput from "react-native-numeric-input";
import API from "../../services/api";
import { addCartItem } from "../../services/callAPI";

export default function homeScreen({ navigation, route }) {
  const { userData } = route.params;
  const numColumns = 2;
  const [data, setData] = useState([]);
  const [quantityValue, setQuantityValue] = useState(0);
  const [productCategory, setProductCategory] = useState([]);

  const [dataSearch, setDataSearch] = React.useState({
    textSearch: "",
  });
  const [search, setSearch] = useState([]);
  const [click, setClick] = useState(false);
  //console.log(click);
  //console.log(userData);

  const fetchdata = async () => {
    const result = await getProductCat(userData);

    if (result.status == 200) {
      // console.log(result.data);
      setData(result.data.productCategories);
    }

    //console.log(result);

    //console.log(data);
  };

  useEffect(() => {
    fetchdata();
  }, [setData]);

  const renderItem = ({ item }) => {
    const itemCategory = async () => {
      const result = await getItemProductCat(userData, item);
      if (result.status == 200) {
        setProductCategory(result.data.products);
      }
      // API.get(`products/category/${item.id}`, {
      //   headers: {
      //     "Content-Type": "application/json",
      //     "x-access-token": userData.accessToken,
      //   },
      // })
      //   .then((response) => {
      //     //console.log(response.data.products);
      //     setProductCategory(response.data.products);
      //     // setClick(true);
      //     // console.log(click);
      //   })
      //   .catch((error) => {
      //     alert("Error", error.response);
      //   });
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

  // const onChange = (value) => {
  //   setQuantityValue(value);
  // };

  const textInputChange = (val) => {
    setDataSearch({
      ...dataSearch,
      textSearch: val,
    });
  };
  const onchange = (value) => {
    // const quantityValue = value;
    // console.log(quantityValue);
    // //const [quantityValue, setQuantityValue] = useState(0);
    setQuantityValue(value);
  };

  const formatData = (data, numColumns) => {
    const numberOfFullRows = Math.floor(data.length / numColumns);

    let numberOfElementsLastRow = data.length - numberOfFullRows * numColumns;
    while (
      numberOfElementsLastRow !== numColumns &&
      numberOfElementsLastRow !== 0
    ) {
      data.push({ key: `blank-${numberOfElementsLastRow}`, empty: true });
      numberOfElementsLastRow++;
    }

    return data;
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
                    navigation.navigate("CLProductDetailScreen", {
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
        <Text style={styles.returnText}>Sản phẩm</Text>
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

        <ScrollView
          horizontal
          style={{ height: "95%" }}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
        >
          <FlatList
            data={formatData(productCategory, numColumns)}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => {
              return (
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate("CLProductDetailScreen", {
                      productId: item.id,
                      userData: userData,
                    });
                  }}
                >
                  <Card
                    containerStyle={{
                      width: 190,
                      height: 250,
                      justifyContent: "center",
                      alignItems: "center",
                      marginHorizontal: 5,
                      marginVertical: 10,
                    }}
                  >
                    <View>
                      <Card.Title>{item.proName}</Card.Title>
                      <Card.Divider />
                      <Card.Image
                        source={{ uri: item.productImage }}
                        style={{
                          width: 150,
                          height: 70,
                        }}
                      />
                    </View>
                    <Card.Divider />
                    <View style={{ flexDirection: "row", marginLeft: 10 }}>
                      <Text style={{ flex: 1 }}>Giá:</Text>
                      <Text style={{ flex: 2 }}>{item.price}đ/kg</Text>
                    </View>

                    <View
                      style={{
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "space-around",
                        marginTop: 5,
                      }}
                    >
                      <View>
                        <NumericInput
                          minValue={1}
                          maxValue={50}
                          step={1}
                          totalHeight={30}
                          totalWidth={80}
                          onChange={(value) => onchange(value)}
                          rounded
                        />
                      </View>
                      <View>
                        <TouchableOpacity
                          onPress={async () => {
                            if (quantityValue != 0) {
                              var listItem = [];
                              listItem.push({
                                productId: item.id,
                                quantity: quantityValue,
                              });
                              setQuantityValue(0);
                              const result = await addCartItem(
                                userData,
                                listItem
                              );
                              if (result.status == 201) {
                                Alert.alert(
                                  "Thông báo",
                                  "Thêm nguyên liệu vào giỏ hàng thành công"
                                );
                              }
                            } else {
                              Alert.alert(
                                "Thông báo",
                                "Vui lòng chọn lại số lượng"
                              );
                            }
                          }}
                          style={{
                            backgroundColor: "#FF4B3A",
                            borderRadius: 5,
                          }}
                        >
                          <FontAwesome
                            name="shopping-cart"
                            color="#FFFFFF"
                            size={20}
                            style={{
                              padding: 10,
                            }}
                          />
                        </TouchableOpacity>
                      </View>
                    </View>
                  </Card>
                </TouchableOpacity>
              );
            }}
            numColumns={numColumns}
          />
        </ScrollView>
      </View>
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
    padding: 5,
    borderWidth: 1,
    borderColor: "#FF4B3A",
    borderRadius: 20,
    marginBottom: 2,
    marginLeft: 3,
  },
  button: {
    flexDirection: "row",
  },
  // signIn: {
  //   width: 170,
  //   height: 40,
  //   justifyContent: "center",
  //   alignItems: "center",
  //   borderRadius: 20,
  //   flexDirection: "row",
  // },
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
    marginBottom: 138,
  },
  search: {
    marginTop: 5,
    borderWidth: 0.5,
    borderRadius: 10,
    marginLeft: 10,
    marginRight: 10,
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
