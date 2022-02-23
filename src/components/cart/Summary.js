import React from "react";

function Summary() {
  return (
    <div className="flex flex-col w-full items-center justify-center text-black">
      <h4 className="py-8 flex justify-center items-center text-xl">Summary</h4>
      <div className="bg-gray-200 w-full flex justify-around items-center text-xl p-4">
        Total
        <span>$200,11</span>
      </div>
      <button className="mt-4 bg-red-300 p-4">Place Order</button>
    </div>
  );
}

export default Summary;
