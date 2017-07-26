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
  View
} from "native-base";

import {TouchableHighlight} from "react-native";

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

class ItemList extends Component {
  render() {
    return (
      <Container style={styles.container}>
        <Header>
          <Left>
          <Button transparent onPress={() => this.props.navigation.navigate('DrawerOpen')}>
            <Icon name="menu" />
          </Button>
          </Left>
          <Body>
            <Title>ShopName</Title>
          </Body>
          <Right>
            <Button transparent style={{ marginTop: 8 }} onPress={() => this.props.navigation.navigate('Search')}>
              <Icon name="search" style={{ color: 'white' }} />
            </Button>
            <Button transparent style={{ marginTop: 8 }} onPress={() => this.props.navigation.navigate('Login')}>
              <Icon name="power" style={{ color: 'white' }} />
            </Button>
          </Right>
        </Header>

        <Content>
          <List
            dataArray={datas}
            renderRow={data =>
              <ListItem thumbnail>
                <Left>

                </Left>
                <Body>
                  <TouchableHighlight transparent onPress={() => this.props.navigation.navigate('EditItem')}>
                    <View>
                      <Text>{data.itemName}</Text>
                      <Text numberOfLines={1} note>Amount: {data.amount}</Text>
                      <Text numberOfLines={1} note>Price/stock: {data.price}</Text>
                    </View>
                </TouchableHighlight>
                </Body>
                <Right>
                  <Button transparent block>
                    <CheckBox checked={false} />
                  </Button>
                </Right>
              </ListItem>}
          />
        </Content>
      </Container>
    );
  }
}

export default ItemList;
