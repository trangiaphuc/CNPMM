import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  Platform,
  TextInput,
  Picker,
  Alert,
  Image,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Feather from "react-native-vector-icons/Feather";
import axios from "axios";
//import signInScreen from "./signInScreen";
import darBoardScreen from "./darBoardScreen";
import API from "../services/api";
import ComboBox from "react-native-combobox";

export default function updateUserProfile({ navigation, route }) {
  const { userData } = route.params;

  const [userInformation, setUserInformations] = React.useState({
    email: userData.email,
    firstname: userData.firstname,
    lastname: userData.lastname,
    phone: userData.phone,
    address: userData.address,
  });

  //handle Zone
  const handleEmail = (val) => {
    setUserInformations({
      ...userInformation,
      email: val,
    });
  };
  const handleFirstName = (val) => {
    setUserInformations({
      ...userInformation,
      firstname: val,
    });
  };
  const handleLastName = (val) => {
    setUserInformations({
      ...userInformation,
      lastname: val,
    });
  };
  const handlePhone = (val) => {
    setUserInformations({
      ...userInformation,
      phone: val,
    });
  };
  const handleAddress = (val) => {
    setUserInformations({
      ...userInformation,
      address: val,
    });
  };
  //end Handle Zone

  const submitUpdate = () => {
    API.post(
      `user/updateinfor/${userData.id}`,
      {
        firstname: userInformation.firstname,
        lastname: userInformation.lastname,
        phone: userInformation.phone,
        email: userInformation.email,
        address: userInformation.address,
        birthday: "",
      },
      {
        headers: {
          "Content-Type": "application/json",
          "x-access-token": userData.accessToken,
        },
      }
    )
      .then((res) => {
        //console.log(res);
        if (res.status == 500) {
          alert("Thất bại", "Lỗi Server!");
        } else if (res.status == 200) {
          alert("Thành công", "Cập nhật thành công!");
        }
      })
      .catch((err) => {
        alert("Thất bại", err.message);
      });
  };

  return (
    <View style={styles.container}>
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
        <Text style={styles.returnText}>Cập nhật thông tin cá nhân</Text>
      </View>

      <View style={styles.footer}>
        <View style={styles.action}>
          <FontAwesome name="envelope-o" color="#05375a" size={20} />
          <TextInput
            placeholder="Email"
            style={styles.textInput}
            autoCapitalize="none"
            defaultValue={userInformation.email}
            onChangeText={(val) => handleEmail(val)}
          />
        </View>

        <View style={styles.action}>
          <FontAwesome name="user-circle" color="#05375a" size={20} />
          <TextInput
            placeholder="Họ và tên lót"
            style={styles.textInput}
            autoCapitalize="none"
            defaultValue={userInformation.firstname}
            onChangeText={(val) => handleFirstName(val)}
          />
        </View>

        <View style={styles.action}>
          <FontAwesome name="user-circle" color="#05375a" size={20} />
          <TextInput
            placeholder="Tên"
            style={styles.textInput}
            autoCapitalize="none"
            defaultValue={userInformation.lastname}
            onChangeText={(val) => handleLastName(val)}
          />
        </View>
        <View style={styles.action}>
          <Feather name="phone" color="#05375a" size={20} />
          <TextInput
            placeholder="Số điện thoại"
            style={styles.textInput}
            autoCapitalize="none"
            keyboardType="number-pad"
            defaultValue={userInformation.phone}
            onChangeText={(val) => handlePhone(val)}
          />
        </View>

        <View style={styles.action}>
          <FontAwesome name="location-arrow" color="#05375a" size={20} />
          <TextInput
            placeholder="Địa chỉ"
            style={styles.textInput}
            autoCapitalize="none"
            defaultValue={userInformation.address}
            onChangeText={(val) => handleAddress(val)}
          />
        </View>
      </View>

      <View style={styles.button}>
        <TouchableOpacity
          onPress={submitUpdate}
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
            Cập nhật
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor:'#FF4B3A',
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
    flex: 3,
    //borderWidth: 1,
    fontWeight: "bold",
    fontSize: 20,
    color: "#ffffff",
    marginRight: 75,
  },
});
