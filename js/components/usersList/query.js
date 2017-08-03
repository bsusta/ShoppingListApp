import gql from 'graphql-tag';

export const users = gql`
  query allUsers {
       allUsers (orderBy: email_ASC) {
		id
		key:id
    email
    userName
	 }
  }
`;
export const usersSubscription = gql`
	subscription {
		User(filter: {mutation_in: [CREATED,UPDATED,DELETED]}) {
			mutation
			node {
        id
    		userName
        email
  		}
    }
	}
`;
