import gql from 'graphql-tag';

export const shops = gql`
  query allShops {
       allShops (orderBy: name_ASC) {
		id
		key:id
		name
    items{
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
				key:id
				name
        items{
          id
        }
			}
		}
	}
`;
