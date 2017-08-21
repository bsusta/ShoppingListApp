import React from "react";
import { Platform, StatusBar } from "react-native";
import { StackNavigator,NavigationActions } from "react-navigation";
import {Root} from 'native-base';

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

const navigateOnce = (getStateForAction) => (action, state) => {
  const {type, routeName} = action;
  return (
    state &&
    type === NavigationActions.NAVIGATE &&
    routeName === state.routes[state.routes.length - 1].routeName
  ) ? null : getStateForAction(action, state);
};
AppNavigator.router.getStateForAction = navigateOnce(AppNavigator.router.getStateForAction);

export default() => {
  return (
      <Root>
        <AppNavigator style={{paddingTop:25, backgroundColor:'#3F51B5'}} onNavigationStateChange={null}/>
      </Root>
  );
}
