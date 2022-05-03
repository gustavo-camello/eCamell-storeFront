import React from "react";
import { gql, useQuery } from "@apollo/client";

import ProductsList from "components/products/ProductsList";
import { productsClient } from "lib/ApolloClient";

const ALL_PRODUCTS_FROM_CATEGORY = gql`
  query ALL_PRODUCTS_FROM_CATEGORY($name: String!) {
    allProducts(where: { category_some: { name: $name } }) {
      id
      name
      price
      description
      category {
        name
      }
      photo {
        image {
          publicUrlTransformed
        }
      }
    }
  }
`;

function CategoryProductsPage({ query }) {
  const { data, loading, error } = useQuery(ALL_PRODUCTS_FROM_CATEGORY, {
    client: productsClient,
    variables: {
      name: query.name,
    },
  });

  let products;
  if (data) {
    products = data?.allProducts;
  }

  return (
    <div className="container mx-auto px-4 md:px-20">
      <section>
        <h2 className="text-2xl mt-8 dark:text-white">{query.name}</h2>
        <ProductsList products={products} />
      </section>
    </div>
  );
}

export default CategoryProductsPage;
