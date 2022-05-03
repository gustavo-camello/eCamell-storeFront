import { gql, useQuery } from "@apollo/client";
import { cartClient, productsClient } from "lib/ApolloClient";

const GET_ORDER_DETAILS = gql`
  query getOrderDetails($id: ID!) {
    Order(where: { id: $id }) {
      total
      id
      items {
        productId
        quantity
        price
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

export function useOrderDetails(id) {
  const { data: orderData } = useQuery(GET_ORDER_DETAILS, {
    variables: {
      id,
    },
    client: cartClient,
    fetchPolicy: "network-only",
  });

  const orderDetails = orderData?.Order;
  const orderItems = orderDetails?.items;

  const orderItemsID = orderItems?.map((item) => item.productId);

  const { data } = useQuery(GET_PRODUCTS_DETAILS, {
    variables: {
      ids: orderItemsID,
    },
    client: productsClient,
  });

  const orderProducts = data?.allProducts.map((item) => {
    const quantity = orderItems.find((p) => p.productId === item.id)?.quantity;

    const newItem = { ...item };
    newItem.quantity = quantity;

    return newItem;
  });

  return { orderDetails, orderProducts };
}
