import React from "react";
import { Tab } from "@headlessui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faReceipt } from "@fortawesome/free-solid-svg-icons";

import MyOrders from "components/account/MyOrders";
import MyDetails from "components/account/MyDetails";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

function myaccount() {
  return (
    <div className="body-font overflow-hidden">
      <div className="container mx-auto px-4 md:px-20">
        <h2 className="text-2xl mt-8 text-black dark:text-white uppercase">
          My Account
        </h2>
      </div>
      <div className="container px-5 py-10 mx-auto">
        <Tab.Group>
          <Tab.List className="flex space-x-1 rounded-xl bg-red-900/20 p-1">
            <Tab
              className={({ selected }) =>
                classNames(
                  "w-full rounded-lg py-2.5 font-medium ",
                  selected
                    ? "bg-gray-50 shadow border border-gray-100 "
                    : "shadow dark:text-white"
                )
              }
            >
              <FontAwesomeIcon icon={faUser} className="text-xl mr-2" /> My
              Details
            </Tab>
            <Tab
              className={({ selected }) =>
                classNames(
                  "w-full rounded-lg py-2.5 font-medium ",
                  selected
                    ? "bg-gray-50 shadow border border-gray-100 "
                    : "shadow dark:text-white"
                )
              }
            >
              <FontAwesomeIcon icon={faReceipt} className="text-xl mr-2" /> My
              Orders
            </Tab>
          </Tab.List>
          <Tab.Panels className="mt-2 w-full">
            <Tab.Panel>
              <MyDetails />
            </Tab.Panel>
            <Tab.Panel>
              <MyOrders />
            </Tab.Panel>
          </Tab.Panels>
        </Tab.Group>
      </div>
    </div>
  );
}

export default myaccount;
