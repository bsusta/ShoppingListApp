import gql from 'graphql-tag';
export const allItems = gql`
  query allItems {
       allItems (
         orderBy: createdAt_DESC
       ) {
		id
		key:id
		createdAt
		done
		name
		note
    assigned{
      id
      userName
      email
    }
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

export const allItemsFiltered = gql`
  query allItems($done:Boolean!) {
       allItems (
         orderBy: createdAt_DESC
         filter:{done:$done}
       ) {
		id
		key:id
		createdAt
		done
		name
		note
    assigned{
      id
      userName
      email
    }
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

export const allItemsFilteredNotDone = gql`
  query allItems {
       allItems (
         orderBy: createdAt_DESC
         filter:{done:false}
       ) {
		id
		key:id
		createdAt
		done
    assigned{
      id
      userName
      email
    }
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


export const allItemsFilteredDone = gql`
  query allItems {
       allItems (
         orderBy: createdAt_DESC
         filter:{done:true}
       ) {
		id
		key:id
		createdAt
		done
    assigned{
      id
      userName
      email
    }
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


export const shopItems = gql`
  query allShops($id:ID!) {
       allShops (
         filter:{id:$id})
         {
         items{
           id
           key:id
           createdAt
           done
           name
           assigned{
             id
             userName
             email
           }
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
        assigned{
          id
          userName
          email
        }
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
