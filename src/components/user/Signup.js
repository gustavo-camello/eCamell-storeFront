import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import gql from "graphql-tag";
import { useMutation } from "@apollo/client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLock } from "@fortawesome/free-solid-svg-icons";
import { useRouter } from "next/router";

import { CURRENT_USER_QUERY } from "hooks/useCurrentUser";
import { SIGNIN_MUTATION } from "./SignIn";
import { cartClient } from "lib/ApolloClient";
import { useCurrentUser } from "hooks/useCurrentUser";

const SIGNUP_MUTATION = gql`
  mutation SignupCustomer(
    $firstName: String!
    $lastName: String!
    $email: String!
    $password: String!
    $address: String!
  ) {
    createCustomer(
      data: {
        firstName: $firstName
        lastName: $lastName
        email: $email
        password: $password
        address: $address
      }
    ) {
      firstName
      lastName
      id
    }
  }
`;

const CREATE_CART_MUTATION = gql`
  mutation CreateCartMutation($customerId: ID!) {
    createCart(data: { customerId: $customerId }) {
      customerId
    }
  }
`;

function Signup() {
  const router = useRouter();
  const currentUser = useCurrentUser();

  const [signup, { data, error, loading }] = useMutation(SIGNUP_MUTATION);
  const [signIn, { dataSignin }] = useMutation(SIGNIN_MUTATION);
  const [createCart] = useMutation(CREATE_CART_MUTATION, {
    client: cartClient,
  });

  const initialValues = {
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    address: "",
  };

  const submit = async (values, { setSubmitting }) => {
    const { firstName, lastName, password, email, address } = values;

    await signup({
      variables: {
        firstName,
        lastName,
        email,
        address,
        password,
      },
    });

    setSubmitting(false);

    await signIn({
      variables: {
        email: values.email,
        password: values.password,
      },
      refetchQueries: [CURRENT_USER_QUERY],
    });

    // TODO: redirect to user account
    router.push("/");
  };

  return (
    <>
      <div className="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div className="flex flex-col">
            <span className="text-2xl text-center">
              <FontAwesomeIcon icon={faLock} />
            </span>

            <h2 className="mt-2 text-center text-xl text-gray-900">
              Create your account
            </h2>
          </div>
          <Formik initialValues={initialValues} onSubmit={submit}>
            {({ isSubmitting }) => (
              <Form className="text-center">
                <div>
                  <label htmlFor="first-name">First Name</label>
                  <Field
                    type="text"
                    name="firstName"
                    placeholder="First Name"
                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  />
                  <ErrorMessage name="firstName" component="div" />
                </div>
                <div>
                  <label htmlFor="last-name">Last Name</label>
                  <Field
                    type="text"
                    name="lastName"
                    placeholder="Last Name"
                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  />
                  <ErrorMessage name="lastName" component="div" />
                </div>
                <div>
                  <label htmlFor="email-address">Email</label>
                  <Field
                    type="email"
                    name="email"
                    placeholder="Email address"
                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  />
                  <ErrorMessage name="email" component="div" />
                </div>
                <div>
                  <label htmlFor="password">Password</label>
                  <Field
                    type="password"
                    name="password"
                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                    placeholder="Password"
                  />
                  <ErrorMessage name="password" component="div" />
                </div>

                <div>
                  <label htmlFor="first-name">Complete Address</label>
                  <Field
                    type="text"
                    name="address"
                    placeholder="Complete Address"
                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  />
                  <ErrorMessage name="address" component="div" />
                </div>

                <div className="mt-10">
                  <button
                    disabled={isSubmitting}
                    type="submit"
                    className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    <span className="absolute left-0 inset-y-0 flex items-center pl-3"></span>
                    Sign up
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

export default Signup;
