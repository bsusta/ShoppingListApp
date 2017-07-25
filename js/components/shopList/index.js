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
  Right
} from "native-base";

import styles from "./styles";



const datas = [
  {

    text: "Sankhadeep",
    note: "Its time to build a difference . ."
  },
  {

    text: "Supriya",
    note: "One needs courage to be happy and smiling all time . . "
  },
  {

    text: "Himanshu",
    note: "Live a life style that matchs your vision"
  },
  {

    text: "Shweta",
    note: "Failure is temporary, giving up makes it permanent"
  },
  {

    text: "Shruti",
    note: "The biggest risk is a missed opportunity !!"
  },
  {

    text: "Shivraj",
    note: "Time changes everything . ."
  }
];

class ShopList extends Component {
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
            <Title>List Thumbnail</Title>
          </Body>
          <Right />
        </Header>

        <Content>
          <List
            dataArray={datas}
            renderRow={data =>
              <ListItem thumbnail>
                <Left>
          
                </Left>
                <Body>
                  <Text>{data.text}</Text>
                  <Text numberOfLines={1} note>{data.note}</Text>
                </Body>
                <Right>
                  <Button transparent>
                    <Text>View</Text>
                  </Button>
                </Right>
              </ListItem>}
          />
        </Content>
      </Container>
    );
  }
}

export default ShopList;
