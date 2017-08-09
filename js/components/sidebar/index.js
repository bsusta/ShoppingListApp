import React, {Component } from "react";
import {Image, ActivityIndicator} from "react-native";
import {shops, shopsSubscription, itemsSubscription, getMe} from './query';
import {graphql,withApollo} from 'react-apollo';
import { connect } from 'react-redux';
import Login from './../login/';
import {removeTokenFromUse} from './../../tokens/tokenHandling';
import {SUBMIT_ID} from './../../apollo/userId';
import {
    Content,
    Text,
    List,
    ListItem,
    Icon,
    Container,
    Left,
    Right,
    Badge,
    Button,
    View,
    StyleProvider,
    getTheme,
    variables,
    Header,
    HeaderTab,
    Body,
    Title,
    Separator,
} from "native-base";

import styles from "./styles";

const withShops = graphql(shops, {
    props: ({data: {loading, allShops, error, refetch, subscribeToMore}}) => ({
        loadingShops: loading,
        shops: allShops,
        refetchShops: refetch,
        subscribeToMoreShops: subscribeToMore,
    }),
});

class SideBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            shadowOffsetWidth: 1,
            shadowRadius: 4,
        };
    }

    componentDidMount() {
        this.props.subscribeToMoreShops({
            document: shopsSubscription,
            updateQuery: () => {
                this.props.refetchShops();
                return;
            },
        });
        this.props.subscribeToMoreShops({
            document: itemsSubscription,
            updateQuery: () => {
                this.props.refetchShops();
                return;
            },
        });

    }
     logOut(){
      removeTokenFromUse(this.props.client);
      this.props.logOut();
      this.props.client.resetStore();
      this.props.navigation.navigate('Login');
    }
    render() {
        if(!this.props.loggedIn){
          return<View style={{paddingTop:20,flex:1}}>
           <Text>You must log in first!</Text>
          </View>
        }
        if (this.props.loadingShops) {
            return (<ActivityIndicator
                animating size={'large'}
                color='#007299'/>);
        }
        return (
            <Container>
                <Header>
                    <Body>
                    <Title>{this.props.userName}</Title>
                    </Body>
                </Header>

                <Content bounces={false} style={{
                    flex: 1,
                    backgroundColor: "#fff",
                    top: -1
                }}>
                    <List dataArray={[{id: 'all', name: 'All'}].concat(this.props.shops)}
                          renderRow={data =>
                              <ListItem button noBorder
                               onPress={() => this.props.navigation.navigate('ItemList', {id: data.id,name:data.name,color:data.color,shop:data})}>
                              <Left style={{width: 32}}>
                                  <Icon active name={data.id=='all'?'ios-color-filter-outline':'md-pricetag'} style={{
                                      color: "#777",
                                      fontSize: 26,
                                      width: 30
                                  }}/>
                                  <View style={{backgroundColor:data.color}}>
                                  <Text style={{...styles.text,color:data.id=='all'?'black':'white'}}>
                                      {data.name}
                                  </Text>
                                </View>
                              </Left>

                              {data.items &&
                                <Right style={{
                              }}>
                                  {
                                      data.items && <Badge style={{
                                          borderRadius: 3,
                                          height: 25,
                                          backgroundColor: '#477EEA'
                                      }}>
                                          <Text style={styles.badgeText}>{data.items.length}</Text>
                                      </Badge>
                                  }
                              </Right>}
                          </ListItem>}
                    />



                    <ListItem button noBorder
                              onPress={() => this.props.navigation.navigate('ShopAdd')}>
                        <Left>
                            <Icon
                                active
                                name='add'
                                style={{
                                color: "#3F51B5",
                                fontSize: 26,
                                width: 30
                            }}/>
                            <Text style={{...styles.text,color:'#3F51B5'}}>Shop</Text>
                        </Left>

                        <Right/>
                    </ListItem>

                    <Separator bordered>
                        <Text>Settings</Text>
                    </Separator>
                    <ListItem icon button onPress={() => this.props.navigation.navigate('ShopsList')}>
                        <Left>
                            <Icon name="barcode"/>
                        </Left>
                        <Body>
                        <Text>Shops</Text>
                        </Body>
                        <Right>
                            <Icon name="arrow-forward"/>
                        </Right>
                    </ListItem>
                    <ListItem icon button onPress={() => this.props.navigation.navigate('UsersList')}>
                        <Left>
                            <Icon name="person"/>
                        </Left>
                        <Body>
                        <Text>Users</Text>
                        </Body>
                        <Right>
                            <Icon name="arrow-forward"/>
                        </Right>
                    </ListItem>
                    <Button danger block onPress={this.logOut.bind(this)} iconLeft style={{ flexDirection: 'row', borderColor: 'white', marginTop:5, borderWidth: 0.5 }}>
                      <Icon active style={{ color: 'white' }} name="power" />
                      <Text style={{ color: 'white' }} >Log out</Text>
                    </Button>

                </Content>
            </Container>
        );
    }
}

function bindActions(dispatch) {
    return {
      logOut: () => dispatch({type:SUBMIT_ID,userId:null,userMail:null,token:null}),

    };
}

const mapStateToProps = state => ({
  loggedIn:state.userId.userId?true:false,
  userName:state.userId.userMail
});

export default withApollo(withShops(connect(mapStateToProps, bindActions)(SideBar)));
