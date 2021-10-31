import { NavigationContainer } from "@react-navigation/native";
import React from "react";
import RootStackScreen from "./component/root/rootStackScreen";

const App=()=>{
  return(
    <NavigationContainer>
      <RootStackScreen/>
    </NavigationContainer>
  );
}
export default App;