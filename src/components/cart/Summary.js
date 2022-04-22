import React from "react";

import DisplayMoney from "components/DisplayMoney";

function Summary({ cartProducts }) {
  const cart = cartProducts?.reduce(
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
  );

  return (
    <div className="flex flex-col w-full items-center justify-center text-black">
      <h4 className="py-8 flex justify-center items-center text-xl font-bold">
        Summary
      </h4>
      <div className="bg-gray-200 w-full flex justify-around items-center text-xl p-4">
        Total
        <DisplayMoney amount={cart?.total} />
      </div>
      <button className="w-full text-2xl font-extralight text-white bg-green-500 py-3 px-6 mt-8 focus:outline-none hover:bg-green-600 rounded">
        Place Order
      </button>
    </div>
  );
}

export default Summary;
