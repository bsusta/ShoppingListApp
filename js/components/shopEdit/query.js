import gql from 'graphql-tag';


export const updateShop = gql`
	mutation updateShop($name: String!,$color: String!,$id: ID!) {
    updateShop(
      id: $id,
      name:$name,
      color: $color,
    ) {
      id
      }
  }
`;

export const deleteShop = gql`
	mutation deleteShop($id: ID!) {
    deleteShop(
      id: $id
    ) {
      id
      }
  }
`;