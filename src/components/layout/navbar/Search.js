import React, { useState } from "react";
import { gql, useQuery, useLazyQuery } from "@apollo/client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { Popover } from "@headlessui/react";
import { resetIdCounter, useCombobox } from "downshift";
import debounce from "lodash.debounce";
import { useRouter } from "next/router";
import Link from "next/link";

import { productsClient } from "lib/ApolloClient";

const SEARCH_PRODUCTS_QUERY = gql`
  query SEARCH_PRODUCTS_QUERY($searchTerm: String!) {
    searchTerms: allProducts(
      where: {
        OR: [
          { name_contains_i: $searchTerm }
          { description_contains_i: $searchTerm }
        ]
      }
    ) {
      id
      name
      photo {
        image {
          publicUrlTransformed
        }
      }
    }
  }
`;

function MyPopover({ getMenuProps, items, getItemProps, isOpen }) {
  return (
    <Popover className="relative">
      {({ open }) => (
        <>
          {isOpen && (
            <Popover.Panel static className="absolute z-10 w-full">
              <div
                className="border border-gray-700 bg-white"
                {...getMenuProps()}
              >
                {items?.length <= 0 && (
                  <div href="/analytics" className="p-2 w-full">
                    Sorry, no items founded.
                  </div>
                )}

                {items?.map((item) => (
                  <Link
                    href={`/product/${item?.id}`}
                    className="p-2 w-full"
                    {...getItemProps({ item })}
                    key={item?.id}
                  >
                    <div className="flex justify-start items-center">
                      <img
                        src={item?.photo?.image?.publicUrlTransformed}
                        alt={item?.name}
                        className="h-10 w-10 mr-2"
                      />
                      {item?.name}
                    </div>
                  </Link>
                ))}
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
  const router = useRouter();

  const [findItems, { data }] = useLazyQuery(SEARCH_PRODUCTS_QUERY, {
    client: productsClient,
    fetchPolicy: "no-cache",
  });

  const findItemsButChill = debounce(findItems, 350);
  const items = data?.searchTerms || [];

  resetIdCounter();
  const {
    isOpen,
    inputValue,
    getMenuProps,
    getInputProps,
    getComboboxProps,
    getItemProps,
  } = useCombobox({
    items,

    onInputValueChange() {
      findItemsButChill({
        variables: {
          searchTerm: inputValue,
        },
      });
    },

    onSelectedItemChange({ selectedItem }) {
      router.push({
        pathname: `/product/${selectedItem?.id}`,
      });
    },
  });

  return (
    <div className="w-full mt-4">
      <div className="relative">
        <span className="absolute inset-y-0 left-0 flex items-center">
          <FontAwesomeIcon icon={faSearch} className="mr-2 text-gray-400" />
        </span>
        <div {...getComboboxProps()}>
          <input
            {...getInputProps({
              type: "search",
              placeholder: "Search for an item",
              id: "search",
              className:
                "w-full py-2 pl-10 pr-4 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring",
            })}
          />
        </div>

        <MyPopover
          getMenuProps={getMenuProps}
          items={items}
          getItemProps={getItemProps}
          isOpen={isOpen}
        />
      </div>
    </div>
  );
}

export default Search;
