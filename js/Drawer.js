/* @flow */

import React from "react";
import { DrawerNavigator } from "react-navigation";

import Login from "./components/login/";
import ItemList from "./components/itemList/";
import SideBar from "./components/sidebar/";

const DrawerExample = DrawerNavigator(
  {
    ItemList: { screen: ItemList },
    Login: { screen: Login },
  },
  {
    initialRouteName: "Login",
    contentOptions: {
      activeTintColor: "#e91e63"
    },
    contentComponent: props => <SideBar {...props} />
  }
);

export default DrawerExample;
