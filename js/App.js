/* @flow */

import React from "react";

import { Platform } from "react-native";
import { Root } from "native-base";
import { StackNavigator } from "react-navigation";

import Drawer from "./Drawer";
import Login from "./components/login/";
import ItemList from "./components/itemList/";
import Search from "./components/search/";
import EditItem from "./components/editItem/";
import AddItem from "./components/addItem/";
import SettingsList from "./components/settingsList/";
import UsersList from "./components/usersList/";
import UserEdit from "./components/userEdit/";
import UserAdd from "./components/userAdd/";
import ShopsList from "./components/shopsList/";
import ShopAdd from "./components/shopAdd/";
import ShopEdit from "./components/shopEdit/";


const AppNavigator = StackNavigator(
    {
      Drawer: { screen: Drawer },
      Login: { screen: Login },
      ItemList: { screen:  ItemList },
      Search: { screen:  Search },
      EditItem: { screen: EditItem },
      AddItem: { screen: AddItem },
      SettingsList: { screen: SettingsList },
      UsersList: { screen: UsersList },
      UserAdd: { screen: UserAdd },
      UserEdit: { screen: UserEdit },
      ShopsList: { screen: ShopsList },
      ShopAdd: { screen: ShopAdd },
      ShopEdit: { screen: ShopEdit },
    },
    {
        initialRouteName: "Drawer",
        headerMode: "none",
    }
);

export default () =>
    <Root>
        <AppNavigator />
    </Root>;
