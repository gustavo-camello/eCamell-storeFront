import React from "react";
import { gql, useQuery } from "@apollo/client";

import { productsClient } from "lib/ApolloClient";
import { useCurrentUser } from "hooks/useCurrentUser";
import Product from "./Product";

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

const GET_PRODUCTS_DETAILS = gql`
  query getProductsDetails($ids: [ID]!) {
    allProducts(where: { id_in: $ids }) {
      name
      price
      id
      photo {
        image {
          publicUrlTransformed
        }
      }
    }
  }
`;

function WishList() {
  const currentUser = useCurrentUser();

  const { data: dataWishList } = useQuery(GET_CUSTOMER_WISHLIST, {
    variables: {
      customerId: currentUser?.id,
    },
    client: productsClient,
    fetchPolicy: "network-only",
  });

  const wishListItemsId = dataWishList?.allWishLists[0]?.wishListItems.map(
    (item) => item.productId
  );

  const { data } = useQuery(GET_PRODUCTS_DETAILS, {
    variables: {
      ids: wishListItemsId,
    },
    client: productsClient,
  });

  const wishListProducts = data?.allProducts.map((item) => {
    return item;
  });

  return (
    <div className="text-gray-700 body-font overflow-hidden">
      <div className="container mx-auto px-4 md:px-20">
        <h2 className="text-2xl mt-8 text-black dark:text-white uppercase">
          WishList
        </h2>
      </div>
      <div className="container px-20 py-10 mx-auto">
        <ul className="-my-4 divide-y divide-gray-100">
          {wishListProducts?.map((item) => (
            <Product productDetails={item} />
          ))}
        </ul>
      </div>
    </div>
  );
}

export default WishList;
