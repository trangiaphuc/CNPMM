import React from "react";

import { createStackNavigator } from "@react-navigation/stack";

import flashScreen from "../screens/flashScreen";
import signInScreen from "../auth/signInScreen";
import signUpScreen from "../auth/signUpScreen";
import darBoardScreen from "../screens/darBoardScreen";
import productDetailScreen from "../screens/productDetailScreen";
import foodDetailScreen from "../screens/foodDetailScreen";
import welcomScreen from "../screens/welcomScreen";
import billScreen from "../screens/billScreen";
import updateUserProfile from "../screens/updateUseProfileScreen";
import userOrderManagementScreen from "../screens/userOrderManagementScreen";
import updateProductScreen from "../screens/updateProductScreen";
import ordersDetailBillScreen from "../screens/Orders/ordersDetailBillScreen";
import productCategoryScreen from "../screens/Product/productCategoryScreen";
import foodCategoryScreen from "../screens/Food/foodCategoryScreen";
import homeScreen from "../screens/homeScreen";
import homeMainScreen from "../screens/homeMainScreen";
import foodScreen from "../screens/foodScreen";
import addNewProductScreen from "../screens/Product/addNewProductScreen";
import addFoodCategoryScreen from "../screens/Food/addFoodCategoryScreen";
import addNewFoodScreen from "../screens/Food/addNewFoodScreen";
import updateFoodScreen from "../screens/Food/updateFoodScreen";
import addNewProductCategoryScreen from "../screens/Product/addNewProductCategoryScreen";
import updateProductCategoryScreen from "../screens/Product/updateProductCategoryScreen";
import changePasswordScreen from "../screens/changePasswordScreen";
// SERVER
import SVHomeScreen from "../screenServer/SVHome/SVHomeScreen";
import SVManageProductCat from "../screenServer/SVProduct/SVManageProductCat";
import SVManageFoodCat from "../screenServer/SVFood/SVManageFoodCat";
import SVAddNewProductCat from "../screenServer/SVProduct/SVAddNewProductCat";
import SVAddNewFoodCat from "../screenServer/SVFood/SVAddNewFoodCat";
import SVUpdateProductCat from "../screenServer/SVProduct/SVUpdateProductCat";
import SVOrderManagement from "../screenServer/SVOrder/SVOrderManagement";
import SVOrderDetail from "../screenServer/SVOrder/SVOrderDetail";
import SVFoodManage from "../screenServer/SVFood/SVFoodManage";
import SVFoodDetail from "../screenServer/SVFood/SVFoodDetail";
import SVAddNewFood from "../screenServer/SVFood/SVAddNewFood";
import SVUpdateFood from "../screenServer/SVFood/SVUpdateFood";
import SVManageProduct from "../screenServer/SVProduct/SVManageProduct";
import SVAddNewProduct from "../screenServer/SVProduct/SVAddNewProduct";
import SVDetailProduct from "../screenServer/SVProduct/SVDetailProduct";
import SVUpdateProduct from "../screenServer/SVProduct/SVUpdateProduct";
// CLIENT
import CLDashboardScreen from "../screensClient/CLDashboard/CLDashboardScreen";
import CLOrderManagementScreen from "../screensClient/CLOrder/CLOrderManagementScreen";
import CLUpdateProfileScreen from "../screensClient/CLProfile/CLUpdateProfileScreen";
import CLUpdatePasswordScreen from "../screensClient/CLProfile/CLUpdatePasswordScreen";
import CLMarketNoteScreen from "../screensClient/CLMarketNote/CLMarketNoteScreen";
import CLFavouriteFoodsScreen from "../screensClient/CLFoods/CLFavouriteFoodsScreen";
import CLFoodsDetailScreen from "../screensClient/CLFoods/CLFoodsDetailScreen";
import CLFoodsMaterialScreen from "../screensClient/CLFoods/CLFoodsMaterialScreen";
import CLProductDetailScreen from "../screensClient/CLProducts/CLProductDetailScreen";
import CLBillScreen from "../screensClient/CLCart/CLBillScreen";

const RootStack = createStackNavigator();

const rootStackScreen = () => (
  <RootStack.Navigator headerShown={false}>
    <RootStack.Screen
      name="flashScreen"
      component={flashScreen}
      options={{ headerShown: false }}
    />
    <RootStack.Screen
      name="signInScreen"
      component={signInScreen}
      options={{ headerShown: false }}
    />
    <RootStack.Screen
      name="signUpScreen"
      component={signUpScreen}
      options={{ headerShown: false }}
    />
    <RootStack.Screen
      name="darBoardScreen"
      component={darBoardScreen}
      options={{ headerShown: false }}
    />
    <RootStack.Screen
      name="productDetailScreen"
      component={productDetailScreen}
      options={{ headerShown: false }}
    />
    <RootStack.Screen
      name="foodDetailScreen"
      component={foodDetailScreen}
      options={{ headerShown: false }}
    />
    <RootStack.Screen
      name="welcomScreen"
      component={welcomScreen}
      options={{ headerShown: false }}
    />
    <RootStack.Screen
      name="billScreen"
      component={billScreen}
      options={{ headerShown: false }}
    />
    <RootStack.Screen
      name="updateUserProfileScreen"
      component={updateUserProfile}
      options={{ headerShown: false }}
    />
    <RootStack.Screen
      name="userOrderManagementScreen"
      component={userOrderManagementScreen}
      options={{ headerShown: false }}
    />
    <RootStack.Screen
      name="updateProductScreen"
      component={updateProductScreen}
      options={{ headerShown: false }}
    />
    <RootStack.Screen
      name="ordersDetailBillScreen"
      component={ordersDetailBillScreen}
      options={{ headerShown: false }}
    />
    <RootStack.Screen
      name="productCategoryScreen"
      component={productCategoryScreen}
      options={{ headerShown: false }}
    />
    <RootStack.Screen
      name="foodCategoryScreen"
      component={foodCategoryScreen}
      options={{ headerShown: false }}
    />
    <RootStack.Screen
      name="homeScreen"
      component={homeScreen}
      options={{ headerShown: false }}
    />
    <RootStack.Screen
      name="foodScreen"
      component={foodScreen}
      options={{ headerShown: false }}
    />
    <RootStack.Screen
      name="addNewProductScreen"
      component={addNewProductScreen}
      options={{ headerShown: false }}
    />
    <RootStack.Screen
      name="addFoodCategoryScreen"
      component={addFoodCategoryScreen}
      options={{ headerShown: false }}
    />
    <RootStack.Screen
      name="addNewFoodScreen"
      component={addNewFoodScreen}
      options={{ headerShown: false }}
    />
    <RootStack.Screen
      name="updateFoodScreen"
      component={updateFoodScreen}
      options={{ headerShown: false }}
    />
    <RootStack.Screen
      name="addNewProductCategoryScreen"
      component={addNewProductCategoryScreen}
      options={{ headerShown: false }}
    />
    <RootStack.Screen
      name="updateProductCategoryScreen"
      component={updateProductCategoryScreen}
      options={{ headerShown: false }}
    />
    <RootStack.Screen
      name="changePasswordScreen"
      component={changePasswordScreen}
      options={{ headerShown: false }}
    />

    {/* SERVER */}

    <RootStack.Screen
      name="SVHomeScreen"
      component={SVHomeScreen}
      options={{ headerShown: false }}
    />

    <RootStack.Screen
      name="SVManageProductCat"
      component={SVManageProductCat}
      options={{ headerShown: false }}
    />
    <RootStack.Screen
      name="SVManageFoodCat"
      component={SVManageFoodCat}
      options={{ headerShown: false }}
    />
    <RootStack.Screen
      name="SVAddNewProductCat"
      component={SVAddNewProductCat}
      options={{ headerShown: false }}
    />
    <RootStack.Screen
      name="SVAddNewFoodCat"
      component={SVAddNewFoodCat}
      options={{ headerShown: false }}
    />
    <RootStack.Screen
      name="SVUpdateProductCat"
      component={SVUpdateProductCat}
      options={{ headerShown: false }}
    />
    <RootStack.Screen
      name="SVOrderManagement"
      component={SVOrderManagement}
      options={{ headerShown: false }}
    />
    <RootStack.Screen
      name="SVOrderDetail"
      component={SVOrderDetail}
      options={{ headerShown: false }}
    />
    <RootStack.Screen
      name="SVFoodManage"
      component={SVFoodManage}
      options={{ headerShown: false }}
    />
    <RootStack.Screen
      name="SVFoodDetail"
      component={SVFoodDetail}
      options={{ headerShown: false }}
    />
    <RootStack.Screen
      name="SVAddNewFood"
      component={SVAddNewFood}
      options={{ headerShown: false }}
    />
    <RootStack.Screen
      name="SVManageProduct"
      component={SVManageProduct}
      options={{ headerShown: false }}
    />
    <RootStack.Screen
      name="SVAddNewProduct"
      component={SVAddNewProduct}
      options={{ headerShown: false }}
    />
    <RootStack.Screen
      name="SVDetailProduct"
      component={SVDetailProduct}
      options={{ headerShown: false }}
    />
    <RootStack.Screen
      name="SVUpdateFood"
      component={SVUpdateFood}
      options={{ headerShown: false }}
    />
    <RootStack.Screen
      name="SVUpdateProduct"
      component={SVUpdateProduct}
      options={{ headerShown: false }}
    />

    {/* CLIENT */}

    <RootStack.Screen
      name="CLDashboardScreen"
      component={CLDashboardScreen}
      options={{ headerShown: false }}
    />
    <RootStack.Screen
      name="CLOrderManagementScreen"
      component={CLOrderManagementScreen}
      options={{ headerShown: false }}
    />
    <RootStack.Screen
      name="CLUpdateProfileScreen"
      component={CLUpdateProfileScreen}
      options={{ headerShown: false }}
    />
    <RootStack.Screen
      name="CLUpdatePasswordScreen"
      component={CLUpdatePasswordScreen}
      options={{ headerShown: false }}
    />
    <RootStack.Screen
      name="CLMarketNoteScreen"
      component={CLMarketNoteScreen}
      options={{ headerShown: false }}
    />
    <RootStack.Screen
      name="CLFavouriteFoodsScreen"
      component={CLFavouriteFoodsScreen}
      options={{ headerShown: false }}
    />
    <RootStack.Screen
      name="CLFoodsDetailScreen"
      component={CLFoodsDetailScreen}
      options={{ headerShown: false }}
    />
    <RootStack.Screen
      name="CLFoodsMaterialScreen"
      component={CLFoodsMaterialScreen}
      options={{ headerShown: false }}
    />
    <RootStack.Screen
      name="CLProductDetailScreen"
      component={CLProductDetailScreen}
      options={{ headerShown: false }}
    />
    <RootStack.Screen
      name="CLBillScreen"
      component={CLBillScreen}
      options={{ headerShown: false }}
    />
  </RootStack.Navigator>
);

export default rootStackScreen;
