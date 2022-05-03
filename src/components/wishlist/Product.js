import React from "react";
import Link from "next/link";

import DisplayMoney from "components/DisplayMoney";
import AddToCart from "components/product/AddToCart";

function Product({ productDetails }) {
  const { name, price, id } = productDetails;
  const showButtons = true;

  return (
    <Link href={`/product/${id}`} className="cursor-pointer">
      <li className="flex flex-col sm:flex-row items-center py-4 cursor-pointer dark:text-white">
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
              <span className="block font-light text-left hover:font-semibold">
                {name}
              </span>
              <div className="mt-1 text-sm font-medium flex justify-start items-center text-yellow-600">
                <span>
                  {" "}
                  <DisplayMoney amount={price} />
                </span>
              </div>
            </div>

            <div className="flex w-full items-center justify-center flex-1 mt-4 sm:justify-end sm:mt-0">
              <div className="flex space-x-1 justify-center items-center">
                {showButtons && <AddToCart productId={id} />}
              </div>

              <div>
                {showButtons && (
                  <button
                    type="button"
                    className="flex-shrink-0 px-2 py-1 ml-8 text-gray-600 hover:border-gray-300 hover:bg-gray-200 rounded-lg"
                  ></button>
                )}
              </div>
            </div>
          </div>
        </div>
      </li>
    </Link>
  );
}

export default Product;
