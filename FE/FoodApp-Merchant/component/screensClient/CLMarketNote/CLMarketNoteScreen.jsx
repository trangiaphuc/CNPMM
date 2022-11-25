import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  Platform,
  TextInput,
  Form,
  Alert,
  ScrollView,
  FlatList,
} from "react-native";
import { Card } from "react-native-elements";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { getNote } from "../../services/callAPI";
export default function CLMarketNoteScreen({ navigation, route }) {
  const { userData } = route.params;
  const [noteData, setNoteData] = useState([]);
  //console.log(noteData);
  const getNoteData = async () => {
    const result = await getNote(userData);
    if (result.status == 200) {
      setNoteData(result.data.marketNotes);
    }
  };
  useEffect(() => {
    getNoteData();
  }, []);
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
      <ScrollView
        style={{ height: "92%", margin: 5 }}
        horizontal
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
          justifyContent: "center",
        }}
      >
        <FlatList
          data={noteData}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => {
            return (
              <Card
                containerStyle={{
                  height: 100,
                  width: 180,
                }}
              >
                <Text>{item.marketNoteText}</Text>
                <Text>Huy</Text>
              </Card>
            );
          }}
          showsHorizontalScrollIndicator={false}
          numColumns={2}
        />
      </ScrollView>
      {/* <ScrollView style={{ height: "92%" }}>
        {noteData.map((item) => (
          <View key={item.id} style={{}}>
            <Card>
              <Text>{item.marketNoteText}</Text>
              <Text>{item.remindDate}</Text>
            </Card>
          </View>
        ))}
      </ScrollView> */}
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
    flex: 2,
    //borderWidth: 1,
    fontWeight: "bold",
    fontSize: 20,
    color: "#ffffff",
    marginRight: 75,
  },
});
