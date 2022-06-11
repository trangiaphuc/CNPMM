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
import axios from "axios";
//import signInScreen from "./signInScreen";
import darBoardScreen from "../darBoardScreen";
import API from "../../services/api";
import ComboBox from "react-native-combobox";
import { Picker } from "@react-native-picker/picker";

//import signInScreen from "./signInScreen";
export default function signUp({ navigation }) {
  const [data, setData] = React.useState({
    username: "",
    password: "",
    email: "",
    firstname: "",
    lastname: "",
    phone: "",
    address: "",
    gender: "",
    confirmPassword: "",
    check_TextInput: false,
    secureTextEntry: true,
  });
  const [selectedValueGender, setSelectedValueGender] = useState(0);
  const gender = [
    {
      genderId: "1",
      genderName: "Nam",
    },
    {
      genderId: "0",
      genderName: "Nữ",
    },
  ];
  const textInputChange = (val) => {
    if (val.length !== 0) {
      setData({
        ...data,
        username: val,
        check_TextInput: true,
      });
    } else {
      setData({
        ...data,
        username: val,
        check_TextInput: false,
      });
    }
  };

  const textInputEmailChange = (val) => {
    if (val.length !== 0) {
      setData({
        ...data,
        email: val,
        check_TextInput: true,
      });
    } else {
      setData({
        ...data,
        email: val,
        check_TextInput: false,
      });
    }
  };

  const handlePasswordChange = (val) => {
    setData({
      ...data,
      password: val,
    });
  };
  const handleConfirmPasswordChange = (val) => {
    setData({
      ...data,
      confirmPassword: val,
    });
  };
  const handleFirstName = (val) => {
    setData({
      ...data,
      firstname: val,
    });
  };
  const handleLastName = (val) => {
    setData({
      ...data,
      lastname: val,
    });
  };
  const handlePhone = (val) => {
    setData({
      ...data,
      phone: val,
    });
  };
  const handleAddress = (val) => {
    setData({
      ...data,
      address: val,
    });
  };
  const updatePasswordEntry = () => {
    setData({
      ...data,
      secureTextEntry: !data.secureTextEntry,
    });
  };
  const updateConfirmPasswordEntry = () => {
    setData({
      ...data,
      secureTextEntry: !data.secureTextEntry,
    });
  };
  const setPickerGender = (val) => {
    setSelectedValueGender(val);
  };

  const signUpButton = () => {
    if (data.username.length !== 0) {
      if (data.firstname.length !== 0) {
        if (data.lastname.length !== 0) {
          if (data.phone.length !== 0) {
            if (data.address.length !== 0) {
              if (data.email.length !== 0) {
                if (data.password.length !== 0) {
                  if (data.confirmPassword.length !== 0) {
                    if (data.password === data.confirmPassword) {
                      API.post(
                        "auth/signup",
                        {
                          username: data.username,
                          email: data.email,
                          password: data.password,
                          firstname: data.firstname,
                          lastname: data.lastname,
                          phone: data.phone,
                          address: data.address,
                          role: ["user"],
                          gender: selectedValueGender,
                        },
                        {
                          headers: {
                            "Content-Type": "application/json",
                          },
                        }
                      )
                        .then((res) => {
                          if (res.status === 201) {
                            navigation.navigate("signInScreen");
                          }
                        })
                        .catch((error) => {
                          console.log(error.res);
                        });
                    } else {
                      Alert.alert(
                        "Thông báo",
                        "Vui lòng nhập đầy đủ thông tin"
                      );
                    }
                  } else {
                    Alert.alert("Thông báo", "Vui lòng nhập đầy đủ thông tin");
                  }
                } else {
                  Alert.alert("Thông báo", "Vui lòng nhập đầy đủ thông tin");
                }
              } else {
                Alert.alert("Thông báo", "Vui lòng nhập đầy đủ thông tin");
              }
            } else {
              Alert.alert("Thông báo", "Vui lòng nhập đầy đủ thông tin");
            }
          } else {
            Alert.alert("Thông báo", "Vui lòng nhập đầy đủ thông tin");
          }
        } else {
          Alert.alert("Thông báo", "Vui lòng nhập đầy đủ thông tin");
        }
      } else {
        Alert.alert("Thông báo", "Vui lòng nhập đầy đủ thông tin");
      }
    } else {
      Alert.alert("Thông báo", "Vui lòng nhập đầy đủ thông tin");
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.textheader}>Đăng ký</Text>
      </View>
      <View style={styles.footer}>
        {/* <Text style={styles.textfooter}>Username</Text> */}
        <View style={styles.action}>
          <FontAwesome name="user-o" color="#05375a" size={20} />
          <TextInput
            placeholder="Tên tài khoản"
            style={styles.textInput}
            autoCapitalize="none"
            onChangeText={(val) => textInputChange(val)}
          />
          {data.check_TextInput ? (
            <Feather name="check-circle" color="#05375a" size={20} />
          ) : null}
        </View>

        {/* <Text style={[styles.textfooter,{marginTop:25}]}>Họ</Text> */}
        <View style={styles.action}>
          <FontAwesome name="user-circle" color="#05375a" size={20} />
          <TextInput
            placeholder="Họ và tên lót"
            style={styles.textInput}
            autoCapitalize="none"
            onChangeText={(val) => handleFirstName(val)}
          />
        </View>

        <View style={styles.action}>
          <FontAwesome name="user-circle" color="#05375a" size={20} />
          <TextInput
            placeholder="Tên"
            style={styles.textInput}
            autoCapitalize="none"
            onChangeText={(val) => handleLastName(val)}
          />
        </View>
        <View style={{ borderBottomWidth: 1, borderBottomColor: "#f2f2f2" }}>
          <Picker
            style={styles.picker}
            selectedValue={selectedValueGender}
            onValueChange={(itemValue) => setPickerGender(itemValue)}
          >
            <Picker.Item label={"Nam"} value={1} />
            <Picker.Item label={"Nữ"} value={0} />
          </Picker>
        </View>

        <View style={styles.action}>
          <Feather name="phone" color="#05375a" size={20} />
          <TextInput
            placeholder="Số điện thoại"
            style={styles.textInput}
            autoCapitalize="none"
            onChangeText={(val) => handlePhone(val)}
          />
        </View>
        <View style={styles.action}>
          <FontAwesome name="location-arrow" color="#05375a" size={20} />
          <TextInput
            placeholder="Địa chỉ"
            style={styles.textInput}
            autoCapitalize="none"
            onChangeText={(val) => handleAddress(val)}
          />
        </View>

        {/* <Text style={[styles.textfooter,{marginTop:25}]}>Email</Text> */}
        <View style={styles.action}>
          <FontAwesome name="envelope-o" color="#05375a" size={20} />
          <TextInput
            placeholder="Email"
            style={styles.textInput}
            autoCapitalize="none"
            onChangeText={(val) => textInputEmailChange(val)}
          />
          {data.check_TextInput ? (
            <Feather name="check-circle" color="#05375a" size={20} />
          ) : null}
        </View>

        {/* <Text style={[styles.textfooter,{marginTop:25}]}>Password</Text> */}
        <View style={styles.action}>
          <Feather name="lock" color="#05375a" size={20} />
          <TextInput
            placeholder="Mật khẩu của bạn"
            secureTextEntry={data.secureTextEntry ? true : false}
            style={styles.textInput}
            autoCapitalize="none"
            onChangeText={(val) => handlePasswordChange(val)}
          />
          <TouchableOpacity onPress={updatePasswordEntry}>
            {data.secureTextEntry ? (
              <Feather name="eye-off" color="#05375a" size={20} />
            ) : (
              <Feather name="eye" color="#05375a" size={20} />
            )}
          </TouchableOpacity>
        </View>
        {/* <Text style={[styles.textfooter,{marginTop:25}]}>Confirm password</Text> */}
        <View style={styles.action}>
          <Feather name="lock" color="#05375a" size={20} />
          <TextInput
            placeholder="Xác nhận mật khẩu"
            secureTextEntry={data.secureTextEntry ? true : false}
            style={styles.textInput}
            autoCapitalize="none"
            onChangeText={(val) => handleConfirmPasswordChange(val)}
          />
          <TouchableOpacity onPress={updateConfirmPasswordEntry}>
            {data.secureTextEntry ? (
              <Feather name="eye-off" color="#05375a" size={20} />
            ) : (
              <Feather name="eye" color="#05375a" size={20} />
            )}
          </TouchableOpacity>
        </View>

        <View style={styles.button}>
          <TouchableOpacity
            onPress={signUpButton}
            style={[
              styles.signIn,
              {
                borderColor: "#ff4700",
                borderWidth: 1,
                marginTop: 0,
              },
            ]}
          >
            <Text style={[styles.textSign, { color: "#ff4700" }]}>Đăng Ký</Text>
          </TouchableOpacity>

          <Text
            style={[styles.textSignIn, { color: "#ff4700" }]}
            onPress={() => navigation.goBack()}
          >
            Bạn đã có tài khoản! Đăng nhập
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FF4B3A",
  },
  header: {
    flex: 1,
    justifyContent: "flex-end",
    paddingHorizontal: 20,
    paddingBottom: 50,
  },
  footer: {
    flex: 3,
    backgroundColor: "#fff",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingVertical: 30,
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
    borderBottomWidth: 1,
    borderBottomColor: "#f2f2f2",
    paddingBottom: 5,
  },
  textInput: {
    flex: 1,
    paddingLeft: 10,
    color: "#05375a",
  },
  button: {
    alignItems: "center",
    marginTop: 50,
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
  picker: {
    marginLeft: 15,
    marginRight: 15,
  },
});
