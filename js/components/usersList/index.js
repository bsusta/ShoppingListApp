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
import {TouchableHighlight, ActivityIndicator} from "react-native";
import {graphql} from 'react-apollo';
import styles from "./styles";
import {users,usersSubscription} from './query';
const withUsers = graphql(users, {
    props: ({data: {loading, allUsers, error, refetch, subscribeToMore}}) => ({
        loadingUsers: loading,
        users: allUsers,
        refetchUsers: refetch,
        subscribeToMoreUsers: subscribeToMore,
    }),
});

class UsersList extends Component {
  constructor(props){
    super(props);
  }
  componentDidMount(){
    this.props.subscribeToMoreUsers({
      document: usersSubscription,
      updateQuery: () => {
        this.props.refetchUsers();
        return;
      },
    });
  }
  render(){
    if(this.props.loadingUsers){
      return (<ActivityIndicator
          animating size={'large'}
          color='#007299'/>);
  }
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
            dataArray={this.props.users}
            renderRow={data =>
              <ListItem onPress={() => this.props.navigation.navigate('UserEdit',data)}>
                  <Body>
                      <Text>{data.email}</Text>
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

export default withUsers(UsersList);
