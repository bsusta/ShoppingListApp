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
  View,
  Footer,
  FooterTab
} from "native-base";

import styles from "./styles";



const datas = [
  {
    userName: "Kaufland",
  },
];

class ShopsList extends Component {
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
            <Title>Shops</Title>
          </Body>
          <Right />
        </Header>
        <Content>
          <List
            dataArray={datas}
            renderRow={data =>
              <ListItem onPress={() => this.props.navigation.navigate('ShopEdit')}>
                  <Body>
                      <Text>{data.userName}</Text>
                  </Body>
                <Right>
                  <Icon name="arrow-forward" />
                </Right>
              </ListItem>}
          />
        </Content>
        <Footer>
        <FooterTab>
            <Button onPress={() => this.props.navigation.navigate('ShopAdd')} iconLeft style={{ flexDirection: 'row', borderColor: 'white', borderWidth: 0.5 }}>
              <Icon active style={{ color: 'white' }} name="add" />
              <Text style={{ color: 'white' }} >Shop</Text>
            </Button>
          </FooterTab>
        </Footer>
      </Container>
    );
  }
}

export default ShopsList;
