import { gql, useQuery } from "@apollo/client";

export const CURRENT_USER_QUERY = gql`
  query {
    authenticatedItem {
      ... on Customer {
        id
        email
        firstName
        lastName
        address
      }
    }
  }
`;

export function useCurrentUser() {
  const { data } = useQuery(CURRENT_USER_QUERY);
  return data?.authenticatedItem;
}
