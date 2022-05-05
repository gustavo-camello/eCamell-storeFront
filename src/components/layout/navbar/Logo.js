import React from "react";
import { gql, useQuery } from "@apollo/client";

import { productsClient } from "lib/ApolloClient";

const STOREFRONT_DETAILS = gql`
  query {
    allStorefronts {
      mainBanner {
        publicUrlTransformed
      }
      storeName
    }
  }
`;

function Logo() {
  const { data: storefront } = useQuery(STOREFRONT_DETAILS, {
    client: productsClient,
  });

  let storeName;
  if (storefront) {
    storeName = storefront.allStorefronts[0].storeName;
  }

  return (
    <div className="text-yellow-700 text-2xl border-b-2 border-yellow-700">
      {storeName}
    </div>
  );
}

export default Logo;
