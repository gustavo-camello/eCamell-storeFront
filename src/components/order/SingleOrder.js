import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTruck, faCreditCard } from "@fortawesome/free-solid-svg-icons";

import ProductsList from "components/Cart/ProductsList";
import { useOrderDetails } from "hooks/useOrderDetails";
import { useCurrentUser } from "hooks/useCurrentUser";
import DisplayMoney from "components/DisplayMoney";

function SingleOrder({ id }) {
  const { orderDetails, orderProducts } = useOrderDetails(id);
  const currentUser = useCurrentUser();

  const items = orderProducts;

  return (
    <div className="text-gray-700 body-font overflow-hidden dark:text-white">
      <div className="container px-5 py-24 mx-auto">
        <div className="text-center">
          <h1 className="font-bold text-4xl">Order Succesfully Placed</h1>
          <p className="text-xl">Thank you for your order</p>
          <h6 className="mt-4">Order Number: # {orderDetails?.id}</h6>
          <ProductsList cartItems={items} />

          <div className="flex flex-wrap flex-col md:flex-row justify-evenly w-full border border-gray-100 bg-gray-50 px-4 py-10 dark:text-gray-700">
            <div className="text-left my-4 md:my-0">
              <FontAwesomeIcon icon={faTruck} className="text-xl" />
              <p className="font-bold my-2">Delivery Address:</p>
              <p>{currentUser?.address}</p>
            </div>
            <div className="text-left my-4 md:my-0">
              <FontAwesomeIcon icon={faCreditCard} className="text-xl" />
              <p className="font-bold my-2">Payment method</p>
              <p>Credit Card</p>
            </div>
            <div className="font-bold flex flex-col items-start md:justify-center md:items-center my-4 md:my-0">
              <p className="mb-4">Total Price:</p>
              <p>
                {" "}
                <DisplayMoney amount={orderDetails?.total} />
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SingleOrder;
