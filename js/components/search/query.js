import gql from 'graphql-tag';

export const itemFilter = gql`
query allItems ($filter:String) {
     allItems (
       orderBy: createdAt_DESC
       filter: {
         name_contains:$filter
        }
     ) {
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
  }
 }
}
`;

export const itemsAll = gql`
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
    shops{
      id
      name
    }
	 }
  }
`;

export const updateItemDone = gql`
	mutation updateItem($id: ID!,$done:Boolean!) {
		updateItem(
			id:$id
			done:$done
		)
    {
			done
		}
	}
`;

export const itemsSubscription = gql`
	subscription {
		Item(filter: {mutation_in: [CREATED,UPDATED,DELETED]}) {
			mutation
			node {
        id
    		key:id
    		createdAt
        shops{
          id
          name
        }
    		done
    		name
    		note
    		priceQuantity
    		quantity
			}
      previousValues{
        id
      }
		}
	}
`;
