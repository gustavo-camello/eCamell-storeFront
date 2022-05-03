import React from "react";
import SingleOrder from "components/order/SingleOrder";

function SingleOrderPage({ query }) {
  return <SingleOrder id={query.id} />;
}

export default SingleOrderPage;
