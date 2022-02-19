/* eslint-disable @next/next/no-img-element */
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExclamation, faFire } from "@fortawesome/free-solid-svg-icons";
import { gql, useQuery } from "@apollo/client";
import Link from "next/link";

import HomeBanner from "../components/HomeBanner";

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
  const { data, loading, error } = useQuery(ALL_PRODUCTS_QUERY);

  if (data) {
    console.log(data);
  }

  // TODO: Create a Loading component
  if (loading) return "Loading...";

  return (
    <>
      <HomeBanner />
      <div className="container mx-auto px-20">
        <h2 className="text-2xl mt-8 uppercase">
          <FontAwesomeIcon icon={faExclamation} className="mr-2" />
          New Products and Releases
        </h2>
        <section className="text-gray-600 body-font border">
          <div className="container px-5 py-8 mx-auto">
            <div className="flex flex-wrap -m-4">
              {data?.allProducts?.map((product) => (
                <div className="lg:w-1/4 md:w-1/2 p-4 w-full">
                  <Link href={`/product/${product.id}`}>
                    <div className="cursor-pointer">
                      <div className="block relative h-48 rounded overflow-hidden">
                        <img
                          alt="ecommerce"
                          className="object-cover object-center w-full h-full block"
                          src={product?.photo?.image?.publicUrlTransformed}
                        />
                      </div>
                      <div className="mt-4">
                        <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1">
                          Merchandise
                        </h3>
                        <h2 className="text-gray-900 title-font text-lg font-medium">
                          {product.name}
                        </h2>
                        <p className="mt-1">${product.price}</p>
                      </div>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>

        <h2 className="text-2xl mt-8 uppercase">
          <FontAwesomeIcon icon={faFire} className="mr-2" />
          Featured Products
        </h2>
        <section className="text-gray-600 body-font">
          <div className="container px-5 py-8 mx-auto">
            <div className="flex flex-wrap -m-4">
              <div className="lg:w-1/4 md:w-1/2 p-4 w-full">
                <a className="block relative h-48 rounded overflow-hidden">
                  <img
                    alt="ecommerce"
                    className="object-cover object-center w-full h-full block"
                    src="https://dummyimage.com/420x260"
                  />
                </a>
                <div className="mt-4">
                  <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1">
                    CATEGORY
                  </h3>
                  <h2 className="text-gray-900 title-font text-lg font-medium">
                    The Catalyzer
                  </h2>
                  <p className="mt-1">$16.00</p>
                </div>
              </div>
              <div className="lg:w-1/4 md:w-1/2 p-4 w-full border border-green-300">
                <a className="block relative h-48 rounded overflow-hidden">
                  <img
                    alt="ecommerce"
                    className="object-cover object-center w-full h-full block"
                    src="https://i.etsystatic.com/22517142/c/1426/1133/426/499/il/9823e4/3517611453/il_340x270.3517611453_q5ls.jpg"
                  />
                </a>
                <div className="mt-4">
                  <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1">
                    CATEGORY
                  </h3>
                  <h2 className="text-gray-900 title-font text-lg font-medium">
                    Shooting Stars
                  </h2>
                  <p className="mt-1">$21.15</p>
                </div>
              </div>
              <div className="lg:w-1/4 md:w-1/2 p-4 w-full">
                <a className="block relative h-48 rounded overflow-hidden">
                  <img
                    alt="ecommerce"
                    className="object-cover object-center w-full h-full block"
                    src="https://dummyimage.com/422x262"
                  />
                </a>
                <div className="mt-4">
                  <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1">
                    CATEGORY
                  </h3>
                  <h2 className="text-gray-900 title-font text-lg font-medium">
                    Neptune
                  </h2>
                  <p className="mt-1">$12.00</p>
                </div>
              </div>
              <div className="lg:w-1/4 md:w-1/2 p-4 w-full">
                <a className="block relative h-48 rounded overflow-hidden">
                  <img
                    alt="ecommerce"
                    className="object-cover object-center w-full h-full block"
                    src="https://dummyimage.com/423x263"
                  />
                </a>
                <div className="mt-4">
                  <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1">
                    CATEGORY
                  </h3>
                  <h2 className="text-gray-900 title-font text-lg font-medium">
                    The 400 Blows
                  </h2>
                  <p className="mt-1">$18.40</p>
                </div>
              </div>
              <div className="lg:w-1/4 md:w-1/2 p-4 w-full">
                <a className="block relative h-48 rounded overflow-hidden">
                  <img
                    alt="ecommerce"
                    className="object-cover object-center w-full h-full block"
                    src="https://dummyimage.com/424x264"
                  />
                </a>
                <div className="mt-4">
                  <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1">
                    CATEGORY
                  </h3>
                  <h2 className="text-gray-900 title-font text-lg font-medium">
                    The Catalyzer
                  </h2>
                  <p className="mt-1">$16.00</p>
                </div>
              </div>
              <div className="lg:w-1/4 md:w-1/2 p-4 w-full">
                <a className="block relative h-48 rounded overflow-hidden">
                  <img
                    alt="ecommerce"
                    className="object-cover object-center w-full h-full block"
                    src="https://dummyimage.com/425x265"
                  />
                </a>
                <div className="mt-4">
                  <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1">
                    CATEGORY
                  </h3>
                  <h2 className="text-gray-900 title-font text-lg font-medium">
                    Shooting Stars
                  </h2>
                  <p className="mt-1">$21.15</p>
                </div>
              </div>
              <div className="lg:w-1/4 md:w-1/2 p-4 w-full">
                <a className="block relative h-48 rounded overflow-hidden">
                  <img
                    alt="ecommerce"
                    className="object-cover object-center w-full h-full block"
                    src="https://dummyimage.com/427x267"
                  />
                </a>
                <div className="mt-4">
                  <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1">
                    CATEGORY
                  </h3>
                  <h2 className="text-gray-900 title-font text-lg font-medium">
                    Neptune
                  </h2>
                  <p className="mt-1">$12.00</p>
                </div>
              </div>
              <div className="lg:w-1/4 md:w-1/2 p-4 w-full">
                <a className="block relative h-48 rounded overflow-hidden">
                  <img
                    alt="ecommerce"
                    className="object-cover object-center w-full h-full block"
                    src="https://dummyimage.com/428x268"
                  />
                </a>
                <div className="mt-4">
                  <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1">
                    CATEGORY
                  </h3>
                  <h2 className="text-gray-900 title-font text-lg font-medium">
                    The 400 Blows
                  </h2>
                  <p className="mt-1">$18.40</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

export default index;
