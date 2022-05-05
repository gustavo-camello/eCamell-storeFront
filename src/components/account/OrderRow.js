import React, { useState } from "react";

import { useOrderDetails } from "hooks/useOrderDetails";
import DisplayMoney from "components/DisplayMoney";
import SingleOrder from "components/order/SingleOrder";

function OrderRow({ orderId }) {
  const { orderDetails } = useOrderDetails(orderId);

  const [showOrder, setShowOrder] = useState(false);

  return (
    <>
      <tr className="border-b">
        <td className="p-4">
          {" "}
          <span className="bg-gray-100 p-2 rounded-lg dark:text-black">
            # {orderDetails?.id}
          </span>
        </td>
        <td>Credit Card</td>
        <td>
          {" "}
          <DisplayMoney amount={orderDetails?.total} />
        </td>
        <td>Sent</td>
        <td>
          <button
            onClick={() => setShowOrder(!showOrder)}
            className="flex text-white bg-green-500 border-0 py-2 px-6 focus:outline-none hover:bg-green-600 rounded"
          >
            See Order
          </button>
        </td>
      </tr>

      {showOrder && (
        <tr>
          <td colSpan={5}>
            <div className="flex justify-center items-center">
              <div>
                <SingleOrder id={orderId} fromList />
              </div>
            </div>
          </td>
        </tr>
      )}
    </>
  );
}

export default OrderRow;
