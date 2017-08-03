import React, { Component } from "react";
import ItemList from './itemList';
import { graphql} from "react-apollo";
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
import {itemFilter} from './query';
import styles from "./styles";

class Search extends Component {
  constructor(props){
    super(props);
    this.state={filter:'',wrapper:null}
  }

  setWrapper(){
    let newWrapper= graphql(itemFilter,{
        options:{
          variables:{
            filter:this.state.filter,
          },
        },
        props: ({ data: { loading, allItems, error, refetch,subscribeToMore } }) => ({
          loadingItems: loading,
          items: allItems,
          itemsError: error,
          refetchItems:refetch,
          subscribeToMoreItems:subscribeToMore,
        })
      });
    this.setState({wrapper:newWrapper(ItemList)});
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
            <Title>Search</Title>
          </Body>
          <Right />
        </Header>
        <Content>
          <ListItem>
            <Item rounded>
              <Icon name="ios-search" />
              <Input value={this.state.filter} onChangeText={(value)=>this.setState({filter:value})} placeholder="Search" onSubmitEditing={this.setWrapper.bind(this)} keyboardType='web-search' />
            </Item>
          </ListItem>
        <Button primary block style={{ margin: 15 }} onPress={this.setWrapper.bind(this)}>
        <Text>Search</Text>
        </Button>
        {
          this.state.wrapper && <this.state.wrapper navigation={this.props.navigation}/>
        }
        </Content>
      </Container>
    );
  }
}

export default Search;
