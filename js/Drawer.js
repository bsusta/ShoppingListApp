/* @flow */

import React from "react";
import { DrawerNavigator, NavigationActions } from "react-navigation";
import {Platform, StatusBar} from 'react-native';
import Login from "./components/login/";
import ItemList from "./components/itemList/";
import SideBar from "./components/sidebar/";
import SettingsList from "./components/settingsList/";

const DrawerExample = DrawerNavigator(
  {
    ItemList: { screen: ItemList },
    Login: { screen: Login },
    SettingsList: { screen: SettingsList },
  },
  {
    initialRouteName: "Login",
    contentOptions: {
      activeTintColor: "#e91e63"
    },
    contentComponent: props => <SideBar {...props} />,
}
);
/*
const navigateOnce = (getStateForAction) => (action, state) => {
  const {type, routeName} = action;
  return (
    state &&
    type === NavigationActions.NAVIGATE &&
    routeName === state.routes[state.routes.length - 1].routeName
  ) ? null : getStateForAction(action, state);
};
DrawerExample.router.getStateForAction = navigateOnce(DrawerExample.router.getStateForAction);
*/
export default DrawerExample;
