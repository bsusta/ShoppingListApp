import React, { Component } from "react";
import { View,ActivityIndicator } from 'react-native';
import { withApollo,graphql } from 'react-apollo';
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

  constructor (props) {
    super(props);
    this.state = {
      userName:'',
      password:'',
      loading:false,
    }
  }

  async submit() {
    this.setState(
    {loading:true}
      );
    let email=this.state.userName;
    let password = this.state.password;
    let client = this.props.client;

    client.mutate({
      mutation: loginUser,
      variables: { email, password }
    });

  }

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
                    <Input
                      label="Username"
                      value={this.state.userName}
                      onChangeText={(value)=>this.setState({userName:value})}
                      />
                  </Item>
                  <Item inlineLabel last>
                    <Label>Password</Label>
                      <Input
                        label="Password"
                        value={this.state.password}
                        onChangeText={(value)=>this.setState({password:value})}
                        secureTextEntry={true}
                        />
                  </Item>
                </Form>
                <View style={{ marginBottom: 80, marginTop: 20 }}>
                  <Button
                    block
                    primary
                    style={styles.mb15}
                    onPress={() => this.submit.bind(this)}
                    disabled={this.state.loading}
                  >
                  {
                    this.state.loading?
                    <ActivityIndicator
                      animating size={ 'large' }
                      color='#007299' /> :
                      <Text>Login</Text>
                    }
                  </Button>
                </View>
              </Content>
            </Container>
    );
  }
}

export default withApollo(Login);

//this.props.navigation.navigate('ItemList')
