import gql from 'graphql-tag';

export const loginUser = gql`
	mutation ($email: String!, $password: String!) {
		signinUser(email: {email: $email, password: $password}) {
		  token
			user {
			  id
			  email
			}
		}
	}
`;

export const getMe = gql`
  query Me {
    user {
      id
      email
    }
  }
`;
