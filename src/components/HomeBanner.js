import React from "react";
import { gql, useQuery } from "@apollo/client";

import { productsClient } from "lib/ApolloClient";

const STOREFRONT_DETAILS = gql`
  query {
    allStorefronts {
      mainBanner {
        publicUrlTransformed
      }
    }
  }
`;

function HomeBanner() {
  const { data: storefront } = useQuery(STOREFRONT_DETAILS, {
    client: productsClient,
  });

  let mainBanner;
  if (storefront) {
    mainBanner = storefront.allStorefronts[0].mainBanner?.publicUrlTransformed;
  }

  return (
    <div className="w-full h-96">
      <img
        src={mainBanner}
        className="object-fit w-full h-96"
        alt="Image alt text"
      />
    </div>
  );
}

export default HomeBanner;
