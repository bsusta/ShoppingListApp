import React, {Component} from "react";
import {shops, shopsSubscription} from './query';
import {graphql} from 'react-apollo';
import {ActivityIndicator} from "react-native";

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
    FooterTab
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

class ShopsList extends Component {
    componentDidMount() {
        this.props.subscribeToMoreShops({
            document: shopsSubscription,
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
            <Container style={styles.container}>
                <Header>
                    <Left>
                        <Button transparent onPress={() => this.props.navigation.goBack()}>
                            <Icon name="arrow-back"/>
                        </Button>
                    </Left>
                    <Body>
                    <Title>Shops</Title>
                    </Body>
                    <Right/>
                </Header>
                <Content>
                    <List
                        dataArray={this.props.shops}
                        renderRow={data =>
                            <ListItem onPress={() => this.props.navigation.navigate('ShopEdit')}>
                                <Body>
                                <Text>{data.name}</Text>
                                </Body>
                                <Right>
                                    <Icon name="arrow-forward"/>
                                </Right>
                            </ListItem>}
                    />
                </Content>
                <Footer>
                    <FooterTab>
                        <Button onPress={() => this.props.navigation.navigate('ShopAdd')} iconLeft
                                style={{flexDirection: 'row', borderColor: 'white', borderWidth: 0.5}}>
                            <Icon active style={{color: 'white'}} name="add"/>
                            <Text style={{color: 'white'}}>Shop</Text>
                        </Button>
                    </FooterTab>
                </Footer>
            </Container>
        );
    }
}

export default withShops(ShopsList);
