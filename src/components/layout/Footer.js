import React from "react";
import {
  faFacebookF,
  faTwitter,
  faInstagram,
  faLinkedin,
} from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function Footer() {
  return (
    <footer className="text-gray-600 body-font mt-12 bg-gray-900">
      <div className="container px-24 py-10 mx-auto">
        <div className="flex flex-wrap md:text-left text-center order-first">
          <div className="lg:w-1/5 md:w-1/2 w-full px-4">
            <h2 className="title-font font-medium text-gray-800 tracking-widest text-sm mb-3">
              About us
            </h2>
            <ul className="list-none mb-10">
              <li>
                <a className="text-gray-600 hover:text-gray-800">About us</a>
              </li>
              <li>
                <a className="text-gray-600 hover:text-gray-800">Directions</a>
              </li>
              <li>
                <a className="text-gray-600 hover:text-gray-800">
                  Find a Store
                </a>
              </li>
            </ul>
          </div>
          <div className="lg:w-1/5 md:w-1/2 w-full px-4">
            <h2 className="title-font font-medium text-gray-800 tracking-widest text-sm mb-3">
              Featured Categories
            </h2>
            <ul className="list-none mb-10">
              <li>
                <a className="text-gray-600 hover:text-gray-800">Cakes</a>
              </li>
              <li>
                <a className="text-gray-600 hover:text-gray-800">Donuts</a>
              </li>
              <li>
                <a className="text-gray-600 hover:text-gray-800">Chocolates</a>
              </li>
              <li>
                <a className="text-gray-600 hover:text-gray-800">Biscuits</a>
              </li>
            </ul>
          </div>
          <div className="lg:w-1/5 md:w-1/2 w-full px-4">
            <h2 className="title-font font-medium text-gray-800 tracking-widest text-sm mb-3">
              Help
            </h2>
            <ul className="list-none mb-10">
              <li>
                <a className="text-gray-600 hover:text-gray-800">
                  Payment Methods
                </a>
              </li>
              <li>
                <a className="text-gray-600 hover:text-gray-800">Contact us</a>
              </li>
            </ul>
          </div>
          <div className="lg:w-2/5 md:w-1/2 w-full px-4">
            <h2 className="title-font font-medium text-gray-800 tracking-widest text-sm mb-3">
              Newsletter
            </h2>
            <div className="flex xl:flex-nowrap md:flex-nowrap lg:flex-wrap flex-wrap justify-center items-end md:justify-start">
              <div className="relative w-40 sm:w-auto xl:mr-4 lg:mr-0 sm:mr-4 mr-2">
                <label
                  htmlFor="footer-field"
                  className="leading-7 text-sm text-gray-600"
                >
                  Receive exclusive offers
                </label>
                <input
                  type="text"
                  id="footer-field"
                  name="footer-field"
                  placeholder="Email"
                  className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:bg-transparent focus:ring-2 focus:ring-red-200 focus:border-red-500 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                />
              </div>
              <button className="lg:mt-2 xl:mt-0 flex-shrink-0 inline-flex text-white bg-red-500 border-0 py-2 px-6 focus:outline-none hover:bg-red-600 rounded">
                Sign up
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-gray-100">
        <div className="container px-5 py-6 mx-auto flex items-center sm:flex-row flex-col">
          <a className="flex title-font font-medium items-center md:justify-start justify-center text-gray-800">
            <span className="ml-3 text-xl">eCamell</span>
          </a>
          <p className="text-sm text-gray-500 sm:ml-6 sm:mt-0 mt-4">
            © 2020 eCamell —
            <a
              href="/"
              rel="noopener noreferrer"
              className="text-gray-600 ml-1"
              target="_blank"
            >
              @eCamell
            </a>
          </p>
          <span className="inline-flex sm:ml-auto sm:mt-0 mt-4 justify-center sm:justify-start">
            <a className="text-gray-500">
              <FontAwesomeIcon icon={faFacebookF} className="mr-2" />
            </a>
            <a className="ml-3 text-gray-500">
              <FontAwesomeIcon icon={faTwitter} className="mr-2" />
            </a>
            <a className="ml-3 text-gray-500">
              <FontAwesomeIcon icon={faInstagram} className="mr-2" />
            </a>
            <a className="ml-3 text-gray-500">
              <FontAwesomeIcon icon={faLinkedin} className="mr-2" />
            </a>
          </span>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
