import React from "react";
import { gql, useQuery } from "@apollo/client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import {
  faFacebookF,
  faTwitter,
  faInstagram,
} from "@fortawesome/free-brands-svg-icons";

import StarRating from "components/StartRating";
import { formatMoney } from "lib/FormatMoney";
import Loading from "components/Loading";
import { productsClient } from "lib/ApolloClient";

const SINGLE_ITEM_QUERY = gql`
  query SINGLE_ITEM_QUERY($id: ID!) {
    Product(where: { id: $id }) {
      name
      price
      description
      photo {
        image {
          publicUrlTransformed
        }
      }
    }
  }
`;

function SingleProduct({ id }) {
  const { data, loading, error } = useQuery(SINGLE_ITEM_QUERY, {
    variables: {
      id,
    },
    client: productsClient,
  });

  let product;
  if (data) {
    product = data?.Product;
    console.log({ data, loading });
  }

  if (loading) return <Loading />;

  return (
    <div className="text-gray-700 body-font overflow-hidden">
      <div className="container px-5 py-24 mx-auto">
        <div className="lg:w-4/5 mx-auto flex flex-wrap">
          <img
            alt="ecommerce"
            className="lg:w-1/2 w-full object-cover object-center rounded border border-gray-200"
            src={product?.photo?.image?.publicUrlTransformed}
          />
          <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
            <h2 className="text-sm title-font text-gray-500 tracking-widest dark:text-gray-500">
              Category Name
            </h2>
            <h1 className="text-gray-900 text-3xl title-font font-medium mb-1 dark:text-white">
              {product?.name}
            </h1>
            <div className="flex mb-4">
              <span className="flex items-center">
                <StarRating rating={4} />
                <span className="text-gray-600 ml-3 dark:text-gray-400">
                  4 Reviews
                </span>
              </span>
              <span className="flex ml-3 pl-3 py-2 border-l-2 border-gray-200">
                <a className="text-gray-500 dark:text-gray-300">
                  <FontAwesomeIcon icon={faFacebookF} className="mr-2" />
                </a>
                <a className="ml-2 text-gray-500 dark:text-gray-300">
                  <FontAwesomeIcon icon={faTwitter} className="mr-2" />
                </a>
                <a className="ml-2 text-gray-500 dark:text-gray-300">
                  <FontAwesomeIcon icon={faInstagram} className="mr-2" />
                </a>
              </span>
            </div>
            <p className="leading-relaxed dark:text-white">
              {product?.description}
            </p>
            <div className="flex mt-5 border-t pt-5">
              <span className="title-font font-medium text-2xl text-gray-900 dark:text-yellow-500">
                {formatMoney(product?.price)}
              </span>
              <button className="flex ml-auto text-white bg-green-500 border-0 py-2 px-6 focus:outline-none hover:bg-green-600 rounded">
                Add To Cart
              </button>
              <button className="rounded-full w-10 h-10 bg-gray-200 p-0 border-0 inline-flex items-center justify-center text-gray-500 ml-4">
                <FontAwesomeIcon icon={faHeart} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SingleProduct;
