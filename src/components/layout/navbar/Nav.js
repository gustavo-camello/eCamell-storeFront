import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSearch,
  faUser,
  faMoon,
  faCartShopping,
  faBars,
} from "@fortawesome/free-solid-svg-icons";
import Drawer from "react-modern-drawer";
import "react-modern-drawer/dist/index.css";

import NavLink from "./NavLink";
import Logo from "./Logo";
import { useCurrentUser, CURRENT_USER_QUERY } from "hooks/useCurrentUser";
import TextWithIcon from "components/TextWithIcon";

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
  const user = useCurrentUser();
  console.log(user);

  const [isOpen, setIsOpen] = useState(false);
  const toggleDrawer = () => {
    setIsOpen((prevState) => !prevState);
  };

  return (
    <nav className="bg-white-400 dark:bg-gray-800 border-b-2 border-gray-500">
      <div className="container px-2 md:px-10 pt-3 mx-auto border border-green-800">
        <div className="flex flex-col md:flex-row md:justify-between md:items-center">
          <div className="flex items-center justify-between w-full md:w-4/5">
            <div className="flex items-center justify-between w-full border border-red-500">
              <div className="flex md:hidden">
                <button
                  type="button"
                  className="text-gray-500 dark:text-gray-200 hover:text-gray-600 dark:hover:text-gray-400 focus:outline-none focus:text-gray-600 dark:focus:text-gray-400"
                  aria-label="toggle menu"
                  onClick={toggleDrawer}
                >
                  <FontAwesomeIcon icon={faBars} />
                </button>
              </div>

              <div className="text-2xl">
                <NavLink href="/">
                  <Logo />
                </NavLink>
              </div>

              {/* <!-- Search input on desktop screen --> */}
              <div className="hidden mx-4 md:block w-full border border-yellow-300">
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                    <FontAwesomeIcon
                      icon={faSearch}
                      className="mr-2 text-gray-400"
                    />
                  </span>

                  <input
                    type="text"
                    className="w-full py-2 pl-10 pr-4 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                    placeholder="Search for anything"
                  />
                </div>
              </div>

              <div className="flex justify-evenly items-center border w-20 sm:w-1/5 border-blue-500 md:hidden">
                <span className="mx-2">
                  {user ? (
                    <NavLink href="/account">
                      <FontAwesomeIcon icon={faUser} />
                    </NavLink>
                  ) : (
                    <NavLink href="/signin">
                      <FontAwesomeIcon icon={faUser} />
                    </NavLink>
                  )}
                </span>

                <span className="mx-2" onClick={changeDarkMode}>
                  <FontAwesomeIcon icon={faMoon} />
                </span>

                <span className="mx-2">
                  <NavLink href="/cart">
                    <FontAwesomeIcon icon={faCartShopping} />
                  </NavLink>
                </span>
              </div>
            </div>
          </div>

          <div className="items-center md:flex justify-around w-1/2 lg:w-2/5 xl:w-2/6 border border-green-500 hidden">
            <div className="flex items-center py-2">
              {user ? (
                <NavLink href="/account">
                  <TextWithIcon
                    icon={<FontAwesomeIcon icon={faUser} />}
                    text="My Account"
                  />
                </NavLink>
              ) : (
                <NavLink href="/signin">
                  <TextWithIcon
                    icon={<FontAwesomeIcon icon={faUser} />}
                    text="Signin"
                  />
                </NavLink>
              )}
            </div>
            <div className="flex items-center py-2">
              <span onClick={changeDarkMode}>
                <TextWithIcon
                  icon={<FontAwesomeIcon icon={faMoon} />}
                  text="Dark"
                />
              </span>
            </div>

            <div className="flex items-center py-2">
              <NavLink href="/cart">
                {/* <CartButton /> */}{" "}
                <TextWithIcon
                  icon={<FontAwesomeIcon icon={faCartShopping} />}
                  text="Cart"
                />
              </NavLink>
            </div>
          </div>
        </div>

        <div className="mt-3 md:hidden">
          <div className="relative">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3">
              <FontAwesomeIcon icon={faSearch} className="mr-2 text-gray-400" />
            </span>

            <input
              type="text"
              className="w-full py-2 pl-10 pr-4 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
              placeholder="Search"
            />
          </div>
        </div>

        {/* Categories */}

        <Drawer
          open={isOpen}
          onClose={toggleDrawer}
          direction="left"
          className="bla bla bla"
        >
          <ul className="">
            <li>
              <NavLink
                className="mx-4 text-sm leading-5 text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-indigo-400 hover:underline md:my-0"
                href="/products"
              >
                Products
              </NavLink>
            </li>
            <li>
              <NavLink
                className="mx-4 text-sm leading-5 text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-indigo-400 hover:underline md:my-0"
                href="/products"
              >
                Products
              </NavLink>
            </li>
            <li>
              <NavLink
                className="mx-4 text-sm leading-5 text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-indigo-400 hover:underline md:my-0"
                href="/products"
              >
                Products
              </NavLink>
            </li>
          </ul>
        </Drawer>

        <ul className="py-3 overflow-y-auto whitespace-nowrap scroll-hidden flex justify-between ">
          <li>
            <NavLink
              className="mx-4 text-sm leading-5 text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-indigo-400 hover:underline md:my-0"
              href="/products"
            >
              Mouses
            </NavLink>
          </li>
          <li>
            <NavLink
              className="mx-4 text-sm leading-5 text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-indigo-400 hover:underline md:my-0"
              href="/products"
            >
              Keyboards
            </NavLink>
          </li>
          <li>
            <NavLink
              className="mx-4 text-sm leading-5 text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-indigo-400 hover:underline md:my-0"
              href="/products"
            >
              CPU's
            </NavLink>
          </li>
          <li>
            <NavLink
              className="mx-4 text-sm leading-5 text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-indigo-400 hover:underline md:my-0"
              href="/products"
            >
              Cables
            </NavLink>
          </li>

          <NavLink
            className="mx-4 text-sm leading-5 text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-indigo-400 hover:underline md:my-0"
            href="/products"
          >
            Products
          </NavLink>
        </ul>
      </div>
    </nav>
  );
}

export default Nav;