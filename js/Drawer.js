/* @flow */

import React from "react";
import { DrawerNavigator } from "react-navigation";

import Login from "./components/login/";
import ShopList from "./components/shopList/";
import SideBar from "./components/sidebar/";

const DrawerExample = DrawerNavigator(
  {
    ShopList: { screen: ShopList },
  },
  {
    initialRouteName: "ShopList",
    contentOptions: {
      activeTintColor: "#e91e63"
    },
    contentComponent: props => <SideBar {...props} />
  }
);

export default DrawerExample;
