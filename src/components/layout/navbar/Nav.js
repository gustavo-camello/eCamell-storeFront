import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSearch,
  faUser,
  faMoon,
  faCartShopping,
  faBars,
  faHeart,
} from "@fortawesome/free-solid-svg-icons";
import "react-modern-drawer/dist/index.css";
import { gql, useQuery } from "@apollo/client";

import NavLink from "./NavLink";
import Logo from "./Logo";
import TextWithIcon from "components/TextWithIcon";
import { useCurrentUser } from "hooks/useCurrentUser";
import Signout from "components/user/Signout";
import Search from "./Search";
import { productsClient } from "lib/ApolloClient";

const QUERY_PRODUCTS_CATEGORIES = gql`
  query {
    allProductCategories {
      name
      id
    }
  }
`;

function changeDarkMode() {
  if (localStorage.theme === "light") {
    localStorage.setItem("theme", "dark");
    document.documentElement.classList.add("dark");
  } else if (localStorage.theme === "dark") {
    localStorage.setItem("theme", "light");
    document.documentElement.classList.remove("dark");
  }

  if (
    localStorage.theme === "dark" ||
    (!("theme" in localStorage) &&
      window.matchMedia("(prefers-color-scheme: dark)").matches)
  ) {
    document.documentElement.classList.add("dark");
  } else {
    document.documentElement.classList.remove("dark");
  }
}

function Nav() {
  const { data } = useQuery(QUERY_PRODUCTS_CATEGORIES, {
    client: productsClient,
  });

  let categories;

  if (data) {
    categories = data.allProductCategories;
  }

  const currentUser = useCurrentUser();

  return (
    <nav className="bg-white-400 dark:bg-gray-900 border-b-2 border-gray-500">
      <div className="container px-2 md:px-10 pt-3 mx-auto">
        <div className="flex flex-col md:flex-row md:justify-between md:items-center">
          <div className="flex items-center justify-between">
            <div className="flex items-center justify-between w-full">
              <div className="text-2xl">
                <NavLink href="/">
                  <Logo />
                </NavLink>
              </div>

              <div className="flex justify-evenly items-center w-20 sm:w-1/5 md:hidden">
                <span className="mx-2">
                  {currentUser ? (
                    <>
                      <NavLink href="/account/myaccount">
                        <span className="dark:text-white">
                          <FontAwesomeIcon icon={faUser} />
                        </span>
                      </NavLink>
                    </>
                  ) : (
                    <NavLink href="/account">
                      <span className="dark:text-white">
                        <FontAwesomeIcon icon={faUser} />
                      </span>
                    </NavLink>
                  )}
                </span>

                <span className="mx-2 cursor-pointer" onClick={changeDarkMode}>
                  <span className="dark:text-white">
                    <FontAwesomeIcon icon={faMoon} />
                  </span>
                </span>

                <span className="mx-2">
                  <NavLink href="/cart">
                    <span className="dark:text-white">
                      <FontAwesomeIcon icon={faCartShopping} />
                    </span>
                  </NavLink>
                </span>
                {currentUser && <Signout />}
              </div>
            </div>
          </div>

          <div className="items-center md:flex justify-around hidden">
            <div className="flex items-center py-2">
              {currentUser ? (
                <>
                  <NavLink href="/account/myaccount">
                    <TextWithIcon
                      icon={<FontAwesomeIcon icon={faUser} />}
                      text="My Account"
                    />
                  </NavLink>
                </>
              ) : (
                <NavLink href="/account">
                  <TextWithIcon
                    icon={<FontAwesomeIcon icon={faUser} />}
                    text="Signin"
                  />
                </NavLink>
              )}
            </div>
            <div className="flex items-center py-2">
              <NavLink href="/wishList">
                <TextWithIcon
                  icon={<FontAwesomeIcon icon={faHeart} />}
                  text="WishList"
                />
              </NavLink>
              <span onClick={changeDarkMode}>
                <TextWithIcon
                  icon={<FontAwesomeIcon icon={faMoon} />}
                  text="Dark"
                />
              </span>
            </div>

            <div className="flex items-center py-2">
              <span className="bg-yellow-600 rounded-md hover:bg-yellow-700">
                <NavLink href="/cart">
                  <div className="items-center text-base font-medium rounded-md text-white px-4 mx-2 py-2 cursor-pointer">
                    <FontAwesomeIcon icon={faCartShopping} />
                    <span className="ml-2">Cart</span>
                  </div>
                </NavLink>
              </span>
            </div>
            {currentUser && <Signout />}
          </div>
        </div>

        <Search open={true} />

        <ul className="py-3 overflow-y-auto whitespace-nowrap scroll-hidden flex justify-center">
          {categories?.map((category) => (
            <li
              key={category.id}
              className="mx-4 text-base font-semibold uppercase text-black hover:text-gray-600 dark:text-white  dark:hover:text-gray-200 tracking-widest"
            >
              <NavLink href={`/category/${category.name}`}>
                {category.name}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}

export default Nav;
