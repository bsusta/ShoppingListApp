import React, { Component } from "react";
import { withApollo} from 'react-apollo';
import { Alert } from "react-native";


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
import {deleteUser,updateUser} from './query';
import styles from "./styles";

class UserEdit extends Component {
  constructor(props){
    super(props);
    this.state={email:this.props.navigation.state.params.email,userName:this.props.navigation.state.params.userName,password:''};
  }
  submit(){
    this.props.client.mutate({
        mutation: updateUser,
        variables: { userName:this.state.userName,id:this.props.navigation.state.params.id},
    });
    this.props.navigation.goBack();
  }
  deleteUser(){
    Alert.alert(
        'Deleting user',
        'Are you sure you want to delete this user?',
        [
            {text: 'Cancel', style: 'cancel'},
            {text: 'OK', onPress: () =>{
              this.props.client.mutate({
                  mutation: deleteUser,
                  variables: {id:this.props.navigation.state.params.id},
              });
              this.props.navigation.goBack();
            }},
        ],
        { cancelable: false }
    )
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
            <Title>Edit user</Title>
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
          <View style={{ borderColor: '#CCCCCC', borderWidth: 0.5, marginBottom: 15 }}>
            <Button danger block onPress={this.deleteUser.bind(this)}>
              <Text>Delete user</Text>
            </Button>
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
export default withApollo(UserEdit);
