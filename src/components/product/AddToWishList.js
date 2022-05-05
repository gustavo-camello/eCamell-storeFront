import React from "react";
import { gql, useMutation, useQuery } from "@apollo/client";
import { useRouter } from "next/router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";

import { productsClient } from "lib/ApolloClient";
import { useCurrentUser } from "hooks/useCurrentUser";

const ADD_TO_WISHLIST_MUTATION = gql`
  mutation ADD_TO_WISHLIST_MUTATION(
    $productId: String!
    $wishListId: String!
    $wishList: ID!
  ) {
    createWishListItem(
      data: {
        productId: $productId
        wishListId: $wishListId
        wishList: { connect: { id: $wishList } }
      }
    ) {
      id
    }
  }
`;

const GET_CUSTOMER_WISHLIST = gql`
  query getCustomerWishlist($customerId: String!) {
    allWishLists(where: { customerId: $customerId }) {
      id
      wishListItems {
        id
        productId
      }
    }
  }
`;

function AddToWishList({ productId }) {
  const router = useRouter();
  const currentUser = useCurrentUser();

  const { data } = useQuery(GET_CUSTOMER_WISHLIST, {
    variables: {
      customerId: currentUser?.id,
    },
    client: productsClient,
    fetchPolicy: "network-only",
  });

  let wishListId;
  if (data) {
    wishListId = data.allWishLists[0]?.id;
  }

  const [AddToWishList] = useMutation(ADD_TO_WISHLIST_MUTATION, {
    client: productsClient,
  });

  const AddToWishListAction = async () => {
    await AddToWishList({
      variables: {
        productId,
        wishListId: wishListId,
        wishList: wishListId,
      },
    });

    router.push("/wishList");
  };

  return (
    <button
      onClick={AddToWishListAction}
      className="rounded-full w-10 h-10 bg-gray-200 p-0 border-0 inline-flex items-center justify-center text-gray-500 ml-4"
    >
      <FontAwesomeIcon icon={faHeart} />
    </button>
  );
}

export default AddToWishList;
