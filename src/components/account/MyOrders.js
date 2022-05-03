import React from "react";
import { gql, useQuery, useMutation } from "@apollo/client";
import { cartClient } from "lib/ApolloClient";

import { useCurrentUser } from "hooks/useCurrentUser";
import { useOrderDetails } from "hooks/useOrderDetails";
import OrderRow from "./OrderRow";

const ALL_ORDERS_QUERY = gql`
  query ALL_ORDERS_QUERY($id: String!) {
    allOrders(where: { customerId: $id }) {
      id
    }
  }
`;

function MyOrders() {
  const currentUser = useCurrentUser();

  const { data } = useQuery(ALL_ORDERS_QUERY, {
    variables: {
      id: currentUser?.id,
    },
    client: cartClient,
    fetchPolicy: "network-only",
  });

  let orderIds;
  if (data) {
    orderIds = data.allOrders;
  }

  return (
    <div className="mt-20 dark:text-white">
      <table className="w-full overflow-hidden">
        <thead>
          <tr className="text-left">
            <th className="p-4">Order Number</th>
            <th>Payment Method</th>
            <th>Total</th>
            <th>Status</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {orderIds?.map((order) => (
            <OrderRow key={order.id} orderId={order.id} />
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default MyOrders;
