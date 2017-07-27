import gql from 'graphql-tag';
export const items = gql`
  query allItems {
       allItems (orderBy: createdAt_DESC) {
		id
		key:id
		createdAt
		done
		name
		note
		priceQuantity
		quantity
	 }
  }
`;
export const updateItem = gql`
	mutation updateItem($id: ID!,$done:Boolean!) {
		updateItem(
			id:$id
			done:$done
		) {
			id
		}
	}
`;