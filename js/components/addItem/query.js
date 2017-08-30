import gql from 'graphql-tag';

export const shops = gql`
  query allShops {
       allShops (orderBy: name_ASC) {
		id
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
				name
			}
		}
	}
`;

export const createItem = gql`
	mutation createItem($name: String!,$priceQuantity: Float!,$note: String,$quantity: Int!,$shopsIds:[ID!],$assignedId:ID) {
		createItem(
      name:$name
      priceQuantity: $priceQuantity
      quantity: $quantity
      note: $note
			shopsIds:$shopsIds
      assignedId:$assignedId
		) {
			id
		}
	}
`;
export const users = gql`
  query allUsers {
       allUsers (orderBy: userName_ASC) {
		id
		key:id
    email
    userName
	 }
  }
`;
