import React, {Component } from "react";
import {Image, ActivityIndicator} from "react-native";
import {shops, shopsSubscription, itemsSubscription} from './query';
import {graphql} from 'react-apollo';

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

    render() {
        if (this.props.loadingShops) {
            return (<ActivityIndicator
                animating size={'large'}
                color='#007299'/>);
        }
        return (
            <Container>
                <Header>
                    <Body>
                    <Title>Shops list</Title>
                    </Body>
                    <Right>
                        <Button transparent style={{marginTop: 8}}
                                onPress={() => this.props.navigation.navigate('Login')}>
                            <Icon name="power" style={{color: 'white'}}/>
                        </Button>
                    </Right>

                </Header>

                <Content bounces={false} style={{
                    flex: 1,
                    backgroundColor: "#fff",
                    top: -1
                }}>
                    <List dataArray={[{id: 'all', name: 'All'}].concat(this.props.shops)}
                          renderRow={data =>
                              <ListItem button noBorder
                               onPress={() => this.props.navigation.navigate('ItemList', {id: data.id,name:data.name,color:data.color})}>
                              <Left>
                                  <Icon active name='ios-color-filter-outline' style={{
                                      color: "#777",
                                      fontSize: 26,
                                      width: 30
                                  }}/>
                                  <Text style={styles.text}>
                                      {data.name}
                                  </Text>
                              </Left>
                              {data.items && <Right style={{
                                  flex: 1
                              }}>
                                  {
                                      data.items && <Badge style={{
                                          borderRadius: 3,
                                          height: 25,
                                          width: 72,
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
                                color: "blue",
                                fontSize: 26,
                                width: 30
                            }}/>
                            <Text style={{...styles.text,color:'blue'}}>Shop</Text>
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
                </Content>
            </Container>
        );
    }
}

export default withShops(SideBar);
