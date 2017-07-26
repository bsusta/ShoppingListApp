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
  FooterTab,
} from "native-base";

import {TouchableHighlight} from "react-native";

import styles from "./styles";



const datas = [
  {
    userName: "Branislav Susta",
  },
];

class UsersList extends Component {
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
            <Title>Users</Title>
          </Body>
          <Right />
        </Header>
        <Content>
          <List
            dataArray={datas}
            renderRow={data =>
              <ListItem onPress={() => this.props.navigation.navigate('UserEdit')}>
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

export default UsersList;
