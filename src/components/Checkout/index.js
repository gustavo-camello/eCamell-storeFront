import React, { useState } from "react";
import { gql, useMutation } from "@apollo/client";
import { cartClient } from "lib/ApolloClient";
import { loadStripe } from "@stripe/stripe-js";
import {
  CardCvcElement,
  CardExpiryElement,
  CardNumberElement,
  Elements,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import nprogress from "nprogress";
import { useCart } from "hooks/useCart";
import { useCurrentUser } from "hooks/useCurrentUser";
import { useRouter } from "next/router";

const CREATE_ORDER_MUTATION = gql`
  mutation CreateOrderMutation(
    $total: Int!
    $customerId: String!
    $charge: String!
    $orderItems: [OrderItemCreateInput!]
  ) {
    createOrder(
      data: {
        total: $total
        customerId: $customerId
        charge: $charge
        items: { create: $orderItems }
      }
    ) {
      id
      total
      customerId
      items {
        productId
        price
        quantity
      }
    }
  }
`;

const CLEAN_CART_MUTATION = gql`
  mutation CLEAN_CART_MUTATION($ids: [ID!]) {
    deleteCartItems(ids: $ids) {
      id
    }
  }
`;

const stripeLib = loadStripe(process.env.NEXT_PUBLIC_STRIPE_KEY);

function CheckoutForm() {
  const [error, setError] = useState();
  const [loading, setLoading] = useState();
  const stripe = useStripe();
  const elements = useElements();

  const router = useRouter();

  const currentUser = useCurrentUser();
  const { cartProducts } = useCart(currentUser?.id);

  const orderTotal = cartProducts?.reduce(
    (acc = {}, item = {}) => {
      const itemTotal = parseFloat((item.price * item.quantity).toFixed(2));

      acc.subtotal = parseFloat((acc.subtotal + itemTotal).toFixed(2));
      acc.total = parseFloat((acc.total + itemTotal).toFixed(2));

      return acc;
    },
    {
      subtotal: 0,
      total: 0,
    }
  )?.total;

  const orderItems = cartProducts?.map((item) => {
    const orderItem = {
      productId: item.id,
      price: item.price,
      quantity: item.quantity,
    };
    return orderItem;
  });

  const [placeOrder, { data }] = useMutation(CREATE_ORDER_MUTATION, {
    variables: {
      total: orderTotal,
      customerId: currentUser?.id,
      charge: "PAID",
      orderItems: orderItems,
    },
    client: cartClient,
  });

  const itemsToBeRemoved = cartProducts?.map((product) => product.cartItemId);

  const [cleanCart] = useMutation(CLEAN_CART_MUTATION, {
    variables: {
      itemsIds: itemsToBeRemoved,
    },
    client: cartClient,
  });

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    nprogress.start();

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: elements.getElement(
        CardCvcElement,
        CardExpiryElement,
        CardNumberElement
      ),
    });

    if (error) {
      setError(error);
    }

    if (!error) {
      const order = await placeOrder();

      // TODO: clean the cart
      // await cleanCart();
      router.push({
        pathname: "/order/[id]",
        query: { id: order?.data?.createOrder?.id },
      });
    }

    setLoading(false);
    nprogress.done();
  }

  return (
    <form className="grid gap-1 p-4 border dark:border-gray-800 shadow-sm w-full mt-4 dark:text-white">
      <h6 className="text-xs">Enter your card details to place an order</h6>
      <div>
        <span className="text-xs">Card Number </span>
        <CardNumberElement />
      </div>

      <div className="grid grid-cols-2">
        <div>
          <span className="text-xs">Exp Date</span>
          <CardExpiryElement />
        </div>

        <div>
          <span className="text-xs">CVC</span>
          <CardCvcElement />
        </div>
      </div>

      <button
        onClick={handleSubmit}
        className="w-full text-2xl font-extralight text-white bg-green-500 py-3 px-6 mt-4 focus:outline-none hover:bg-green-600 rounded"
      >
        Place Order
      </button>

      {error && <p>{error.message}</p>}
    </form>
  );
}

function Checkout() {
  return (
    <Elements stripe={stripeLib}>
      <CheckoutForm />
    </Elements>
  );
}

export { Checkout };
