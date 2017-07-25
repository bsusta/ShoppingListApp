import React, { Component } from "react";
import { View, StatusBar } from 'react-native';
import {
  Container,
  Header,
  Title,
  Content,
  Button,
  Item,
  Label,
  Input,
  Body,
  Left,
  Right,
  Icon,
  Form,
  Text
} from "native-base";

import styles from "./styles";

class Login extends Component {
  render() {
    return (
      <Container>
            <StatusBar barStyle="light-content" />
              <Content>
                <Header>
                  <Body>
                    <Title>ShoppingList</Title>
                  </Body>
                </Header>
                <Form>
                  <Item inlineLabel>
                    <Label>Username</Label>
                    <Input />
                  </Item>
                  <Item inlineLabel last>
                    <Label>Password</Label>
                    <Input />
                  </Item>
                </Form>
                <View style={{ marginBottom: 80, marginTop: 20 }}>
                  <Button
                    block
                    primary
                    style={styles.mb15}
                    onPress={() => this.props.navigation.navigate('ShopList')}
                  >
                    <Text>Login</Text>
                  </Button>
                </View>
              </Content>
            </Container>
    );
  }
}

export default Login;
