import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserPlus } from "@fortawesome/free-solid-svg-icons";

import SignIn from "components/user/SignIn";

function sigin() {
  return (
    <div className="container mx-auto px-4 md:px-20 border flex flex-col md:flex-row">
      <div className="w-1/2">
        <SignIn />
      </div>
      <div className="w-1/2">
        <div className="min-h-full flex items-start justify-center py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-md w-full space-y-8">
            <div className="flex flex-col">
              <span className="text-2xl text-center">
                <FontAwesomeIcon icon={faUserPlus} />
              </span>

              <h2 className="mt-2 text-center text-xl text-gray-900">
                Create an Account
              </h2>
            </div>

            <p>
              Creating an account is easy! Enter your details and a password to
              enjoy all the benefits of having an account.
            </p>

            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              <span className="absolute left-0 inset-y-0 flex items-center pl-3"></span>
              Sign up
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default sigin;
