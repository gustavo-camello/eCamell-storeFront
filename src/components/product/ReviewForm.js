import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import gql from "graphql-tag";
import { useMutation } from "@apollo/client";
import { Rating } from "react-simple-star-rating";

import { productsClient } from "lib/ApolloClient";
import { GET_PRODUCT_REVIEWS } from "./Reviews";

const CREATE_REVIEW_MUTATION = gql`
  mutation CREATE_REVIEW_MUTATION(
    $customerId: String!
    $review: String!
    $rating: Int!
    $productId: ID!
  ) {
    createReview(
      data: {
        customerId: $customerId
        review: $review
        rating: $rating
        product: { connect: { id: $productId } }
      }
    ) {
      id
    }
  }
`;

function ReviewForm({ customerId, productId, setShowForm }) {
  const [rating, setRating] = useState(0);

  const [createReview] = useMutation(CREATE_REVIEW_MUTATION, {
    client: productsClient,
  });

  const handleRating = (rate) => {
    setRating(rate);
  };

  const handleSubmit = async (values, { setSubmitting }) => {
    createReview({
      variables: {
        customerId,
        review: values.review,
        rating: rating / 20,
        productId,
      },
      refetchQueries: [GET_PRODUCT_REVIEWS],
    });

    setSubmitting(false);
    setShowForm(false);
  };

  const initialValues = {
    customerId: "",
    review: "",
    rating: rating,
    productId: "",
  };

  return (
    <>
      <div className="min-h-full flex items-center justify-center px-4 sm:px-6 lg:px-8 w-1/2">
        <div className="max-w-md w-full space-y-2">
          <div className="flex flex-col">
            <h2 className="mt-2 text-xl text-gray-900 dark:text-white">
              Leave a Review:
            </h2>
          </div>
          <Formik initialValues={initialValues} onSubmit={handleSubmit}>
            {({ isSubmitting }) => (
              <Form className="text-center">
                <div className="my-2">
                  <label htmlFor="rating" className="sr-only">
                    Rating
                  </label>
                  <div className="flex items-center">
                    <span className="mr-1 mt-1">Rating: </span>
                    <Rating
                      initialValue={0}
                      onClick={handleRating}
                      size={20}
                      transition
                      className="mt-0 cursor-pointer"
                    />
                  </div>
                </div>

                <div className="my-2">
                  <label htmlFor="review" className="sr-only">
                    Review Comments
                  </label>

                  <Field
                    type="textarea"
                    name="review"
                    placeholder="Leave your comment"
                    component="textarea"
                    rows={5}
                    className="
                    block
                    w-full
                    px-3
                    py-1.5
                    text-base
                    font-normal
                    text-gray-700
                    bg-white bg-clip-padding
                    border border-solid border-gray-300
                    rounded
                    transition
                    ease-in-out
                    m-0
                    focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                  />
                  <ErrorMessage name="reviewComments" component="div" />
                </div>

                <div>
                  <button
                    disabled={isSubmitting}
                    type="submit"
                    className="group relative w-full mt-8 flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                  >
                    <span className="absolute left-0 inset-y-0 flex items-center pl-3"></span>
                    Publish Review
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </>
  );
}

export default ReviewForm;
