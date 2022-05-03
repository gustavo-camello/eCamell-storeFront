import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { Popover } from "@headlessui/react";
import { useCombobox } from "downshift";

function MyPopover() {
  const abrir = true;

  const { getMenuProps, getInputProps, getComboboxProps } = useCombobox({
    items: [],
    onInputValueChange() {
      console.log("inputed changed");
    },
  });

  return (
    <Popover className="relative">
      {({ open }) => (
        <>
          {abrir && (
            <Popover.Panel static className="absolute z-10 w-full">
              <div className=" bg-green-200">
                <div href="/analytics" className="p-2 w-full">
                  Analytics
                </div>
                <div href="/analytics" className="p-2 w-full">
                  Analytics
                </div>
                <div href="/analytics" className="p-2 w-full">
                  Analytics
                </div>
                <div href="/analytics" className="p-2 w-full">
                  Analytics
                </div>
              </div>

              <img src="/solutions.jpg" alt="" />
            </Popover.Panel>
          )}
        </>
      )}
    </Popover>
  );
}

function Search() {
  return (
    <div className="hidden mx-4 md:block w-full border border-yellow-300">
      <div className="relative">
        <span className="absolute inset-y-0 left-0 flex items-center pl-3">
          <FontAwesomeIcon icon={faSearch} className="mr-2 text-gray-400" />
        </span>

        <input
          type="search"
          className="w-full py-2 pl-10 pr-4 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
          placeholder="Search for anything"
        />
        <MyPopover />
      </div>
    </div>
  );
}

export default Search;
