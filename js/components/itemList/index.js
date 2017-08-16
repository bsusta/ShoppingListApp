import React, { Component } from "react";
import { graphql} from "react-apollo";
import gql from 'graphql-tag';

import { Footer, FooterTab, Container, Header,Tabs,Tab, Title, Content, Button, Icon, Text, Left, Right, Body, List, ListItem, View } from 'native-base';
import {withAll,withShop,withAllFiltered} from "./wrappers";
import {allItems, allItemsFiltered,shopItems,allItemsFilteredDone,allItemsFilteredNotDone} from './query';

import ItemList from './itemList';
class ItemListLoader extends Component {
  constructor(props){
    super(props);
  }
  render() {
    let params=this.props.navigation.state.params;
    params=params?params:{id:'all',shop:'all',name:'All'};
    if(params.id=="all"){
      let HOCAll=(withAll())(ItemList);
      let HOCAllDone=(withAllFiltered(done=true))(ItemList);
      let HOCAllNotDone=(withAllFiltered(done=false))(ItemList);
      return (<Container>
        <Header>
          <Left>
          <Button transparent onPress={() => this.props.navigation.navigate('DrawerOpen')}>
            <Icon name="menu" />
          </Button>
          </Left>
          <Body>
            <Title>{params.name}</Title>
          </Body>
          <Right>
            <Button transparent style={{ marginTop: 8 }} onPress={() => this.props.navigation.navigate('Search')}>
              <Icon name="search" style={{ color: 'white' }} />
            </Button>
          </Right>
        </Header>
        <Tabs>
        <Tab heading="Active">
          <HOCAllNotDone id={params.id} shop={params.shop} name={params.name} color={params.color} navigation={this.props.navigation}  sourceQuery={allItemsFilteredNotDone}/>
        </Tab>

        <Tab heading="Done">
          <HOCAllDone id={params.id} shop={params.shop} name={params.name} color={params.color} navigation={this.props.navigation} sourceQuery={allItemsFilteredDone}/>
        </Tab>

        <Tab heading="All">
            <HOCAll id={params.id} shop={params.shop} name={params.name} color={params.color} navigation={this.props.navigation} sourceQuery={allItems}/>
          </Tab>
      </Tabs>
    </Container>);
    }

    let HOCShopAll=(withShop(id=params.id))(ItemList);
    let shopItemsQuery = gql(`
      query allShops {
           allShops (
             filter:{id:`+params.id+`})
             {
             items{
               id
               key:id
               createdAt
               done
               name
               note
               priceQuantity
               quantity
               shops{
                 id
                 name
                 color
               }
             }
    	 }
      }
    `);
    return (<Container>
      <Header style={{backgroundColor:params.color?params.color:'#3F51B5'}}>
        <Left>
        <Button transparent onPress={() => this.props.navigation.navigate('DrawerOpen')}>
          <Icon name="menu" />
        </Button>
        </Left>
        <Body>
          <Title>{params.name}</Title>
        </Body>
        <Right>

          <Button transparent onPress={() => this.props.navigation.navigate('ShopEdit',{id:params.id,name:params.name,color:params.color})}>
            <Icon name="settings"/>
          </Button>

          <Button transparent style={{ marginTop: 8 }} onPress={() => this.props.navigation.navigate('Search')}>
            <Icon name="search" style={{ color: 'white' }} />
          </Button>
        </Right>
      </Header>
      <Tabs>
      <Tab heading="Active">
        <HOCShopAll id={params.id} shop={params.shop} name={params.name} color={params.color} navigation={this.props.navigation} itemDone={false} sourceQuery={shopItemsQuery}/>
      </Tab>

      <Tab heading="Done">
        <HOCShopAll id={params.id} shop={params.shop} name={params.name} color={params.color} navigation={this.props.navigation} itemDone={true} sourceQuery={shopItemsQuery}/>
      </Tab>

      <Tab heading="All">
          <HOCShopAll id={params.id} shop={params.shop} name={params.name} color={params.color} navigation={this.props.navigation} sourceQuery={shopItemsQuery}/>
        </Tab>
    </Tabs>
  </Container>);
  }
}

export default ItemListLoader;
