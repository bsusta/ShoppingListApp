import gql from 'graphql-tag';

export const updateUser = gql`
	mutation updateUser($userName: String!,$id: ID!) {
    updateUser(
      id: $id,
      userName:$userName,
    ) {
      id
      }
  }
`;

export const deleteUser = gql`
	mutation deleteUser($id: ID!) {
    deleteUser(
      id: $id
    ) {
      id
      }
  }
`;
