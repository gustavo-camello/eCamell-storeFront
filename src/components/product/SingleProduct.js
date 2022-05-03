import React from "react";
import { gql, useQuery } from "@apollo/client";
import { Rating } from "react-simple-star-rating";

import Loading from "components/Loading";
import { productsClient } from "lib/ApolloClient";
import AddToCart from "./AddToCart";
import DisplayMoney from "components/DisplayMoney";
import ShareProduct from "./ShareProduct";
import AddToWishList from "./AddToWishList";

const SINGLE_ITEM_QUERY = gql`
  query SINGLE_ITEM_QUERY($id: ID!) {
    Product(where: { id: $id }) {
      id
      name
      price
      description
      reviews {
        rating
      }
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

function SingleProduct({ id }) {
  const { data, loading } = useQuery(SINGLE_ITEM_QUERY, {
    variables: {
      id,
    },
    client: productsClient,
  });

  let product;
  let productMainCategory;
  let reviewsRating;
  let totalReviews;
  if (data) {
    const reviews = data?.Product.reviews;

    product = data?.Product;
    productMainCategory = data.Product.category[0].name;
    totalReviews = reviews.length;

    let initialValue = 0;
    const allReviewsRating = reviews.reduce(
      (acc, item) => acc + item.rating,
      initialValue
    );

    reviewsRating = allReviewsRating / totalReviews;
  }

  if (loading) return <Loading />;

  return (
    <div className="text-gray-700 body-font overflow-hidden">
      <div className="container mx-auto px-4 md:px-20">
        <h2 className="text-2xl mt-8 text-black dark:text-white uppercase">
          {productMainCategory}
        </h2>
      </div>
      <div className="container px-5 py-10 mx-auto">
        <div className="lg:w-4/5 mx-auto flex flex-wrap">
          <img
            alt="ecommerce"
            className="lg:w-1/2 w-full object-cover object-center rounded border border-gray-200"
            src={product?.photo?.image?.publicUrlTransformed}
          />
          <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
            <h2 className="text-sm title-font text-gray-500 tracking-widest dark:text-gray-500">
              {productMainCategory}
            </h2>
            <h1 className="text-gray-900 text-3xl title-font font-medium mb-1 dark:text-white">
              {product?.name}
            </h1>
            <div className="flex mb-4">
              <span className="flex items-center pointer-events-none">
                <Rating
                  initialValue={reviewsRating}
                  size={20}
                  transition
                  allowHalfIcon
                  className="mt-0 cursor-pointer"
                />
                <span className="text-gray-600 ml-3 dark:text-gray-400">
                  {totalReviews} Reviews
                </span>
              </span>
            </div>
            <p className="leading-relaxed dark:text-white">
              {product?.description}
            </p>
            <div className="mt-4">
              <ShareProduct product={product} />
            </div>
            <div className="flex mt-5 border-t pt-5">
              <span className="title-font font-medium text-2xl text-gray-900 dark:text-yellow-500">
                <DisplayMoney amount={product?.price} />
              </span>
              <AddToCart productId={product?.id} />
              <AddToWishList productId={product?.id} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SingleProduct;
