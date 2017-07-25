/* @flow */

import React from "react";
import { DrawerNavigator } from "react-navigation";

import Login from "./components/login/";
import ShopList from "./components/shopList/";

const DrawerExample = DrawerNavigator(
  {
    Home: { screen: Home },
    Anatomy: { screen: Anatomy },
    Header: { screen: Header },
    Footer: { screen: Footer },
    NHBadge: { screen: NHBadge },
    NHButton: { screen: NHButton },
    NHCard: { screen: NHCard },
    NHCheckbox: { screen: NHCheckbox },
    NHDeckSwiper: { screen: NHDeckSwiper },
    NHFab: { screen: NHFab },
    NHForm: { screen: NHForm },
    TextArea: { screen: TextArea },
    NHIcon: { screen: NHIcon },
    BasicIcon: { screen: BasicIcon },
    IconState: { screen: IconState },
    SpecificIcon: { screen: SpecificIcon },
    NHInputGroup: { screen: NHInputGroup },
    NHLayout: { screen: NHLayout },
    NHList: { screen: NHList },
    ListSwipe: { screen: ListSwipe },
    NHRadio: { screen: NHRadio },
    NHSearchbar: { screen: NHSearchbar },
    NHSpinner: { screen: NHSpinner },
    NHPicker: { screen: NHPicker },
    NHTab: { screen: NHTab },
    NHThumbnail: { screen: NHThumbnail },
    NHTypography: { screen: NHTypography },
    Segment: { screen: Segment },
    Toast: { screen: Toast },
    Actionsheet: { screen: Actionsheet }
  },
  {
    initialRouteName: "Home",
    contentOptions: {
      activeTintColor: "#e91e63"
    },
    contentComponent: props => <SideBar {...props} />
  }
);

export default DrawerExample;
