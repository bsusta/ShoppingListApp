/* @flow */

import React from "react";

import { Platform } from "react-native";
import { Root } from "native-base";
import { StackNavigator } from "react-navigation";

import Login from "./components/login/";
import ShopList from "./components/shopList/";


const AppNavigator = StackNavigator(
    {
      Login: { screen: Login },
      ShopList: { screen:  ShopList },


    },
    {
        initialRouteName: "Login",
    }
);

export default () =>
    <Root>
        <AppNavigator />
    </Root>;
