import React from "react";
import { useQuery, gql } from "@apollo/client";

// export const CURRENT_USER_QUERY = gql`
//   query {
//     authenticatedItem {
//       ... on User {
//         name
//         email
//       }
//     }
//   }
// `;

// export function useCurrentUser() {
//   const { data } = useQuery(CURRENT_USER_QUERY);
//   return data?.authenticatedItem;
// }

// TODO: Need to proper set the currentUser

export const CURRENT_USER_QUERY = gql`
  query CURRENT_USER_QUERY($id: ID!) {
    User(where: { id: $id }) {
      name
      id
      email
    }
  }
`;

export function useCurrentUser() {
  let currentUserId;
  // if (typeof window !== "undefined") {
  //   currentUserId = localStorage.getItem("userId");
  //   // console.log(currentUserId);
  // }
  currentUserId = window.localStorage.getItem("userId");

  const { data } = useQuery(CURRENT_USER_QUERY, {
    variables: { id: "6210ea9b222c85378c600781" },
  });

  let user;
  if (data) {
    // console.log(data);
    user = data?.User;
  }

  return user;
}
