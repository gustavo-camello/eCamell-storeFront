import React from "react";
import { gql, useMutation } from "@apollo/client";
import { useRouter } from "next/router";

import { cartClient } from "lib/ApolloClient";
import { useCurrentUser } from "hooks/useCurrentUser";
import { useCart } from "hooks/useCart";

const ADD_TO_CART_MUTATION = gql`
  mutation ADD_TO_CART_MUTATION(
    $productId: String!
    $cartId: String!
    $cart: ID!
  ) {
    createCartItem(
      data: {
        productId: $productId
        cartId: $cartId
        quantity: 1
        cart: { connect: { id: $cart } }
      }
    ) {
      id
      cartId
    }
  }
`;

function AddToCart({ productId }) {
  const router = useRouter();
  const currentUser = useCurrentUser();

  const { cartId } = useCart(currentUser?.id);

  const [addToCart] = useMutation(ADD_TO_CART_MUTATION, {
    client: cartClient,
  });

  const addToCartAction = async () => {
    await addToCart({
      variables: {
        productId,
        cartId: cartId,
        cart: cartId,
      },
    });

    router.push("/cart");
  };

  return (
    <button
      onClick={addToCartAction}
      className="flex ml-auto text-white bg-green-500 border-0 py-2 px-6 focus:outline-none hover:bg-green-600 rounded"
    >
      Add To Cart
    </button>
  );
}

export default AddToCart;
