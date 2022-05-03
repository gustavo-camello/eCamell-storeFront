import React, { useState } from "react";
import { gql, useQuery } from "@apollo/client";

import ProductReview from "./ProductReview";
import { productsClient } from "lib/ApolloClient";
import { useCurrentUser } from "hooks/useCurrentUser";
import ReviewForm from "./ReviewForm";

export const GET_PRODUCT_REVIEWS = gql`
  query PRODUCT_REVIEWS($id: ID!) {
    Product(where: { id: $id }) {
      reviews {
        id
        review
        rating
        customerId
      }
    }
  }
`;

function Reviews({ id }) {
  const currentUser = useCurrentUser();
  const [showForm, setShowForm] = useState(false);

  const { data } = useQuery(GET_PRODUCT_REVIEWS, {
    variables: {
      id,
    },
    client: productsClient,
  });

  let reviews;
  if (data) {
    reviews = data.Product.reviews;
  }

  return (
    <div className="text-gray-700 bg-gray-50 dark:text-white dark:bg-gray-800 body-font overflow-hidden">
      <div className="container mx-auto py-10">
        <div className="flex flex-col justify-center items-center">
          <h6 className="font-bold text-2xl mb-5">Product Reviews</h6>
          {currentUser && (
            <>
              <div>
                <button
                  onClick={() => setShowForm(!showForm)}
                  className="flex text-white bg-green-500 border-0 py-2 mb-8 px-6 focus:outline-none hover:bg-green-600 rounded"
                >
                  {showForm ? "Cancel" : "Leave a Review"}
                </button>
              </div>
              {showForm && (
                <ReviewForm
                  customerId={currentUser?.id}
                  productId={id}
                  setShowForm={setShowForm}
                />
              )}
            </>
          )}

          {!showForm &&
            reviews?.map((review) => (
              <ProductReview key={review.id} review={review} />
            ))}
        </div>
      </div>
    </div>
  );
}

export default Reviews;
