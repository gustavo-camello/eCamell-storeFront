/* eslint-disable @next/next/no-img-element */
import React from "react";
import { gql, useQuery } from "@apollo/client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExclamation, faFire } from "@fortawesome/free-solid-svg-icons";

import HomeBanner from "../components/HomeBanner";
import ProductsList from "components/products/ProductsList";
import { productsClient } from "lib/ApolloClient";

const ALL_PRODUCTS_QUERY = gql`
  query ALL_PRODUCTS_QUERY {
    allProducts {
      id
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

function index() {
  const { data, loading, error } = useQuery(ALL_PRODUCTS_QUERY, {
    client: productsClient,
  });

  let products;
  if (data) {
    products = data?.allProducts;
  }

  return (
    <>
      <HomeBanner />
      <div className="container mx-auto px-4 md:px-20">
        <section>
          <h2 className="text-2xl mt-8 dark:text-white">
            <FontAwesomeIcon icon={faExclamation} className="mr-2" />
            New Products and Releases
          </h2>
          <ProductsList products={products?.slice(0, 4)} />
        </section>

        <section>
          <h2 className="text-2xl mt-8 dark:text-white">
            <FontAwesomeIcon icon={faFire} className="mr-2" />
            Featured Products
          </h2>
          <ProductsList products={products} />
        </section>
      </div>
    </>
  );
}

export default index;
