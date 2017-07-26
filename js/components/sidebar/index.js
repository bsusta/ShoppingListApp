import React, { Component } from "react";
import { Image } from "react-native";

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


const datas = [
  {
    name: 'Kaufland',
    route: 'filter',
    icon: 'ios-color-filter-outline',
    bg: '#477EEA',
    types: '8',
  },
  {
    name: 'TESCO',
    route: 'folder',
    icon: 'ios-color-filter-outline',
    bg: '#477EEA',
    types: '8',
  },
  {
    name: 'LEKAREN',
    route: 'folder',
    icon: 'ios-color-filter-outline',
    bg: '#477EEA',
    types: '8',
  },
  {
    name: 'LIDL',
    route: 'folder',
    icon: 'ios-color-filter-outline',
    bg: '#477EEA',
    types: '8',
  },
];

class SideBar extends Component {
	constructor(props) {
		super(props);
		this.state = {
			shadowOffsetWidth: 1,
			shadowRadius: 4,
		};
	}

	render() {
		return (
			<Container>
				<Header>
					<Body>
						<Title>Shops list</Title>
					</Body>
					<Right>
						<Button transparent onPress={() => this.props.navigation.navigate('SettingsList')}>
								<Icon name="settings" />
							</Button>
					</Right>

				</Header>

				<Content bounces={false} style={{ flex: 1, backgroundColor: "#fff", top: -1 }}>
					<List
						dataArray={datas}
						renderRow={data =>
							<ListItem button noBorder onPress={() => this.props.navigation.navigate(data.route)}>
								<Left>
									<Icon active name={data.icon} style={{ color: "#777", fontSize: 26, width: 30 }} />
									<Text style={styles.text}>
										{data.name}
									</Text>
								</Left>
								{data.types &&
									<Right style={{ flex: 1 }}>
										<Badge
											style={{
												borderRadius: 3,
												height: 25,
												width: 72,
												backgroundColor: data.bg,
											}}
										>
											<Text style={styles.badgeText}>{data.types}</Text>
										</Badge>
									</Right>}
							</ListItem>}
					/>
					<Separator bordered>
						<Text>Settings</Text>
					</Separator>
					<ListItem  icon button onPress={() => this.props.navigation.navigate('ShopsList')}>
						<Left>
							<Icon name="barcode" />
						</Left>
						<Body>
							<Text>Shops</Text>
						</Body>
						<Right>
							<Icon name="arrow-forward" />
						</Right>
					</ListItem>
					<ListItem icon button onPress={() => this.props.navigation.navigate('UsersList')}>
						<Left>
							<Icon name="person" />
						</Left>
						<Body>
							<Text>Users</Text>
						</Body>
						<Right>
							<Icon name="arrow-forward" />
						</Right>
					</ListItem>
				</Content>
			</Container>
		);
	}
}

export default SideBar;
