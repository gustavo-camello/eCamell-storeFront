import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import gql from "graphql-tag";
import { useMutation, useQuery } from "@apollo/client";
import { useRouter } from "next/router";

import { CURRENT_USER_QUERY } from "hooks/useCurrentUser";
import { useCurrentUser } from "hooks/useCurrentUser";

const QUERY_CURRENT_USER = gql`
  query QUERY_CURRENT_USER($id: ID!) {
    Customer(where: { id: $id }) {
      firstName
      lastName
      email
      address
    }
  }
`;

const MUTATION_UPDATE_CUSTOMER = gql`
  mutation MUTATION_UPDATE_CUSTOMER(
    $id: ID!
    $address: String!
    $lastName: String!
    $firstName: String!
    $email: String!
  ) {
    updateCustomer(
      id: $id
      data: {
        address: $address
        firstName: $firstName
        lastName: $lastName
        email: $email
      }
    ) {
      id
      firstName
      lastName
      address
      email
    }
  }
`;

function MyDetails() {
  const currentUser = useCurrentUser();
  const router = useRouter();

  const { data, error, loading } = useQuery(QUERY_CURRENT_USER, {
    variables: {
      id: currentUser?.id,
    },
  });

  const [updateUser] = useMutation(MUTATION_UPDATE_CUSTOMER);

  let initialValues;

  if (data) {
    initialValues = {
      email: data?.Customer?.email,
      firstName: data?.Customer?.firstName,
      lastName: data?.Customer?.lastName,
      address: data?.Customer?.address,
    };
  }

  const submit = async (values, { setSubmitting }) => {
    const { firstName, lastName, email, address } = values;

    await updateUser({
      variables: {
        firstName,
        lastName,
        email,
        address,
        id: currentUser?.id,
      },
      refetchQueries: [CURRENT_USER_QUERY],
    });

    setSubmitting(false);

    router.push("/");
  };

  return (
    <>
      <div className="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div className="flex flex-col">
            <h2 className="mt-2 text-center text-xl text-gray-900 font-bold">
              Update your account
            </h2>
          </div>
          <Formik initialValues={initialValues} onSubmit={submit}>
            {({ isSubmitting }) => (
              <Form className="text-center">
                <div>
                  <label
                    htmlFor="first-name"
                    className="mt-3 mb-2 inline-block dark:text-white"
                  >
                    First Name
                  </label>
                  <Field
                    type="text"
                    name="firstName"
                    placeholder="First Name"
                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-green-500 focus:border-green-500 focus:z-10 sm:text-sm"
                  />
                  <ErrorMessage name="firstName" component="div" />
                </div>
                <div>
                  <label
                    htmlFor="last-name"
                    className="mt-3 mb-2 inline-block dark:text-white"
                  >
                    Last Name
                  </label>
                  <Field
                    type="text"
                    name="lastName"
                    placeholder="Last Name"
                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-green-500 focus:border-green-500 focus:z-10 sm:text-sm"
                  />
                  <ErrorMessage name="lastName" component="div" />
                </div>
                <div>
                  <label
                    htmlFor="email-address"
                    className="mt-3 mb-2 inline-block dark:text-white"
                  >
                    Email
                  </label>
                  <Field
                    type="email"
                    name="email"
                    placeholder="Email address"
                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-green-500 focus:border-green-500 focus:z-10 sm:text-sm"
                  />
                  <ErrorMessage name="email" component="div" />
                </div>

                <div>
                  <label
                    htmlFor="first-name"
                    className="mt-3 mb-2 inline-block dark:text-white"
                  >
                    Complete Address
                  </label>
                  <Field
                    type="text"
                    name="address"
                    placeholder="Complete Address"
                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-green-500 focus:border-green-500 focus:z-10 sm:text-sm"
                  />
                  <ErrorMessage name="address" component="div" />
                </div>

                <div className="mt-10">
                  <button
                    disabled={isSubmitting}
                    type="submit"
                    className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                  >
                    <span className="absolute left-0 inset-y-0 flex items-center pl-3"></span>
                    Update Values
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

export default MyDetails;
