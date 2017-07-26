import React, { Component } from "react";

import {
  Container,
  Header,
  Title,
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
  Input,
  View,
  Picker
} from "native-base";

import styles from "./styles";



const datas = [
  {
    itemName: "Chleba",
    amount: "1",
    price: "5"
  },
  {
    itemName: "Chleba",
    amount: "1",
    price: "5"
  },
  {
    itemName: "Chleba",
    amount: "1",
    price: "5"
  },
  {
    itemName: "Chleba",
    amount: "1",
    price: "5"
  },
  {
    itemName: "Chleba",
    amount: "1",
    price: "5"
  },
  {
    itemName: "Chleba",
    amount: "1",
    price: "5"
  }
];

class EditItem extends Component {
  constructor(props) {
  super(props);
  this.state = {
    selectedItem: undefined,
    selected1: 'key0',
    results: {
      items: []
    },
  };
}
onValueChange(value: string) {
  this.setState({
    selected1: value
  });
}

  render() {
    return (
      <Container style={styles.container}>
        <Header>
          <Left>
          <Button transparent onPress={() => this.props.navigation.goBack()}>
              <Icon name="arrow-back" />
            </Button>
          </Left>
          <Body>
            <Title>Edit item</Title>
          </Body>
          <Right />
        </Header>
        <Content style={{ padding: 15 }}>
          <Text note>Name</Text>
          <View style={{ borderColor: '#CCCCCC', borderWidth: 0.5, marginBottom: 15 }}>
            <Input />
          </View>
          <Text note>Price/amount</Text>
          <View style={{ borderColor: '#CCCCCC', borderWidth: 0.5, marginBottom: 15 }}>
            <Input />
          </View>
          <Text note>Amount</Text>
          <View style={{ borderColor: '#CCCCCC', borderWidth: 0.5, marginBottom: 15 }}>
            <Input />
          </View>
          <Text note>Shop</Text>
          <View style={{ borderColor: '#CCCCCC', borderWidth: 0.5, marginBottom: 15 }}>
            <Picker
              supportedOrientations={['portrait', 'landscape']}
              iosHeader="Select one"
              mode="dropdown"
              selectedValue={this.state.selected1}
              onValueChange={this.onValueChange.bind(this)}>
              <Item label="Kaufland" value="key0" />
              <Item label="Lidl" value="key1" />
          </Picker>
        </View>
        <Text note>Note</Text>
        <View style={{ borderColor: '#CCCCCC', borderWidth: 0.5, marginBottom: 15 }}>
          <Input />
        </View>

      </Content>
      </Container>
    );
  }
}

export default EditItem;
