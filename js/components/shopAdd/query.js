import gql from 'graphql-tag';

export const createShop = gql`
    mutation createShop($name: String!,$color: String!) {
        createShop(
          name:$name
          color: $color
        ) 
        {
        id
        }
    }
`;
