import gql from 'graphql-tag';

export const shops = gql`
  query allShops {
       allShops (orderBy: name_ASC) {
		id
		name
		color
    items{
      id
    }
	 }
  }
`;
export const itemsSubscription = gql`
	subscription {
		Item(filter: {mutation_in: [CREATED,UPDATED,DELETED]}) {
			mutation
			node {
        id
    		createdAt
        shops{
          id
          name
          color
          key:id
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
export const shopsSubscription = gql`
	subscription {
		Shop(filter: {mutation_in: [CREATED,UPDATED,DELETED]}) {
			mutation
			node {
				id
				name
				color
        items{
          id
        }
			}
		}
	}
`;
export const getMe = gql`
  query Logout  {
    user {
      id
      email
    }
  }
`;
