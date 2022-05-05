import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import gql from "graphql-tag";
import { useMutation } from "@apollo/client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLock } from "@fortawesome/free-solid-svg-icons";
import { useRouter } from "next/router";

import { CURRENT_USER_QUERY } from "hooks/useCurrentUser";

export const SIGNIN_MUTATION = gql`
  mutation SIGNIN_MUTATION($email: String!, $password: String!) {
    authenticateCustomerWithPassword(email: $email, password: $password) {
      ... on CustomerAuthenticationWithPasswordSuccess {
        item {
          id
          email
          firstName
        }
      }
      ... on CustomerAuthenticationWithPasswordFailure {
        code
        message
      }
    }
  }
`;

function SignIn() {
  const router = useRouter();

  const [signIn] = useMutation(SIGNIN_MUTATION);

  const handleSubmit = async (values, { setSubmitting }) => {
    signIn({
      variables: { email: values.email, password: values.password },
      refetchQueries: [CURRENT_USER_QUERY],
    });

    setSubmitting(false);
    // TODO: redirect to user account
    router.push("/");
  };

  const initialValues = { email: "", password: "" };

  return (
    <>
      <div className="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div className="flex flex-col">
            <span className="text-2xl text-center dark:text-white">
              <FontAwesomeIcon icon={faLock} />
            </span>

            <h2 className="mt-2 text-center text-xl text-gray-900 dark:text-white">
              Sign in to your account
            </h2>
          </div>
          <Formik
            initialValues={initialValues}
            validate={(values) => {
              const errors = {};
              if (!values.email) {
                errors.email = "Required";
              } else if (
                !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
              ) {
                errors.email = "Invalid email address";
              }
              return errors;
            }}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting }) => (
              <Form className="text-center">
                <div className="my-2">
                  <label htmlFor="email-address" className="sr-only">
                    Email address
                  </label>
                  <Field
                    type="email"
                    name="email"
                    placeholder="Email address"
                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-yellow-500 focus:border-yellow-500 focus:z-10 sm:text-sm"
                  />
                  <ErrorMessage name="email" component="div" />
                </div>
                <div className="my-2">
                  <label htmlFor="password" className="sr-only">
                    Password
                  </label>
                  <Field
                    type="password"
                    name="password"
                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-yellow-500 focus:border-yellow-500 focus:z-10 sm:text-sm"
                    placeholder="Password"
                  />
                  <ErrorMessage name="password" component="div" />
                </div>

                {/* <div className="flex items-center justify-between my-4">
                  <div className="flex items-center">
                    <input
                      id="remember-me"
                      name="remember-me"
                      type="checkbox"
                      className="h-4 w-4 text-yellow-600 focus:ring-yellow-500 border-gray-300 rounded"
                    />
                    <label
                      htmlFor="remember-me"
                      className="ml-2 block text-sm text-gray-900"
                    >
                      Remember me
                    </label>
                  </div>

                  <div className="text-sm">
                    <a
                      href="#"
                      className="font-medium text-yellow-600 hover:text-yellow-500"
                    >
                      Forgot your password?
                    </a>
                  </div>
                </div> */}

                <div>
                  <button
                    disabled={isSubmitting}
                    type="submit"
                    className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-yellow-600 hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500"
                  >
                    <span className="absolute left-0 inset-y-0 flex items-center pl-3"></span>
                    Sign in
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

export default SignIn;
