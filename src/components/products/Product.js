import React from "react";

import Link from "next/link";
import DisplayMoney from "components/DisplayMoney";

function Product({ product }) {
  return (
    <div className="lg:w-1/4 md:w-1/2 p-4 w-full dark:text-white">
      <Link href={`/product/${product.id}`}>
        <div className="cursor-pointer">
          <div className="block relative h-48 rounded overflow-hidden">
            <img
              alt="ecommerce"
              className="object-cover object-center w-full h-full block"
              src={product?.photo?.image?.publicUrlTransformed}
            />
          </div>
          <div className="mt-4">
            <h3 className="text-xs tracking-widest mb-1 dark:text-gray-400">
              {product.category[0].name}
            </h3>
            <h2 className="text-base capitalize dark:text-gray-200">
              {product.name}
            </h2>
            <p className="mt-2 text-xl font-bold text-yellow-600">
              <DisplayMoney amount={product?.price} />
            </p>
          </div>
        </div>
      </Link>
    </div>
  );
}

export default Product;
