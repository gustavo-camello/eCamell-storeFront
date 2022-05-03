import React, { useState } from "react";
import { gql, useQuery } from "@apollo/client";
import { Rating } from "react-simple-star-rating";

const GET_CUSTOMER_NAME = gql`
  query CUSTOMER_NAME($id: ID!) {
    Customer(where: { id: $id }) {
      firstName
      lastName
    }
  }
`;

function ProductReview({ review }) {
  const { data } = useQuery(GET_CUSTOMER_NAME, {
    variables: {
      id: review?.customerId,
    },
  });

  let fullName;
  if (data) {
    const firstName = data.Customer.firstName;
    const lastName = data.Customer.lastName || "";

    fullName = `${firstName} ${lastName}`;
  }

  return (
    <div className="pointer-events-none p-4 w-2/3 md:w-1/2 border-b border-t">
      <p className="font-semibold">{fullName}</p>
      <Rating
        initialValue={review?.rating}
        size={20}
        transition
        allowHalfIcon
        className="mt-0 cursor-pointer"
      />
      <p className="mt-2">{review?.review}</p>
    </div>
  );
}

export default ProductReview;
