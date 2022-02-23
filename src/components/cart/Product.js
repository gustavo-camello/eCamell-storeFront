import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMinus, faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";

function Product() {
  return (
    <li className="flex items-center py-4">
      <a href="" className="flex-shrink-0 block">
        <img
          src="https://images.unsplash.com/photo-1600080972464-8e5f35f63d08?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=668&q=80"
          alt=""
          className="object-cover w-24 h-24 rounded-lg"
        />
      </a>

      <div className="w-full ml-8">
        <div className="sm:flex sm:justify-end">
          <div>
            <a href="" className="block font-medium">
              Amazing Controller
            </a>

            <p className="mt-1 text-sm text-gray-500">
              White Edition &middot; $49.99
            </p>
          </div>

          <div className="flex items-center flex-1 mt-4 sm:justify-end sm:mt-0">
            <div className="flex space-x-1">
              <button
                type="button"
                className="flex-shrink-0 px-2 text-gray-500 border border-white hover:border-gray-200 rounded-lg"
              >
                <FontAwesomeIcon icon={faMinus} />
              </button>

              <input
                type="number"
                value="1"
                min="0"
                className="w-12 px-2 text-center text-gray-500 border-none no-spinners"
              />

              <button
                type="button"
                className="flex-shrink-0 px-2 text-gray-500 border border-white hover:border-gray-200 rounded-lg"
              >
                <FontAwesomeIcon icon={faPlus} />
              </button>
            </div>

            <a
              href=""
              className="flex-shrink-0 px-2 py-1 ml-8 text-gray-600 hover:bg-gray-100 rounded-lg"
            >
              <FontAwesomeIcon icon={faTrash} />
            </a>
          </div>
        </div>
      </div>
    </li>
  );
}

export default Product;
