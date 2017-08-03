import gql from 'graphql-tag';

export const shops = gql`
  query allShops {
       allShops (orderBy: name_ASC) {
		id
		key:id
		name
	 }
  }
`;

export const updateItem = gql`
	mutation updateItem($name: String!,$priceQuantity: Float!,$note: String,$quantity: Int!,$id: ID!, $shopId:ID) {
    updateItem(
      id: $id,
      name:$name,
      priceQuantity: $priceQuantity,
      quantity: $quantity,
      note: $note,
			shopId:$shopId
    ) {
      id
      }
  }
`;
export const deleteItem = gql`
	mutation ($id: ID!) {
		deleteItem(
			id: $id,
		){
			id
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