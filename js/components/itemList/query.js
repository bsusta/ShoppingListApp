import gql from 'graphql-tag';
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
      color
    }
	 }
  }
`;

export const deleteItem = gql`
	mutation deleteItem($id: ID!) {
		deleteItem(
			id:$id
		)
    {
    id
	}
	}
`;


export const filteredItems = gql`
  query allItems($id:ID!) {
       allItems (
         orderBy: createdAt_DESC
         filter:{
           shops:{
             id:$id
           }
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
      color
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
          color
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
