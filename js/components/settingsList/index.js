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
  View,
  FooterTab,
  Footer
} from "native-base";

import styles from "./styles";


class SettingsList extends Component {
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
            <Title>Settings</Title>
          </Body>
          <Right />
        </Header>
        <Content style={{ padding: 15 }}>
          <ListItem  icon button onPress={() => this.props.navigation.navigate('ShopsList')}>
            <Left>
              <Icon name="barcode" />
            </Left>
            <Body>
              <Text>Shops</Text>
            </Body>
            <Right>
              <Icon name="arrow-forward" />
            </Right>
          </ListItem>
          <ListItem icon button onPress={() => this.props.navigation.navigate('UsersList')}>
            <Left>
              <Icon name="person" />
            </Left>
            <Body>
              <Text>Users</Text>
            </Body>
            <Right>
              <Icon name="arrow-forward" />
            </Right>
          </ListItem>
          <ListItem icon>
            <Left>
              <Icon name="exit" />
            </Left>
            <Body>
              <Text>Log out</Text>
            </Body>
            <Right>
              <Icon name="arrow-forward" />
            </Right>
          </ListItem>
        </Content>
        <Footer>
          <FooterTab>
            <Button onPress={() => this.props.navigation.navigate('ShopAdd')} iconLeft style={{ flexDirection: 'row', borderColor: 'white', borderWidth: 0.5 }}>
              <Icon active style={{ color: 'white' }} name="add" />
              <Text style={{ color: 'white' }} >Shop</Text>
            </Button>
          </FooterTab>
          <FooterTab>
            <Button onPress={() => this.props.navigation.navigate('UserAdd')} iconLeft style={{ flexDirection: 'row', borderColor: 'white', borderWidth: 0.5 }}>
              <Icon active style={{ color: 'white' }} name="add" />
              <Text style={{ color: 'white' }} >User</Text>
            </Button>
          </FooterTab>
        </Footer>
      </Container>
    );
  }
}

export default SettingsList;
