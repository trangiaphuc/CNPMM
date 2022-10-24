import { NavigationContainer } from "@react-navigation/native";
import React from "react";
import RootStackScreen from "./component/root/rootStackScreen";
import api from "./component/services/api";

const App = () => {
  return (
    <NavigationContainer>
      <RootStackScreen />
    </NavigationContainer>
  );
};
export default App;
