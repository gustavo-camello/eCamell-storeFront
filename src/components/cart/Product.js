import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMinus, faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";
import { gql, useMutation } from "@apollo/client";
import { DateTime } from "luxon";

import { cartClient } from "lib/ApolloClient";
import DisplayMoney from "components/DisplayMoney";

const UPDATE_QUANTITY = gql`
  mutation UPDATE_QUANTITY($id: ID!, $quantity: Int!) {
    updateCartItem(id: $id, data: { quantity: $quantity }) {
      id
      quantity
    }
  }
`;

const DELETE_FROM_CART = gql`
  mutation DELETE_FROM_CART($id: ID!) {
    deleteCartItem(id: $id) {
      id
    }
  }
`;

function Product({ productDetails, showButtons }) {
  const { name, price, quantity, cartItemId } = productDetails;
  const [quantityValue, setQuantityValue] = useState(quantity);

  const now = DateTime.now();
  const deliveryDate = now.plus({ days: 5 });

  const deliveryBy = deliveryDate.toLocaleString();

  const [updateQuantity] = useMutation(UPDATE_QUANTITY, {
    client: cartClient,
  });

  const [deleteFromCart, { loading }] = useMutation(DELETE_FROM_CART, {
    client: cartClient,
  });

  const minusOneItem = async () => {
    await updateQuantity({
      variables: {
        id: cartItemId,
        quantity: quantityValue - 1,
      },
    });

    setQuantityValue(quantityValue - 1);
  };

  const plusOneItem = async () => {
    await updateQuantity({
      variables: {
        id: cartItemId,
        quantity: quantityValue + 1,
      },
    });

    setQuantityValue(quantityValue + 1);
  };

  const removeFromCart = async () => {
    await deleteFromCart({
      variables: {
        id: cartItemId,
      },
      update: function (cache, payload) {
        cache.evict(cache.identify(payload.data.deleteCartItem));
      },
    });
  };

  return (
    <li className="flex flex-col sm:flex-row items-center py-4">
      <a className="flex-shrink-0 block">
        <img
          src={productDetails?.photo?.image?.publicUrlTransformed}
          alt="Product Image"
          className="object-cover w-48 h-48 md:w-24 md:h-24 rounded-lg mb-4 md:mb-0"
        />
      </a>

      <div className="sm:w-full sm:ml-8">
        <div className="sm:flex sm:justify-end">
          <div className=" md:w-2/3">
            <span className="block font-light text-left">{name}</span>
            <div className="mt-1 text-sm font-medium flex justify-start items-center">
              <span className="mr-2 -mt-0.5">{quantity} x </span>
              <span>
                {" "}
                <DisplayMoney amount={price} />
              </span>
              <p className="ml-4">
                {" "}
                - Total: <DisplayMoney amount={quantity * price} />
              </p>
            </div>
          </div>

          <div className="flex w-full items-center justify-center flex-1 mt-4 sm:justify-end sm:mt-0">
            <div className="flex space-x-1 justify-center items-center">
              {showButtons && (
                <button
                  onClick={minusOneItem}
                  type="button"
                  className="flex-shrink-0 px-2 text-gray-500 border border-white hover:border-gray-300 hover:bg-gray-200 rounded-lg"
                >
                  <FontAwesomeIcon icon={faMinus} />
                </button>
              )}

              {showButtons ? (
                <span
                  min="0"
                  className="w-8 px-2 text-center text-gray-500 border-none no-spinners"
                >
                  {quantityValue}
                </span>
              ) : (
                <div className="">
                  <div>
                    <h6>Delivery Expected by: </h6>
                    <p className="font-bold">{deliveryBy}</p>
                  </div>
                </div>
              )}

              {showButtons && (
                <button
                  onClick={plusOneItem}
                  type="button"
                  className="flex-shrink-0 px-2 text-gray-500 border border-white hover:border-gray-300 hover:bg-gray-200 rounded-lg"
                >
                  <FontAwesomeIcon icon={faPlus} />
                </button>
              )}
            </div>

            <div>
              {showButtons && (
                <button
                  type="button"
                  onClick={removeFromCart}
                  className="flex-shrink-0 px-2 py-1 ml-8 text-gray-600 hover:border-gray-300 hover:bg-gray-200 rounded-lg"
                >
                  <FontAwesomeIcon icon={faTrash} />
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </li>
  );
}

export default Product;
