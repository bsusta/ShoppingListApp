import React, { Component } from "react";
import {
  Content,
  Button,
  Icon,
  List,
  ListItem,
  Text,
  Thumbnail,
  Left,
  Body,
  Right,
  CheckBox,
  Item,
  View
} from "native-base";

import styles from "./styles";


class Shop extends Component {
  constructor(props) {
    super(props);
    this.state={selected:this.props.selected}
 }

  render() {
    return (
      <ListItem thumbnail onPress={()=>{this.props.setShop(this.state.selected,this.props.item);this.setState({selected:!this.state.selected});}}>
        <Left>
            <CheckBox checked={this.state.selected}  onPress={()=>{this.props.setShop(this.state.selected,this.props.item);this.setState({selected:!this.state.selected});}} />
        </Left>
        <Body>
          <View style={{backgroundColor:this.props.item.color,paddingLeft:10}}>
            <Text style={{color:'white'}}>{this.props.item.name}</Text>
          </View>
        </Body>
      </ListItem>
    );
  }
}

export default Shop;
