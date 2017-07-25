/* @flow */

import React from "react";

import { Platform } from "react-native";
import { Root } from "native-base";
import { StackNavigator } from "react-navigation";

import Drawer from "./Drawer";
import Login from "./components/login/";
import ShopList from "./components/shopList/";


const AppNavigator = StackNavigator(
    {
      Drawer: { screen: Drawer },
      Login: { screen: Login },
      ShopList: { screen:  ShopList },


    },
    {
        initialRouteName: "Login",
        headerMode: "none",
    }
);

export default () =>
    <Root>
        <AppNavigator />
    </Root>;
