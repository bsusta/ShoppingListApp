import gql from 'graphql-tag';
export const createUser = gql`
	mutation createUser($userName:String!, $authProvider: AuthProviderSignupData! ) {
		createUser(
			authProvider:$authProvider
			userName:$userName
		) {
			id
		}
	}
`;
