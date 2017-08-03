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
  Footer,
  FooterTab
} from "native-base";
import {createUser} from './query';
import styles from "./styles";
import {withApollo} from 'react-apollo';

class UserAdd extends Component {
  constructor(props){
    super(props);
    this.state={email:'',userName:'',password:''};
  }
  submit(){
    let authProvider= { email: { email:this.state.email,password: this.state.password } }
    this.props.client.mutate({
      mutation: createUser,
      variables: { userName:this.state.userName,authProvider },
    });
  this.props.navigation.goBack();
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
            <Title>Add user</Title>
          </Body>
          <Right />
        </Header>
        <Content style={{ padding: 15 }}>
          <Text note>Email/user login</Text>
          <View style={{ borderColor: '#CCCCCC', borderWidth: 0.5, marginBottom: 15 }}>
            <Input value={this.state.email} onChangeText={(value)=>this.setState({email:value})} />
          </View>
          <Text note>User name</Text>
          <View style={{ borderColor: '#CCCCCC', borderWidth: 0.5, marginBottom: 15 }}>
          <Input value={this.state.userName} onChangeText={(value)=>this.setState({userName:value})} />
          </View>
          <Text note>Password</Text>
          <View style={{ borderColor: '#CCCCCC', borderWidth: 0.5, marginBottom: 15 }}>
          <Input value={this.state.password} onChangeText={(value)=>this.setState({password:value})} />
          </View>
          <Text note>Password repeat</Text>
          <View style={{ borderColor: '#CCCCCC', borderWidth: 0.5, marginBottom: 15 }}>
            <Input value={this.state.password} />
          </View>
        </Content>
        <Footer>
          <FooterTab>
            <Button onPress={() => this.props.navigation.goBack()} iconLeft style={{ flexDirection: 'row', borderColor: 'white', borderWidth: 0.5 }}>
              <Icon active style={{ color: 'white' }} name="remove" />
              <Text style={{ color: 'white' }} >Cancel</Text>
            </Button>
          </FooterTab>
          <FooterTab>
            <Button onPress={this.submit.bind(this)} iconLeft style={{ flexDirection: 'row', borderColor: 'white', borderWidth: 0.5 }}>
              <Icon active style={{ color: 'white' }} name="add" />
              <Text style={{ color: 'white' }} >Save</Text>
            </Button>
          </FooterTab>
        </Footer>
      </Container>
    );
  }
}

export default withApollo(UserAdd);
