import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faUser, faMoon } from "@fortawesome/free-solid-svg-icons";

// import CartButton from "../../buttons/CartButton";
import NavLink from "./NavLink";
import Logo from "./Logo";
// import TextWithIcon from "../../buttons/TextWithIcon";

function changeDarkMode() {
  if (localStorage.theme === "light") {
    localStorage.setItem("theme", "dark");
    document.documentElement.classList.add("dark");
  } else if (localStorage.theme === "dark") {
    localStorage.setItem("theme", "light");
    document.documentElement.classList.remove("dark");
  }

  // if (
  //   localStorage.theme === "dark" ||
  //   (!("theme" in localStorage) &&
  //     window.matchMedia("(prefers-color-scheme: dark)").matches)
  // ) {
  //   document.documentElement.classList.add("dark");
  // } else {
  //   document.documentElement.classList.remove("dark");
  // }
}

function Nav() {
  return (
    <nav className="bg-white-400 dark:bg-gray-800 border-b-2 border-gray-500">
      <div className="container px-20 pt-3 mx-auto">
        <div className="flex flex-col md:flex-row md:justify-between md:items-center">
          <div className="flex items-center justify-between w-4/5">
            <div className="flex items-center w-full">
              <div className="text-2xl">
                <NavLink href="/">
                  <Logo />
                </NavLink>
              </div>

              {/* <!-- Search input on desktop screen --> */}
              <div className="hidden mx-4 md:block w-full">
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
            </div>

            {/* <!-- Mobile menu button --> */}
            <div className="flex md:hidden">
              <button
                type="button"
                className="text-gray-500 dark:text-gray-200 hover:text-gray-600 dark:hover:text-gray-400 focus:outline-none focus:text-gray-600 dark:focus:text-gray-400"
                aria-label="toggle menu"
              >
                <svg viewBox="0 0 24 24" className="w-6 h-6 fill-current">
                  <path
                    fillRule="evenodd"
                    d="M4 5h16a1 1 0 0 1 0 2H4a1 1 0 1 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2z"
                  ></path>
                </svg>
              </button>
            </div>
          </div>

          {/* <!-- Mobile Menu open: "block", Menu closed: "hidden" --> */}
          <div className="items-center md:flex justify-between w-1/5">
            <div className="flex flex-col mt-2 md:flex-row md:mt-0 md:mx-2 md:w-1/2 md:justify-around">
              {/* <div className="my-1 text-sm leading-5 text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-indigo-400 hover:underline md:mx-4 md:my-0">
                <NavLink href="/account">
                  <TextWithIcon
                    icon={<FontAwesomeIcon icon={faUser} />}
                    text="My Account"
                  />
                </NavLink>
              </div> */}
              <div className="flex items-center py-2 -mx-1 md:mx-0">
                <NavLink href="/signIn">Sign in</NavLink>
              </div>
              <div className="flex items-center py-2 -mx-1 md:mx-0">
                <FontAwesomeIcon icon={faMoon} onClick={changeDarkMode} />
              </div>
            </div>

            <div className="flex items-center py-2 -mx-1 md:mx-0">
              <NavLink href="/cart">{/* <CartButton /> */} Cart Button</NavLink>
            </div>

            {/* <!-- Search input on mobile screen --> */}
            <div className="mt-3 md:hidden">
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
                  placeholder="Search"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Categories */}
        <ul className="py-3 overflow-y-auto whitespace-nowrap scroll-hidden flex justify-between ">
          <li>
            <a
              className="mx-4 text-sm leading-5 text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-indigo-400 hover:underline md:my-0"
              href="#"
            >
              News
            </a>
          </li>
          <a
            className="mx-4 text-sm leading-5 text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-indigo-400 hover:underline md:my-0"
            href="#"
          >
            Articles
          </a>
          <a
            className="mx-4 text-sm leading-5 text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-indigo-400 hover:underline md:my-0"
            href="#"
          >
            Videos
          </a>
          <a
            className="mx-4 text-sm leading-5 text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-indigo-400 hover:underline md:my-0"
            href="#"
          >
            Tricks
          </a>
          <a
            className="mx-4 text-sm leading-5 text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-indigo-400 hover:underline md:my-0"
            href="#"
          >
            PHP
          </a>
          <a
            className="mx-4 text-sm leading-5 text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-indigo-400 hover:underline md:my-0"
            href="#"
          >
            Laravel
          </a>
          <a
            className="mx-4 text-sm leading-5 text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-indigo-400 hover:underline md:my-0"
            href="#"
          >
            Vue
          </a>
          <a
            className="mx-4 text-sm leading-5 text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-indigo-400 hover:underline md:my-0"
            href="#"
          >
            React
          </a>
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
