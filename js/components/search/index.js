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
  Input
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

class Search extends Component {
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
            <Title>Search</Title>
          </Body>
          <Right />
        </Header>
        <Content>
          <ListItem>
            <Item rounded>
              <Icon name="ios-search" />
              <Input placeholder="Search" />
            </Item>
          </ListItem>
        <Button primary block style={{ margin: 15 }}>
        <Text>Search</Text>
        </Button>
          <List
            dataArray={datas}
            renderRow={data =>
              <ListItem thumbnail>
                <Left>

                </Left>
                <Body>
                  <Text>{data.itemName}</Text>
                  <Text numberOfLines={1} note>Amount: {data.amount}</Text>
                  <Text numberOfLines={1} note>Price/stock: {data.price}</Text>
                </Body>
                <Right>
                  <Button transparent>
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

export default Search;
