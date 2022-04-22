import { gql, useQuery } from "@apollo/client";
import { cartClient, productsClient } from "lib/ApolloClient";

const GET_CUSTOMER_CART = gql`
  query getCustomerCart($customerId: String!) {
    allCarts(where: { customerId: $customerId }) {
      id
      customerId
      cartItems {
        id
        productId
        quantity
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

export function useCart(customerId) {
  const { data: dataCart } = useQuery(GET_CUSTOMER_CART, {
    variables: {
      customerId,
    },
    client: cartClient,
    fetchPolicy: "network-only",
  });

  const cartId = dataCart?.allCarts[0]?.id;
  const cartItems = dataCart?.allCarts[0]?.cartItems;

  const cartItemsID = dataCart?.allCarts[0]?.cartItems.map(
    (item) => item.productId
  );

  const { data } = useQuery(GET_PRODUCTS_DETAILS, {
    variables: {
      ids: cartItemsID,
    },
    client: productsClient,
  });

  const cartProducts = data?.allProducts.map((item) => {
    const quantity = cartItems.find((p) => p.productId === item.id)?.quantity;
    const cartItemId = cartItems.find((p) => p.productId === item.id)?.id;

    const newItem = { ...item };
    newItem.quantity = quantity;
    newItem.cartItemId = cartItemId;

    return newItem;
  });

  return { cartProducts, cartId };
}
