
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import TabNavigation from "./TabNavigator"
import productdetail from "../detail/[id]/productdetail";

const Stack = createNativeStackNavigator();

const AppStack = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen
        component={TabNavigation}
        name="Home"
      />
    <Stack.Screen name="detail/[id]/productdetail" component={productdetail} options={{ title: "Chi tiết sản phẩm" }} />

    </Stack.Navigator>
  );
};

export default AppStack;
