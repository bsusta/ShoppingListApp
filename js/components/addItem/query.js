import gql from 'graphql-tag';

export const shops = gql`
  query allShops {
       allShops (orderBy: name_ASC) {
		id
		key:id
		name
		color
	 }
  }
`;

export const shopsSubscription = gql`
	subscription {
		Shop(filter: {mutation_in: [CREATED,UPDATED,DELETED]}) {
			mutation
			node {
				id
				key:id
				name
			}
		}
	}
`;

export const createItem = gql`
	mutation createItem($name: String!,$priceQuantity: Float!,$note: String,$quantity: Int!,$shopId:ID) {
		createItem(
      name:$name
      priceQuantity: $priceQuantity
      quantity: $quantity
      note: $note
			shopId:$shopId
		) {
			id
		}
	}
`;
